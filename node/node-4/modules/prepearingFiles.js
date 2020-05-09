// todo: оптимизировать скрипт

const fs = require('fs');
const path = require('path');
const creatingMainFile = require('./creatingMainFile');
const mergeSort = require('./mergeSort');

const filesPath = path.resolve(__dirname, '../files/');
const mainFile = path.resolve(filesPath, 'file.txt');

creatingMainFile(mainFile, () => {
  fs.readFile(mainFile, 'utf8', function(err, contents) {
    const fileString = contents.trim();
    const fileArray = fileString.split(' ');
    const quarter = fileArray.length / 4;

    const slicedFile = {
      arr1: fileArray.slice(0, quarter),
      arr2: fileArray.slice(quarter, quarter*2),
      arr3: fileArray.slice(quarter*2, quarter*3),
      arr4: fileArray.slice(quarter*3),
    };

    for (let i = 1; i < 5; i++) {
      const sortedArray = mergeSort(slicedFile[`arr${i}`]).join(' ');

      fs.writeFile(path.resolve(filesPath, `file${i}.txt`), sortedArray, function (err) {
        if (err) throw err;
        console.log(`File${i} created successfully.`);
      });
    }
  });
});
