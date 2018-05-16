import request from 'superagent';
import config from '../helpers/config_helper';
// only allows 500 calls a day and 10 a minute
module.exports = (args) => {
  if (config.wunderground.key.length < 1) {
    return Promise.resolve('Please add an API key to the configuration file.');
  }
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        return Promise.resolve('Weather command queries the Weather Underground for your local weather \n\r' +
          'Syntax is ' + config.commandChar + 'w { zipcode OR city, state }');
      default:
        const apiKey = config.wunderground.key;
        const apiUrl = `http://api.wunderground.com/api/${apiKey}/conditions/q/`;
        const url = `${apiUrl}${args}.json`;
        console.log(`sending request to: ${url}`);
        return new Promise((resolve, reject) => {
          request.get(url).then((response) => {
            if (response.status === 200) {
              const json = response.body;
              if (typeof json.current_observation === 'undefined') {
                reject('Are you trying to make me crash?');
              } else {
                const returnstring = 'Current temperature in ' +
                json.current_observation.display_location.city +
                ', ' + json.current_observation.display_location.state_name +
                ', ' + json.current_observation.display_location.zip +
                ' is ' + json.current_observation.temp_f +
                '°F, with a humidity of ' + json.current_observation.relative_humidity +
                ', Current Weather is ' + json.current_observation.weather;
                console.log(returnstring);
                resolve(returnstring);
              }
            }
          });
        });
    }
  }
};
