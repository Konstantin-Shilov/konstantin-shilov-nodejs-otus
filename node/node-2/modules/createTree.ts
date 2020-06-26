export namespace ProcessingTree {
  class ListItemValue {
    name?: string;
    items?: Array<object>;
  }
  class ListValue {
    name?: string;
    items?: Array<ListItemValue>;
  }
  class DelimitersTypes {
    started: string;
    leaf: string;
    end: string;
  }

  const symbolsMap = {
    middle: { started: '│', leaf: '├── ', end: '└── ' },
    ending: { started: ' ', leaf: '└── ', end: '└── ' },
  };

  export function createTree (lastItem: number, list: ListValue, shift: number = 0, count: number = 0, lastItemInArray: string = undefined): string {
    const delimiters: DelimitersTypes = symbolsMap[lastItem !== count ? 'middle' : 'ending'];

    let output: string;
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
  }
}
