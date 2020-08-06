#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var yargs = require("yargs");
var readDir_1 = require("./modules/readDir");
var createTree_1 = require("./modules/createTree");
var argv = yargs.options({
    path: {
        alias: 'p',
        description: 'Path to watching dir',
        type: 'string',
        "default": './'
    },
    depth: {
        alias: 'd',
        description: 'Tell the depth of watching',
        type: 'number',
        "default": -1
    },
    exceptions: {
        alias: 'ex',
        description: 'Excluded directories that should not be viewed',
        type: 'array',
        "default": []
    }
})
    .help('help')
    .wrap(70)
    .argv;
var pathToDir = argv.path;
var depth = argv.depth;
var exceptions = argv.exceptions;
var _a = readDir_1.ProcessingDir.readDir(pathToDir, depth, exceptions), treeObject = _a.treeObject, dirStat = _a.dirStat;
console.log('\n');
console.log(createTree_1.ProcessingTree.createTree(treeObject.items.length, treeObject));
console.log(dirStat.directories + " directories, " + dirStat.files + " files (including excluded directories)");
console.log('\n');
