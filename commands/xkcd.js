import request from 'request';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Used to get the latest xkcd comic for IRC');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'xkcd');
        return 'help';
    }
  }
  const apiUrl = 'https://xkcd.com/info.0.json';
  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const json = JSON.parse(body);
      if (typeof json.num === 'undefined') {
        callback.say(target, 'Are you trying to make me crash?');
      } else {
        callback.say(target, 'https://xkcd.com/' + json.num.toString() + '/');
      }
    }
  });
  return 'Getting random xkcd comic ...';
};
