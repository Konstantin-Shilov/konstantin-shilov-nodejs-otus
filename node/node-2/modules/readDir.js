"use strict";
exports.__esModule = true;
exports.ProcessingDir = void 0;
var fs = require("fs");
var path = require("path");
var ProcessingDir;
(function (ProcessingDir) {
    var rootPath = path.resolve(__dirname, '../');
    function readDir(pathToDir, depth, exceptions) {
        var directories = 0, files = 0;
        var checkingRules = function (item) { return !exceptions.find(function (i) { return i === item; }); };
        var processingTree = function (dir, shift) {
            if (shift === void 0) { shift = 0; }
            var list = fs.readdirSync(dir);
            var items = list.map(function (item) {
                var name = dir + "/" + item;
                if (fs.statSync(name).isDirectory()) {
                    directories += 1;
                    if (checkingRules(item) && (shift < depth || depth === -1)) {
                        return processingTree(name, shift + 1);
                    }
                }
                else {
                    files += 1;
                }
                return { name: item };
            });
            return {
                name: path.resolve(rootPath, dir).split(path.sep).pop(),
                items: items
            };
        };
        return {
            treeObject: processingTree(pathToDir),
            dirStat: { directories: directories, files: files }
        };
    }
    ProcessingDir.readDir = readDir;
})(ProcessingDir = exports.ProcessingDir || (exports.ProcessingDir = {}));
