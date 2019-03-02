const google = require('google');

const logger = require('../utils/logger').default;
const config = require('../helpers/config_helper').default;
const Command = require('./utils/command_factory');

const factoryParams = {
  enabled: true,
  help_msg: `Googling stuff in IRC has never been easier \r\nSyntax is ${config.commandChar}g { query for google }`,
  alias: ['g'],
  nsfw: false,
};

const GoogleCommand = function GoogleCommand() {
  const basedCommand = !(this instanceof GoogleCommand) ? new Command(factoryParams) : Command;

  return Object.assign(Object.create(basedCommand), {
    primary: (args) => {
      try {
        google.resultsPerPage = 25;
        return new Promise((resolve, reject) => {
          google(args.toString(), (err, res) => {
            if (err) {
              logger.error(`google failed${err}`);
            }
            logger.info(`response returned with statuscode: ${
              res.statusCode}`);
            if (res.links && res.links.length) {
              if (res.links[0].title.match(/(Images|News|Def)/i) != null) {
                resolve(`${`${res.links[1].title} - ${res.links[1].href}`
                  + '\r\n'}${res.links[1].description}`);
              } else {
                // link.href is an alias for link.link
                resolve(`${`${res.links[0].title} - ${res.links[0].href}`
                + '\r\n'}${res.links[0].description}`);
              }
            } else {
              logger.error('query had no results');
              reject('There were litterally no results');
            }
          });
        });
      } catch (error) {
        logger.error(`There was an error in google.js ${error}`);
        return Promise.reject('And what do we say to death?'); //  Not today
      }
    },
  });
};

const googleCommand = GoogleCommand();

module.exports.default = googleCommand;
