import request from 'request';
// only allows 500 calls a day and 10 a minute
module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Weather command queries the Weather Underground for your local weather');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'w { zipcode OR city, state }');
        return 'help';
    }
  }
  const api_key = callback.config.wunderground.key;
  const api_url = 'http://api.wunderground.com/api/' +
    api_key + '/conditions/q/';
  const url = api_url + args + '.json';
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const json = JSON.parse(body);
      if (typeof json.current_observation === 'undefined') {
        callback.say(target, 'Are you trying to make me crash?');
      } else {
        const returnstring = 'Current temperature in ' +
        json.current_observation.display_location.city +
        ', ' + json.current_observation.display_location.state_name +
        ', ' + json.current_observation.display_location.zip +
        ' is ' + json.current_observation.temp_f +
        '°F, with a humidity of ' + json.current_observation.relative_humidity;
        callback.say(target, returnstring);
      }
    }
  });
  // callback.say(target, 'searching ...');
};
