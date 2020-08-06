#!/usr/bin/env node

import * as yargs from 'yargs';
import {ProcessingDir} from './modules/readDir';
import {ProcessingTree} from './modules/createTree';

const argv = yargs.options({
    path: {
        alias: 'p',
        description: 'Path to watching dir',
        type: 'string',
        default: './'
    },
    depth: {
        alias: 'd',
        description: 'Tell the depth of watching',
        type: 'number',
        default: -1
    },
    exceptions: {
        alias: 'ex',
        description: 'Excluded directories that should not be viewed',
        type: 'array',
        default: []
    }
})
    .help('help')
    .wrap(70)
    .argv;


const pathToDir = argv.path;
const depth = argv.depth;
const exceptions = argv.exceptions;

const {treeObject, dirStat} = ProcessingDir.readDir(pathToDir, depth, exceptions);

console.log('\n');
console.log(ProcessingTree.createTree(treeObject.items.length, treeObject));
console.log(`${dirStat.directories} directories, ${dirStat.files} files (including excluded directories)`);
console.log('\n');
