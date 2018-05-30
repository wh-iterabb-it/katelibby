import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../commands/';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('Fortune', () => {

    const expectedHelp = 'Fortune is for getting a cookie fortune in Chat \r\nSyntax is !fortune';

    it('should return expected help result when passed help', (done) => {
      config.app.nsfw = true;
      try {
        commands.fortune('help').then((result) => {
          expect(result).to.equal(expectedHelp);
          done();
        });
      } catch (error) {}
    });

    /**
     * This is a bad test, but alturnative is coppying all of the array
     * and deep comparison the result.
     */
    it('should return any expected string when passed empty string', (done) => {
      config.app.nsfw = true;
      try {
        commands.fortune('').then((result) => {
          expect(result).to.be.a('string');
          done();
        });
      } catch (error) {}
    });
  });
});