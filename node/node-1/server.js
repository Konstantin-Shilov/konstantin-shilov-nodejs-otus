const http = require('http');
let fs = require('fs');

const hostname = '0.0.0.0';
const port = 2000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
});

const createTree = (lastItem, obj, shift = 0, count = 0) => {
  if (!shift) {
    console.log(obj.name);
  }

  if (lastItem !== count) {
    if (shift === 1) {
      console.log('├── ', obj.name);
    } else if (shift > 1) {
      console.log(`│${'    '.repeat(shift - 1)}└── ${obj.name}`);
    }
  } else {
    if (shift === 1) {
      console.log('└── ', obj.name);
    } else if (shift > 1) {
      console.log(` ${'    '.repeat(shift - 1)}└── ${obj.name}`);
    }
  }

  if (obj.items && obj.items.length) {
    obj.items.map((child) => {
      if (shift === 0) count += 1;
      return createTree(lastItem, child, shift + 1, count);
    });
  }
};

server.listen(port, hostname, () => {
  fs.readFile('tree.json', 'utf8', function(err, contents) {
    const object = JSON.parse(contents);
    const lastItem = object.items.length;

    createTree(lastItem, object);
  });
});
