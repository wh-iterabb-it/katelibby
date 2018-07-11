import path from 'path';
import fs from '../utils/fs';

const commands = {};
const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }).forEach((file) => {
    commands[file.substring(0, file.length - 3)] = require(path.join(__dirname, file)).default;
  });

// aliases
// TO-DO refactor this to use factory params
commands.g = require('./google').default;
commands.w = require('./weather').default;
commands.mtastatus = require('./trainstatus').default;
commands.mta = require('./trainstatus').default;

module.exports = commands;
