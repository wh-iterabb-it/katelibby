import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../commands/';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('Fortune', () => {

    const expectedHelp = 'Fortune is for getting a cookie fortune in Chat \n\rSyntax is !fortune';

    it('should return expected help result when passed help', (done) => {
      try {
        commands.fortune('help').then((result) => {
          expect(result).to.equal(expectedHelp);
          done();
        });
      } catch (error) {}
    });
  });
});