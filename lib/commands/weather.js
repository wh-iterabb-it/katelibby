const request = require('superagent');

const logger = require('../utils/logger').default;
const config = require('../helpers/config_helper').default;
const Command = require('./utils/command_factory');

const factoryParams = {
  enabled: true,
  help_msg: `Weather command queries the Weather Underground for your local weather \n\rSyntax is ${config.commandChar}w { zipcode OR city, state }`,
  alias: false,
  nsfw: false,
};

// − 273.15) × 9/5 + 32 =

class Weather extends Command {
  constructor(factoryParams) {
    super(factoryParams);
  }

  primary(args) {
    if (config.openweathermap.key.length < 1) {
      logger.warn('openweathermap Key is missing, Please add an API key to the configuration file.');
      return Promise.resolve('openweathermap Key is missing, Please add an API key to the configuration file.');
    }
    // Current temperature in New York, NY, 10023 is 56.192°F, with a humidity of 62%, Current Weather is scattered clouds.
    const response = `About this Bot\r\nVersion: ${pkjson.version}\r\nTotal Uptime of Bot: ${uptime}`;
    return Promise.resolve(response);

    return new Promise((resolve, reject) => {
      request.get(url).then((response) => {
        if (response.status === 200) {
          const json = response.body;
          if (typeof json.current_observation === 'undefined') {
            reject('Are you trying to make me crash?');
          } else {
            const returnstring = `Current temperature in ${
              json.current_observation.display_location.city}, ${json.current_observation.display_location.state_name
            }, ${json.current_observation.display_location.zip
            } is ${json.current_observation.temp_f
            }°F, with a humidity of ${json.current_observation.relative_humidity
            }, Current Weather is ${json.current_observation.weather}`;
            resolve(returnstring);
          }
        }
      });
    });
  }
}

const weatherCommand = new Weather(factoryParams);

module.exports.default = weatherCommand;
