const fs = require('fs');

const filePartSize = 1000000;
const fileSize = filePartSize * 100;

function getFileSize(path) {
  let stats = {};
  try {
    stats = fs.statSync(path);
  } catch (e) {}
  return stats.size || 0;
}

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function createContent() {
  const min = 1000000;
  const max = 9999999;
  const iteratorLength = Math.floor(filePartSize / min.toString().length);
  let string = '';

  for (let i = 0; i < iteratorLength; i++) {
    string += ` ${getRandomIntInRange(min, max)}`;
  }

  return string;
}

function processingFile(name) {
  const cfs = getFileSize(name);

  if (cfs < fileSize) {
    const content = createContent();
    fs.appendFileSync(name, content);

    return processingFile(name);
  }
}

function creatingMainFile(filePath, callback) {
  console.log('\nCreating file with numbers has started');

  processingFile(filePath);

  const size = getFileSize(filePath) / filePartSize;
  console.log('Creating has finished. A file size: %s MB\n', size.toFixed(2));

  callback();
}

module.exports = creatingMainFile;
