const request = require('superagent');

const config = require('../helpers/config_helper').default;
const Command = require('./utils/command_factory');

const factoryParams = {
  enabled: true,
  help_msg: `Catfacts returns a random cat fact! \r\nSyntax is ${config.commandChar}catfacts`,
  alias: false,
  nsfw: false,
};

class Catfacts extends Command {
  constructor(factoryParams) {
    super(factoryParams);
  }

  primary(args) {
    const apiUrl = 'https://meowfacts.herokuapp.com/';
    return new Promise((resolve, reject) => {
      request.get(apiUrl).then((response) => {
        if (response.status === 200) {
          const json = response.body;
          if (typeof json.error !== 'undefined') {
            return reject('Are you trying to make me crash?');
          }

          let returnString = json.data[0];
          resolve(`${returnString}, Cat Facts!`);
        }
      });
    });
  }
}

const catfactsCommand = new Catfacts(factoryParams);

module.exports.default = catfactsCommand;
