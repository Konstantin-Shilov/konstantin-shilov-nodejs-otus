const path = require('path');

const fs = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

function statSync(filePath) {
  return {
    isDirectory: function() {
      return Object.keys(mockFiles).includes(filePath);
    }
  };
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.statSync = statSync;

module.exports = fs;
