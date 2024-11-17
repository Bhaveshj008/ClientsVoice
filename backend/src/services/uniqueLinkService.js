const Space = require('../models/spaceModel');

const generateUniqueLink = async (spaceName) => {
  let uniqueLink = spaceName;
  let counter = 1;
  while (await Space.findOne({ uniqueLink })) {
    uniqueLink = `${spaceName}${counter++}`;
  }
  return uniqueLink;
};

module.exports = { generateUniqueLink };
