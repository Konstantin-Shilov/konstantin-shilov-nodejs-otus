#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const os = require('os');

const argv = yargs
  .option('depth', {
    alias: 'd',
    description: 'Tell the depth of watching',
    type: 'number',
  })
  .help('help')
  .wrap(70)
  .argv;
const pathToDir = yargs.argv._[0];

let depth = -1;
if (argv.depth || argv.depth === 0) {
  depth = argv.depth;
}

let directories = 0,
    files = 0;

let lastItem;
if (pathToDir) {
  lastItem = fs.readdirSync(pathToDir).length;
}

const symbolsMap = {
  middle: { started: '│', leaf: '├── ', end: '└── ' },
  ending: { started: ' ', leaf: '└── ' },
};

const exceptions = ['node_modules'];
const checkingRules = (item) => !exceptions.find(i => i === item);

const createTree = (dir, shift = 0, count = 1) => {
  const list = fs.readdirSync(dir);

  for (let i = 0; i < list.length; i++) {
    const delimiters = symbolsMap[lastItem !== count ? 'middle' : 'ending'];

    if (shift) {
      const delimitersLastItem = list[i] === list[list.length - 1] ? delimiters.end : delimiters.leaf;
      console.log(delimiters.started + '    '.repeat(shift) + delimitersLastItem + list[i]);
    } else {
      console.log(delimiters.leaf + list[i]);
    }

    const name = dir + "/" + list[i];
    if (fs.statSync(name).isDirectory() && checkingRules(list[i])) {
      directories += 1;
      if ((depth > -1 && shift < depth) || depth === -1) {
        createTree(name, shift + 1, count);
      }
    } else {
      files += 1;
    }

    if (shift === 0) {
      count += 1;
    }
  }
};

if (pathToDir) {
  const parentDirName = path.resolve(__dirname, pathToDir).split(path.sep).pop();

  console.log(os.EOL + parentDirName);
  createTree(pathToDir);
  console.log(os.EOL + `${directories} directories, ${files} files`);
} else {
  console.log('Please write a path to the directory right after the command "tree" like "tree <path>"');
}
