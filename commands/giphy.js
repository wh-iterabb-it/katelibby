import querystring from 'querystring';
import request from 'request';

const apiUrl = 'http://api.giphy.com/v1/gifs/search?';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Getting a random top 10 Giphy result for a query');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'giphy { query for giphy }');
        return 'help';
    }
  }
  if (callback.config.giphy.key.length < 1) {
    callback.say(target, 'Please add an API key to the configuration file.');
  } else {
    const url = apiUrl + querystring.stringify({
      q: args,
      api_key: callback.config.giphy.key,  // eslint-disable-line
      limit: 10,
      offset: 0,
    });
    request({ url, json: true }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        if (typeof body.data[0] === 'undefined') {
          callback.say(target, 'Are you trying to make me crash?');
        } else {
          const num = Math.floor(Math.random() * (body.data.length));

          if (num > 1) {
            callback.say(target, num + ':' + body.data[num].images.original.url);
          } else {
            callback.say(target, 'No!');
          }
        }
      }
    });
  }
};
