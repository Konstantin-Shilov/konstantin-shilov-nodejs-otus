const fs = require('fs');
const path = require('path');

const readDir = (pathToDir, depth, exceptions = []) => {
  let directories = 0,
      files = 0;

  const checkingRules = (item) => !exceptions.find(i => i === item);

  const processingTree = (dir, shift = 0) => {
    const list = fs.readdirSync(dir);
    const items = list.map((item) => {
      const name = dir + "/" + item;

      if (fs.statSync(name).isDirectory()) {
        directories += 1;
        if (checkingRules(item) && (shift < depth || depth === -1)) {
          return processingTree(name, shift + 1);
        }
      } else {
        files += 1;
      }
      return {name: item}
    });

    return {
      name: path.resolve(__dirname, dir).split(path.sep).pop(),
      items
    }
  };

  return {
    treeObject: processingTree(pathToDir),
    dirStat: { directories, files }
  };
};

module.exports = readDir;
