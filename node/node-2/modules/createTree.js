const symbolsMap = {
  middle: { started: '│', leaf: '├── ', end: '└── ' },
  ending: { started: ' ', leaf: '└── ', end: '└── ' },
};

const createTree = (lastItem, list, shift = 0, count = 0, lastItemInArray = undefined) => {
  const delimiters = symbolsMap[lastItem !== count ? 'middle' : 'ending'];

  let output;
  if (shift === 0) {
    output = list.name + '\n';
  } else if (shift === 1) {
    output = delimiters.leaf + list.name + '\n';
  } else {
    const delimitersLastItem = list.name === lastItemInArray ? delimiters.end : delimiters.leaf;
    output = delimiters.started + '    '.repeat(shift-1) + delimitersLastItem + list.name + '\n';
  }

  if (list.items && list.items.length) {
    list.items.forEach((child) => {
      if (shift === 0) count += 1;
      const lastItemInArray = list.items[list.items.length - 1].name;
      output += createTree(lastItem, child, shift + 1, count, lastItemInArray);
    });
  }

  return output;
};

module.exports = createTree;
