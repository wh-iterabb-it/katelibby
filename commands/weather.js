import request from 'superagent';

import logger from '../utils/logger';
import config from '../helpers/config_helper';
import BaseCommand from './utils/command_factory';

const factoryParams = {
  enabled: true,
  help_msg: `Weather command queries the Weather Underground for your local weather \n\rSyntax is ${config.commandChar}w { zipcode OR city, state }`,
  alias: false,
  nsfw: false,
};

const WeatherCommand = function WeatherCommand() {
  const basedCommand = !(this instanceof WeatherCommand) ? new BaseCommand(factoryParams) : BaseCommand;

  return Object.assign(Object.create(basedCommand), {
    primary: (args) => {
      if (config.wunderground.key.length < 1) {
        logger.warn('Please add an API key to the configuration file.');
        return Promise.resolve('Please add an API key to the configuration file.');
      }
      // only allows 500 calls a day and 10 a minute
      const apiKey = config.wunderground.key;
      const apiUrl = `http://api.wunderground.com/api/${apiKey}/conditions/q/`;
      const url = `${apiUrl}${args}.json`;
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
              resolve(returnstring);
            }
          }
        });
      });
    },
  });
};

const weatherCommand = WeatherCommand();

export default weatherCommand;
