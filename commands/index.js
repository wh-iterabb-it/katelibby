import path from 'path';
import fs from '../utils/fs';

const commands = {};
const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const filename = path.join(__dirname, file);
    const nfile = file.substring(0, file.length - 3);
    commands[nfile] = require(filename);
  });

// aliases
commands.g = require('./google');
commands.in = require('./remind');
commands.w = require('./weather');
module.exports = commands;
