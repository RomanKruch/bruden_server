const fs = require('fs/promises');

const isAccessible = async path => {
  return await fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsExist = async folder => {
  const isHere = await isAccessible(folder);
  if (!isHere) {
    await fs.mkdir(folder);
  }
};

module.exports = createFolderIsExist;
