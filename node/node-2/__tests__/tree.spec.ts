import * as fs from "fs";

const path = require('path');

const {ProcessingDir} = require('../modules/readDir.ts');
const {ProcessingTree} = require('../modules/createTree.ts');

jest.mock('fs');

const MOCK_FILE_INFO = {
  [path.resolve(__dirname, '../file1.js')]: '',
  [path.resolve(__dirname, '../file2.txt')]: '',

  [path.resolve(__dirname, '../dir')]: '',
  [path.resolve(__dirname, '../dir/test.js')]: '',

  [path.resolve(__dirname, '../dir2')]: '',
  [path.resolve(__dirname, '../dir2/dir3')]: '',
  [path.resolve(__dirname, '../dir2/dir3/test2.doc')]: '',

  [path.resolve(__dirname, '../dir4')]: '',
  [path.resolve(__dirname, '../dir4/test.js')]: '',

  [path.resolve(__dirname, '../dir5')]: '',
  [path.resolve(__dirname, '../dir5/dir6')]: '',
  [path.resolve(__dirname, '../dir5/dir6/test3.doc')]: '',
  [path.resolve(__dirname, '../dir5/dir6/dir7')]: '',
  [path.resolve(__dirname, '../dir5/dir6/dir7/test4.doc')]: '',
};
require('fs').__setMockFiles(MOCK_FILE_INFO);

describe('readDir module tests', () => {
  it('Object with processed tree should bedefined', () => {
    const {treeObject} = ProcessingDir.readDir(path.resolve(__dirname, '../'), 2, []);
    expect(treeObject).toBeDefined();
  });

  it('Parent dir should contains 3 or more items', () => {
    const {treeObject} = ProcessingDir.readDir(path.resolve(__dirname, '../'), 2, []);
    expect(treeObject.items.length).toBeGreaterThanOrEqual(3);
  });

  it('The number of directories and files should not be null', () => {
    const {dirStat} = ProcessingDir.readDir(path.resolve(__dirname, '../'), 0, []);
    expect(dirStat.directories).not.toBeNull();
    expect(dirStat.files).not.toBeNull();
  });
});

describe('createTree module tests', () => {
  it('Output should contain "test"', () => {
    const output = ProcessingTree.createTree(0, {name: 'test'});
    expect(output).toMatch('test');
  });
});

describe('Joint test of readDir and createTree with excluded dir', () => {
  it('Output should contain tree', () => {
    const {treeObject} = ProcessingDir.readDir(path.resolve(__dirname, '../'), 4, ['dir2']);
    const lastItem = treeObject.items.length;
    const output = ProcessingTree.createTree(lastItem, treeObject);

    expect(output).toMatchSnapshot();
  });
});
