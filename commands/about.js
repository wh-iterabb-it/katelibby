const pkjson = require('../package.json');
const {toDDHHMMSS} = require('../utils/format');
const config = require('../helpers/config_helper').default;
const Command = require('./utils/command_factory');

const factoryParams = {
  enabled: true,
  help_msg: `About this bot, will return \r\nSyntax is ${config.commandChar}about`,
  alias: false,
  nsfw: false,
};

class About extends Command {
  constructor(factoryParams) {
    super(factoryParams);
  }

  primary(args) {
    const time = process.uptime();
    const uptime = toDDHHMMSS(time + '');
    const response = `About this Bot\r\nVersion: ${pkjson.version}\r\nTotal Uptime of Bot: ${uptime}`;
    return Promise.resolve(response);
  }
}

const aboutCommand = new About(factoryParams);

module.exports.default = aboutCommand;
