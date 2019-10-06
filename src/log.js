import {writeFileSync} from 'fs';

const logError = (error) => {
  console.error("Sorry :( An error occurred!");
  console.error("========ERROR BEGIN=======");
  console.error(error);
  console.error("=========ERROR END========");
};

const logCollectionReplacements = (collection, count) => {
  if (count) {
    console.info(`Found and replaced ${count} occurrences in "${collection}"`);
  } else {
    console.info(`Found no occurrences in "${collection}"`);
  }

};

const logAllReplacements = (replacements, count) => {
  console.info(`Total replacements: ${count}`);
  writeFileSync('replace.log.json', JSON.stringify(replacements, null, 2));
};

export {
  logError,
  logCollectionReplacements,
  logAllReplacements
};
