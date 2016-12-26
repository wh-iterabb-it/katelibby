import request from 'request';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Twitch command displays the status of the streamer as well as person website.');
        callback.say(target, 'Syntax is ' + callback.config.commandChar + 'twitch');
        return 'help';
    }
  }
  const api_url = 'https://api.twitch.tv/kraken/streams/';
  const options = {
    url: api_url + callback.config.twitch.streamer,
    headers: {
      'Client-ID': callback.config.twitch.clientid,
    },
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const json = JSON.parse(body);
      if (typeof json.current_observation === 'undefined') {
        callback.say(target, 'Are you trying to make me crash?');
      } else {
        const returnstring = '';
        callback.say(target, 'https://twitch.com/' + callback.config.twitch.streamer + ' is currently ' + returnstring);
      }
    }
  });
  callback.say(target, 'Also make sure to check out ');
  callback.config.twitch.personal.forEach((site) => {
    callback.say(target, site);
  });
};
