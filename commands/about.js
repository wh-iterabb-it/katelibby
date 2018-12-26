const pkjson = require('../package.json');
const format = require('../utils/format').default;
const config = require('../helpers/config_helper').default;
const BaseCommand = require('./utils/command_factory').default;

const factoryParams = {
  enabled: true,
  help_msg: `About this bot, will return \r\nSyntax is ${config.commandChar}about`,
  alias: false,
  nsfw: false,
};

const AboutCommand = function AboutCommand() {
  const basedCommand = !(this instanceof AboutCommand) ? new BaseCommand(factoryParams) : BaseCommand;

  return Object.assign(Object.create(basedCommand), {
    primary: (args) => {
      const time = process.uptime();
      const uptime = format.toDDHHMMSS(time + '');
      const response = `About this Bot\r\nVersion: ${pkjson.version}\r\nTotal Uptime of Bot: ${uptime}`;
      return Promise.resolve(response);
    },
  });
};

const aboutCommand = AboutCommand();

module.exports.default = aboutCommand;
