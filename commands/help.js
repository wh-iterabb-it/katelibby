import config from '../helpers/config_helper';

module.exports = (args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        return Promise.resolve('Syntax is ' + config.commandChar + 
          '{command} help, to get more info about a specific command 🤔');
      default:
        const commands = require('./');
        const msg = 'Hello, I am ' + config.irc.realName + ', a bot. My commands are: ';
        const commandz = Object.keys(commands).map((command) => {
          return config.commandChar + command;
        }).join(' ');

        return Promise.resolve(msg + commandz + '\n\rYou can also type ' + config.commandChar +
          '{command} help, to get more info about a specific command');
    }
  }
};
