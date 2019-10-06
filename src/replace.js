import {readFileSync} from 'fs';
import dotProp from 'dot-prop';
import connect from "./db";
import {logAllReplacements, logCollectionReplacements, logError} from "./log";

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

const allReplacements = [];

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

        const replacementValue = fieldValue.replace(TARGET_STR, REPLACEMENT_STR);

        allReplacements.push([fieldValue, replacementValue]);

        updates.push(
          collection.updateOne({_id: document._id}, {
            $set: {
              [field]: replacementValue
            }
          })
        );
      }
    });
  });

  await Promise.all(updates);

  return found;
};

const exec = async () => {
  try {
    const db = await connect();

    const collectionFields = getFields();

    let allCount = 0;

    for (let collectionName of Object.keys(collectionFields)) {
      const fields = collectionFields[collectionName];

      const collection = db.collection(collectionName);

      const count = await replace(collection, fields);

      allCount += count;

      logCollectionReplacements(collectionName, count);
    }

    logAllReplacements(allReplacements, allCount);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};

export {exec};
