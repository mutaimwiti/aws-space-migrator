import {readFileSync} from 'fs';
import dotProp from 'dot-prop';
import connect from "./db";

const getFields = () => {
  const data = JSON.parse(
    readFileSync(`${__dirname}/../in/fields.json`, 'utf8')
  );

  const fields = {};

  data.forEach(item => {
    const parts = item.split('.');
    const collection = parts.shift();
    const field = parts.join('.');
    if (fields[collection]) {
      fields[collection] = fields[collection].concat([field]);
    } else {
      fields[collection] = [field];
    }
  });

  return fields;
};

const replace = async (collection, fields) => {
  const {TARGET_STR, REPLACEMENT_STR} = process.env;

  let found = 0;

  const updates = [];

  const documents = await ((await (collection.find({}))).toArray());

  documents.forEach(document => {
    fields.forEach(field => {
      const fieldValue = dotProp.get(document, field);

      if (fieldValue.includes(TARGET_STR)) {
        found++;

        const update = {
          $set: {
            [field]: fieldValue.replace(TARGET_STR, REPLACEMENT_STR)
          }
        };

        updates.push(
          collection.updateOne({_id: document._id}, update)
        );
      }
    });
  });

  await Promise.all(updates);

  return found;
};

const exec = async () => {
  const db = await connect();

  const collectionFields = getFields();

  for (let collectionName of Object.keys(collectionFields)) {
    const fields = collectionFields[collectionName];

    const collection = db.collection(collectionName);

    const count = await replace(collection, fields);

    if (count) {
      console.log(`Found and replaced ${count} occurrences in ${collectionName}`);
    } else {
      console.log(`Found no occurrences in ${collectionName}`);
    }
  }
};

export {exec};
