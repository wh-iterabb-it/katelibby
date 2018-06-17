import request from 'superagent';

import config from '../helpers/config_helper';
import BaseCommand from './utils/command_factory';
import format from '../utils/format';
import Sanitize from '../utils/sanitize';
import logger from '../utils/logger';

const factoryParams = {
  enabled: true,
  help_msg: `Getting the current price USD of a given crypto coin.\n\rSyntax is ${config.commandChar}coin { ETH }`,
  alias: false,
  nsfw: false,
};

const CoinCommand = function CoinCommand() {
  const basedCommand = !(this instanceof CoinCommand) ? new BaseCommand(factoryParams) : BaseCommand;

  return Object.assign(Object.create(basedCommand), {
    primary: (args) => {
      if (config.worldcoinindex.key.length < 1) {
        logger.warn('Please add an API key to the configuration file.');
        return Promise.resolve('Please add an API key to the configuration file.');
      }
      const apiKey = config.worldcoinindex.key;
      const apiUrl = 'https://www.worldcoinindex.com/apiservice/ticker';
      const coin = Sanitize.sanitize(args.substring(0, 3));
      const url = `${apiUrl}?key=${apiKey}&label=${coin}btc&fiat=usd`;
      return new Promise((resolve, reject) => {
        request.get(url).then((response) => {
          if (response.status === 200) {
            const json = response.body;
            if (typeof json.Markets === 'undefined' || typeof json.error !== 'undefined') {
              return reject('Are you trying to make me crash?');
            } else {
              const price =  format.formatMoney(json.Markets[0].Price);
              const label = json.Markets[0].Label.substring(0, 3);
              const name = json.Markets[0].Name;
              const volume = format.formatMoney(json.Markets[0].Volume_24h);
              const lastTrade = format.formatPast(json.Markets[0].Timestamp);

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

export default coinCommand;
