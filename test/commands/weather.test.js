import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import nock from 'nock';

import commands from '../../commands/';
import logger from '../../utils/logger';
import config from '../../helpers/config_helper';

const { expect } = chai;
chai.should();
chai.use(sinonChai);

describe('Command', () => {
  describe('Weather', () => {
    let sandbox;
    const testKey = 'testKey';
    const testZip = '12345';
    const expectedResult10023 = {
      "response": {
      "version":"0.1",
      "termsofService":"http://www.wunderground.com/weather/api/d/terms.html",
      "features": {
      "conditions": 1
      }
      }
      , "current_observation": {
        "image": {
        "url":"http://icons.wxug.com/graphics/wu2/logo_130x80.png",
        "title":"Weather Underground",
        "link":"http://www.wunderground.com"
        },
        "display_location": {
        "full":"New York, NY",
        "city":"New York",
        "state":"NY",
        "state_name":"New York",
        "country":"US",
        "country_iso3166":"US",
        "zip":"12345",
        "magic":"1",
        "wmo":"99999",
        "latitude":"40.77999878",
        "longitude":"-73.98000336",
        "elevation":"14.9"
        },
        "observation_location": {
        "full":"Central Park, New York",
        "city":"Central Park",
        "state":"New York",
        "country":"US",
        "country_iso3166":"US",
        "latitude":"40.78",
        "longitude":"-73.98",
        "elevation":"148 ft"
        },
        "estimated": {
        },
        "station_id":"KNYNEWYO787",
        "observation_time":"Last Updated on May 18, 11:04 PM EDT",
        "observation_time_rfc822":"Fri, 18 May 2018 23:04:58 -0400",
        "observation_epoch":"1526699098",
        "local_time_rfc822":"Fri, 18 May 2018 23:09:39 -0400",
        "local_epoch":"1526699379",
        "local_tz_short":"EDT",
        "local_tz_long":"America/New_York",
        "local_tz_offset":"-0400",
        "weather":"Overcast",
        "temperature_string":"58.6 F (14.8 C)",
        "temp_f":58.6,
        "temp_c":14.8,
        "relative_humidity":"41%",
        "wind_string":"Calm",
        "wind_dir":"SE",
        "wind_degrees":135,
        "wind_mph":0.3,
        "wind_gust_mph":0,
        "wind_kph":0,
        "wind_gust_kph":0,
        "pressure_mb":"1028",
        "pressure_in":"30.37",
        "pressure_trend":"-",
        "dewpoint_string":"35 F (2 C)",
        "dewpoint_f":35,
        "dewpoint_c":2,
        "heat_index_string":"NA",
        "heat_index_f":"NA",
        "heat_index_c":"NA",
        "windchill_string":"NA",
        "windchill_f":"NA",
        "windchill_c":"NA",
        "feelslike_string":"58.6 F (14.8 C)",
        "feelslike_f":"58.6",
        "feelslike_c":"14.8",
        "visibility_mi":"10.0",
        "visibility_km":"16.1",
        "solarradiation":"--",
        "UV":"0","precip_1hr_string":"0.00 in ( 0 mm)",
        "precip_1hr_in":"0.00",
        "precip_1hr_metric":" 0",
        "precip_today_string":"0.00 in (0 mm)",
        "precip_today_in":"0.00",
        "precip_today_metric":"0",
        "icon":"cloudy",
        "icon_url":"http://icons.wxug.com/i/c/k/nt_cloudy.gif",
        "forecast_url":"http://www.wunderground.com/US/NY/New_York.html",
        "history_url":"http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KNYNEWYO787",
        "ob_url":"http://www.wunderground.com/cgi-bin/findweather/getForecast?query=40.776901,-73.981300",
        "nowcast":""
      }
    };

    const expected = `Current temperature in New York, New York, 12345 is 58.6°F, with a humidity of 41%, Current Weather is Overcast`;
    const expectedHelp = 'Weather command queries the Weather Underground for your local weather \n\rSyntax is !w { zipcode OR city, state }';

    before(() => {
      sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
      sandbox.stub(logger, 'warn');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should log a warn when there is no api key', () => {
      config.wunderground.key = '';
      commands.weather.main('12345');
      expect(logger.warn).to.have.been.called;
    });

    it('should return expected nyc result', (done) => {
      config.wunderground.key = testKey; // 'testKey' is our key :D

      nock('http://api.wunderground.com')
        .get(`/api/${testKey}/conditions/q/${testZip}.json`)
        .reply(200, expectedResult10023);

      try {
        commands.weather.main(testZip).then((result) => {
          expect(result).to.equal(expected);
          done();
        });
      } catch (error) {
        console.log(error);
      }
    });

    it('should return expected help result when passed help', (done) => {
      config.wunderground.key = testKey; // 'testKey' is our key :D
      try {
        commands.weather.main('help').then((result) => {
          expect(result).to.equal(expectedHelp);
          done();
        });
      } catch (error) {}
    });
  });
});
