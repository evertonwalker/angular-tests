const fs = require('fs')
  , path = require('path')
  , Datauri = require('datauri/sync');

const dataList = [];

for (let i = 0; i < 18; i++) {
    const id = i + 1;
    const file = path.resolve(__dirname, `./imgs/${id}.jpg`);
    const url = Datauri(file).content;
    const data = { id, url, description: `photo ${id} description here` };
    dataList.push(data);
}

module.exports = dataList;
