const request = require('superagent');

const config = require('../helpers/config_helper').default;
const Command = require('./utils/command_factory');
const {toHHMMSS, toDDHHMMSS, formatMoney, formatPast} = require('../utils/format');
const {sanitize} = require( '../utils/sanitize');
const logger = require('../utils/logger').default;

const factoryParams = {
  enabled: true,
  help_msg: `Getting the current price USD of a given crypto coin.\n\rSyntax is ${config.commandChar}coin { ETH }`,
  alias: false,
  nsfw: false,
};

const CoinCommand = function CoinCommand() {
  const basedCommand = !(this instanceof CoinCommand) ? new Command(factoryParams) : Command;

  return Object.assign(Object.create(basedCommand), {
    primary: (args) => {
      if (config.worldcoinindex.key.length < 1) {
        logger.warn('Please add an API key to the configuration file.');
        return Promise.resolve('Please add an API key to the configuration file.');
      }
      const apiKey = config.worldcoinindex.key;
      const apiUrl = 'https://www.worldcoinindex.com/apiservice/ticker';
      const coin = sanitize(args.substring(0, 3));
      const url = `${apiUrl}?key=${apiKey}&label=${coin}btc&fiat=usd`;
      return new Promise((resolve, reject) => {
        request.get(url).then((response) => {
          if (response.status === 200) {
            const json = response.body;
            if (typeof json.Markets === 'undefined' || typeof json.error !== 'undefined') {
              return reject('Are you trying to make me crash?');
            } else {
              const price =  formatMoney(json.Markets[0].Price);
              const label = json.Markets[0].Label.substring(0, 3);
              const name = json.Markets[0].Name;
              const volume = formatMoney(json.Markets[0].Volume_24h);
              const lastTrade = formatPast(json.Markets[0].Timestamp);

              let returnString = `1 ${label} = ${price} USD as of ${lastTrade} ago\n\r`;
              returnString = returnString + `24 Hour Volume ${volume} USD\n\r`;
              returnString = returnString + `${name} https://www.worldcoinindex.com/coin/${name}`;
              resolve(returnString);
            }
          }
        });
      });
    },
  });
};

const coinCommand = CoinCommand();

module.exports.default = coinCommand;
