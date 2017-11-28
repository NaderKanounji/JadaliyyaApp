const hash = getHash();
const input = `./dist-server/main.${hash}.bundle`;
const output = `./dist-server/main.repack.${hash}.bundle.js`;

module.exports = {
  target: 'node',
  entry: input,
  output: { filename: output, libraryTarget: 'commonjs' },
}

function getHash() {
  const fs = require('fs');
  const path = require('path');

  const files = fs.readdirSync(`${process.cwd()}/dist-server`);
  const mainFiles = files.filter(file => file.startsWith('main'));
  return mainFiles[0].split('.')[1];
}