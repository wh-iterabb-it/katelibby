const request = require('superagent');

const logger = require('../utils/logger').default;
const config = require('../helpers/config_helper').default;
const Command = require('./utils/command_factory');

const factoryParams = {
  enabled: true,
  help_msg: `Weather command queries the Open Weather Map API for your local weather \n\rSyntax is ${config.commandChar}w { zipcode OR city, state }`,
  alias: false,
  nsfw: false,
};

/**
 * Weather
 *
**/
class Weather extends Command {
  constructor(factoryParams) {
    super(factoryParams);
  }

  /**
   * convertFahrenheit
   * @param {int} kelvin - temperature in kelvin
   * @return {int} - temperature in fahrenheit
  **/
  convertFahrenheit(kelvin) {
    return ((kelvin - 273.15) * (9/5) + 32).toFixed(3);
  }

  /**
   * convertCelsius
   * @param {int} kelvin - temperature in kelvin
   * @return {int} - temperature in celsius
  **/
  convertCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(3);
  }

  /**
   * processRequest
   * @param {string} url -
   * @return {int} -
  **/
  processRequest(url) {
    // Current temperature in New York, NY, 10023 is 56.192°F, with a humidity of 62%, Current Weather is scattered clouds.
    return new Promise((resolve, reject) => {
      request.get(url).then((response) => {
        if (response.status === 200) {
          const json = response.body;
          if (typeof json.main === 'undefined') {
            reject('Are you trying to make me crash?');
          } else {
            const returnstring = `Current temperature in ${json.name}, is ${this.convertFahrenheit(json.main.temp)
            }°F, with a humidity of ${json.main.humidity
            }%, Current Weather is ${json.weather[0].description}`;
            resolve(returnstring);
          }
        }
      });
    });
  }


  /**
   * primary
   * @param {string} args
   * @return {Promise} - response which will resolve for success, reject for fail
  **/
  primary(args) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/';
    //https://api.openweathermap.org/data/2.5/weather?zip=10023,us&appid=k
    if (config.openweathermap.key.length < 1) {
      logger.warn('openweathermap Key is missing, Please add an API key to the configuration file.');
      return Promise.resolve('openweathermap Key is missing, Please add an API key to the configuration file.');
    }
    let url = apiUrl;
    // if zipcode ?zip={zip},us (us only?)
    // if city / state use ?q=
    url = url + 'weather?zip=' + args + ',us' + `&appid=${config.openweathermap.key}`;
    // DEBUG: output for simple api call to city
    logger.info(`url: ${url}`);
    logger.info(`url: ${url}`);
    return this.processRequest(url);
  }
}

const weatherCommand = new Weather(factoryParams);

module.exports.default = weatherCommand;
