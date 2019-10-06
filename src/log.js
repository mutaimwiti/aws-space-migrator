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

const logAllReplacements = (count) => {
  console.info(`Total replacements: ${count}`);
};

export {
  logError,
  logCollectionReplacements,
  logAllReplacements
};
