const fs = require('fs');
const util = require('util');

module.exports.default = {
  readFile: util.promisify(fs.readFile),
  readdirSync: fs.readdirSync,
  unlink: util.promisify(fs.unlink),
};
