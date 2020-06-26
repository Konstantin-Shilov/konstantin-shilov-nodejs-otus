import * as path from "path";

const fs = jest.genMockFromModule('fs');

let mockFiles: object = Object.create(null);

function __setMockFiles(newMockFiles: object) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

function readdirSync(directoryPath: string) {
  return mockFiles[directoryPath] || [];
}

function statSync(filePath: string) {
  return {
    isDirectory: function() {
      return Object.keys(mockFiles).includes(filePath);
    }
  };
}

(fs as any).__setMockFiles = __setMockFiles;
(fs as any).readdirSync = readdirSync;
(fs as any).statSync = statSync;

module.exports = fs;
