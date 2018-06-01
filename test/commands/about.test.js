import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../commands/';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('About', () => {

    const expectedHelp = 'Fortune is for getting a cookie about in Chat \r\nSyntax is !fortune';

    it('should return expected help result when passed help', (done) => {
      config.app.nsfw = true;
      try {
        commands.about('help').then((result) => {
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
        commands.about('').then((result) => {
          expect(result).to.be.a('string');
          done();
        });
      } catch (error) {}
    });
  });
});