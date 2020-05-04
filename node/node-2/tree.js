#!/usr/bin/env node

const yargs = require('yargs');
const readDir = require('./modules/readDir');
const createTree = require('./modules/createTree');

const argv = yargs
  .option('depth', {
    alias: 'd',
    description: 'Tell the depth of watching',
    type: 'number',
  })
  .option('exceptions', {
    alias: 'ex',
    description: 'Excluded directories that should not be viewed',
    type: 'array',
  })
  .help('help')
  .wrap(70)
  .argv;
const pathToDir = yargs.argv._[0];

let depth = -1;
if (argv.depth || argv.depth === 0) {
  depth = argv.depth;
}

let exceptions;
if (argv.exceptions) {
  exceptions = argv.exceptions;
}

console.log(argv.exceptions);

if (pathToDir) {
  const {treeObject, dirStat} = readDir(pathToDir, depth, exceptions);

  console.log('\n');
  console.log(createTree(treeObject.items.length, treeObject));
  console.log(`${dirStat.directories} directories, ${dirStat.files} files (including excluded directories)`);
} else {
  console.log('Please write a path to the directory right after the command "tree" like "tree <path>"');
}
