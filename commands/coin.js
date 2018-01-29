import request from 'request';

import config from '../helpers/config_helper';
import sanitize from '../utils/sanitize';

const apiKey = config.worldcoinindex.key;
const apiUrl = 'https://www.worldcoinindex.com/apiservice/ticker';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Getting the current price USD of a given crypto coin.');
        callback.say(target, `Syntax is ${callback.config.commandChar} cyber { ETH }`);
        return 'help';
    }
  }
  try {
    if (callback.config.giphy.key.length < 1) {
      callback.say(target, 'Please add an API key to the configuration file.');
    } else {
      const coin = sanitize(args.substring(0, 4));
      const url = `${apiUrl}?key=${apiKey}&label=${coin}btc&fiat=usd`;
      request({ url, json: true }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          if (typeof body.Markets[0] === 'undefined') {
            callback.say(target, 'Are you trying to make me crash?');
          } else {
            if (!body.error) {
              const price = body.Markets[0].Price;
              const label = body.Markets[0].Label.substring(0, 4);
              const name = body.Markets[0].Name;
              const volume = body.Markets[0].Volume_24h;
              const timstamp = body.Markets[0].Timestamp;

              callback.say(target, `${name}`);
              callback.say(target, `1 ${label} = \$ ${price} USD`);
              callback.say(target, `24 Hour Volume \$ ${volume} USD`);
            } else {
              callback.say(target, 'No!');
            }
          }
        }
      });
    }
  } catch (e) {
    callback.say(target, 'And what do we say to death?'); //  Not today
  }
};
