import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../commands/';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('Coin', () => {

    const expectedHelp = 'Getting the current price USD of a given crypto coin.\n\rSyntax is !coin { ETH }';

    it('should return expected help result when passed help', (done) => {
      try {
        commands.coin.main('help').then((result) => {
          expect(result).to.equal(expectedHelp);
          done();
        });
      } catch (error) {}
    });
  });
});
