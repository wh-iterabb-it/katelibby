import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import nock from 'nock';

import commands from '../../commands/';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('Coin', () => {

    const ethResponse = {
      Markets: [
        {
          Label: 'ETH/BTC',
          Name: 'Ethereum',
          Price: 500.4265206,
          Volume_24h: 701419076.0392652,
          Timestamp: 1529244720
        }
      ]
    };
    const unexpectedResult = { error: 'wut'};
    const expectedHelp = 'Getting the current price USD of a given crypto coin.\n\rSyntax is !coin { ETH }';

    it('should return expected help result when passed help', (done) => {
      try {
        commands.coin.main('help').then((result) => {
          expect(result).to.equal(expectedHelp);
          done();
        });
      } catch (error) {}
    });

    it('should return expected promise rejection and result when malformed data is sent', (done) => {
      config.worldcoinindex.key = 'testKey'; // 'testKey' is our key :D

      nock('https://www.worldcoinindex.com')
        .get(`/apiservice/ticker?key=testKey&label=tacbtc&fiat=usd`)
        .reply(200, unexpectedResult);

      commands.coin.main('tacobell').then(()=>{}).catch((error) => {
        expect(error).to.equal('Are you trying to make me crash?');
        done();
      });
    });
    
    it('should return expected promise rejection and result when no key is found', (done) => {
      config.worldcoinindex.key = '';
      
      try {
        commands.coin.main('eth').then(()=>{}).catch((error) => {
          expect(error).to.equal('Please add an API key to the configuration file.');
          done();
        });
      } catch (error) {
        console.log(error);
      }
    });

    it('should return expected eth result', (done) => {
      config.worldcoinindex.key = 'testKey'; // 'testKey' is our key :D

      nock('https://www.worldcoinindex.com')
        .get(`/apiservice/ticker?key=testKey&label=ethbtc&fiat=usd`)
        .reply(200, ethResponse);

      const expected = '1 ETH = $500.43 USD as of 2:59:50 ago\n\r24 Hour Volume $701,419,076.04 USD\n\rEthereum https://www.worldcoinindex.com/coin/Ethereum';

      try {
        commands.coin.main('eth').then((result) => {
          expect(result).to.be.a('string');
          done();
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
