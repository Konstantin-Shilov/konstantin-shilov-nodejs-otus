const fs = require('fs');
const path = require('path');
const mergeSort = require('./modules/mergeSort');

const filesPath = path.resolve(__dirname, './files/');

const options = { highWaterMark: 8 };

const readStream1 = fs.createReadStream(path.resolve(filesPath, 'file1.txt'), options);
const readStream2 = fs.createReadStream(path.resolve(filesPath, 'file2.txt'), options);
const readStream3 = fs.createReadStream(path.resolve(filesPath, 'file3.txt'), options);
const readStream4 = fs.createReadStream(path.resolve(filesPath, 'file4.txt'), options);

const writeStream = fs.createWriteStream(path.resolve(filesPath, 'output.txt'));

async function* readStream1Gen() {
  for await (const chunk of readStream1) {
    yield chunk;
  }
}
async function* readStream2Gen() {
  for await (const chunk of readStream2) {
    yield chunk;
  }
}
async function* readStream3Gen() {
  for await (const chunk of readStream3) {
    yield chunk;
  }
}
async function* readStream4Gen() {
  for await (const chunk of readStream4) {
    yield chunk;
  }
}

class Iterator {
  constructor(props) {
    this.isIt1Processing = true;
    this.isIt2Processing = true;
    this.isIt3Processing = true;
    this.isIt4Processing = true;

    this.counter = 0;
    this.buffer = [];

    this.it1 = readStream1Gen();
    this.it2 = readStream2Gen();
    this.it3 = readStream3Gen();
    this.it4 = readStream4Gen();
  }

  clearBuffer() {
    this.buffer.length = 0;
  }

  pushToBuffer(value) {
    this.buffer.push(value);
  }

  async init() {
    while (this.counter < 4) {

      if (this.isIt1Processing) {
        await this.it1.next().then(data => {
          if (data.done) {
            this.isIt1Processing = false;
            this.counter += 1;
          }
          if (data.value) this.pushToBuffer(Number(data.value));
        });
      }

      if (this.isIt2Processing) {
        await this.it2.next().then(data => {
          if (data.done) {
            this.isIt2Processing = false;
            this.counter += 1;
          }
          if (data.value) this.pushToBuffer(Number(data.value));
        });
      }

      if (this.isIt3Processing) {
        await this.it3.next().then(data => {
          if (data.done) {
            this.isIt3Processing = false;
            this.counter += 1;
          }
          if (data.value) this.pushToBuffer(Number(data.value));
        });
      }

      if (this.isIt4Processing) {
        await this.it4.next().then(data => {
          if (data.done) {
            this.isIt4Processing = false;
            this.counter += 1;
          }
          if (data.value) this.pushToBuffer(Number(data.value));
        });
      }

      if (this.buffer.length) {
        const sortedArray = mergeSort(this.buffer);
        writeStream.write(`${sortedArray[0].toString()} `);
      }
      this.clearBuffer();
    }
  }
}

new Iterator().init();
