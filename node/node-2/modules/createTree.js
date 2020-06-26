"use strict";
exports.__esModule = true;
exports.ProcessingTree = void 0;
var ProcessingTree;
(function (ProcessingTree) {
    var symbolsMap = {
        middle: { started: '│', leaf: '├── ', end: '└── ' },
        ending: { started: ' ', leaf: '└── ', end: '└── ' }
    };
    function createTree(lastItem, list, shift, count, lastItemInArray) {
        if (shift === void 0) { shift = 0; }
        if (count === void 0) { count = 0; }
        if (lastItemInArray === void 0) { lastItemInArray = undefined; }
        var delimiters = symbolsMap[lastItem !== count ? 'middle' : 'ending'];
        var output;
        if (shift === 0) {
            output = list.name + '\n';
        }
        else if (shift === 1) {
            output = delimiters.leaf + list.name + '\n';
        }
        else {
            var delimitersLastItem = list.name === lastItemInArray ? delimiters.end : delimiters.leaf;
            output = delimiters.started + '    '.repeat(shift - 1) + delimitersLastItem + list.name + '\n';
        }
        if (list.items && list.items.length) {
            list.items.forEach(function (child) {
                if (shift === 0)
                    count += 1;
                var lastItemInArray = list.items[list.items.length - 1].name;
                output += createTree(lastItem, child, shift + 1, count, lastItemInArray);
            });
        }
        return output;
    }
    ProcessingTree.createTree = createTree;
})(ProcessingTree = exports.ProcessingTree || (exports.ProcessingTree = {}));
