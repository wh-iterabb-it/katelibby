import request from 'request';
import moment from 'moment';

import config from '../helpers/config_helper';
import sanitize from '../utils/sanitize';

const apiUrl = 'https://www.worldcoinindex.com/apiservice/ticker';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Getting the current price USD of a given crypto coin.');
        callback.say(target, `Syntax is ${callback.config.commandChar}coin { ETH }`);
        return 'help';
    }
  }
  try {
    if (callback.config.giphy.key.length < 1) {
      callback.say(target, 'Please add an API key to the configuration file.');
    } else {
      const apiKey = config.worldcoinindex.key;
      const coin = sanitize(args.substring(0, 3));
      const url = `${apiUrl}?key=${apiKey}&label=${coin}btc&fiat=usd`;
      request({ url, json: true }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          if (typeof body.Markets === 'undefined' || typeof body.error !== 'undefined') {
            callback.say(target, 'Are you trying to make me crash?');
          } else {
            const priceInt = parseInt(body.Markets[0].Price, 10).toFixed(2);
            const price =  priceInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            const label = body.Markets[0].Label.substring(0, 3);
            const name = body.Markets[0].Name;
            const volumeInt = parseInt(body.Markets[0].Volume_24h, 10).toFixed(2);
            const volume = volumeInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            
            // get the time since last trade
            const timestamp = moment.unix(body.Markets[0].Timestamp);
            const now = moment.unix(new Date().getTime() / 1000);
            const difference = now.diff(timestamp);
            const duration = moment.duration(difference);
            const lastTrade = Math.floor(duration.asHours()) + moment.utc(difference).format(':mm:ss');
            
            callback.say(target, `1 ${label} = $ ${price} USD as of ${lastTrade} ago`);
            callback.say(target, `24 Hour Volume $ ${volume} USD`);
            callback.say(target, `${name} https://coinmarketcap.com/currencies/${name}/`);
          }
        }
      });
    }
  } catch (e) {
    callback.say(target, 'And what do we say to death?'); //  Not today
  }
};
