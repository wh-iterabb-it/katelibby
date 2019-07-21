const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const nock = require('nock');

const commands = require('../../lib/commands');
const logger = require('../../lib/utils/logger').default;
const config = require('../../lib/helpers/config_helper').default;

const { expect } = chai;
chai.should();
chai.use(sinonChai);

describe('Command', () => {
  describe('Weather', () => {
    let sandbox;
    const testKey = 'testKey';
    const testZip = '12345';
    const unexpectedResult = { error: 'invalid blah blah' };
    const expectedResult10023 = {
      "coord": {
        "lon":-74,
        "lat":40.79
      },
      "weather":[
        {
          "id":802,
          "main":"Clouds",
          "description":"scattered clouds",
          "icon":"03n"
        }
      ],
      "base":"stations",
      "main": {
        "temp":286.59,
        "pressure":1021,
        "humidity":62,
        "temp_min":283.71,
        "temp_max":289.26
      },
      "visibility":16093,
      "wind": {
        "speed":1.5
      },
      "clouds": {
        "all":40
      },
      "dt":1554689049,
      "sys": {
        "type":1,
        "id":4610,
        "message":0.0085,
        "country":"US",
        "sunrise":1554632994,
        "sunset":1554679562
      },
      "id":420027064,
      "name":"New York",
      "cod":200
    };

    const expected = 'Current temperature in New York, New York, 12345 is 58.6°F, with a humidity of 41%, Current Weather is Overcast';
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

    // it('should log a warn when there is no api key', () => {
    //   config.wunderground.key = '';
    //   commands.weather.main('12345');
    //   expect(logger.warn).to.have.been.called;
    // });
    //
    // it('should return expected promise rejection and result when malformed data is sent', (done) => {
    //   config.wunderground.key = testKey; // 'testKey' is our key :D
    //
    //   nock('http://api.wunderground.com')
    //     .get(`/api/${testKey}/conditions/q/77777.json`)
    //     .reply(200, unexpectedResult);
    //
    //   commands.weather.main('77777').then(() => {}).catch((error) => {
    //     expect(error).to.equal('Are you trying to make me crash?');
    //     done();
    //   });
    // });
    //
    // it('should return expected nyc result', (done) => {
    //   config.wunderground.key = testKey; // 'testKey' is our key :D
    //
    //   nock('http://api.wunderground.com')
    //     .get(`/api/${testKey}/conditions/q/${testZip}.json`)
    //     .reply(200, expectedResult10023);
    //
    //   try {
    //     commands.weather.main(testZip).then((result) => {
    //       expect(result).to.equal(expected);
    //       done();
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    //
    // it('should return expected help result when passed help', (done) => {
    //   config.wunderground.key = testKey; // 'testKey' is our key :D
    //   try {
    //     commands.weather.main('help').then((result) => {
    //       expect(result).to.equal(expectedHelp);
    //       done();
    //     });
    //   } catch (error) {}
    // });
  });
});
