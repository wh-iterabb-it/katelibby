const config = require('../helpers/config_helper').default;
const BaseCommand = require('./utils/command_factory').default;

const factoryParams = {
  enabled: true,
  help_msg: `Syntax is ${config.commandChar}{command} help, to get more info about a specific command 🤔`,
  alias: false,
  nsfw: false,
};

const HelpCommand = function HelpCommand() {
  const basedCommand = !(this instanceof HelpCommand) ? new BaseCommand(factoryParams) : BaseCommand;

  return Object.assign(Object.create(basedCommand), {
    primary: (args, appData) => {
        const commands = require('./');
        const msg = `Hello, I am ${appData.realName}, a bot. My commands are: `;
        const commandz = Object.keys(commands).map((command) => {
          return config.commandChar + command;
        }).join(' ');

        return Promise.resolve(`${msg}${commandz}\n\rYou can also type ${config.commandChar}{command} help, to get more info about a specific command`);
    },
  });
};

const helpCommand = HelpCommand();

export default helpCommand;
