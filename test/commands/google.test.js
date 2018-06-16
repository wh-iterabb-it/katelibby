import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../commands/';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('Google', () => {
    const expectedHelp = 'Googling stuff in IRC has never been easier \r\nSyntax is !g { query for google }';

    it('should return expected help result when passed help', (done) => {
      try {
        commands.google.main('help').then((result) => {
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
      try {
        commands.google.main('travis ci').then((result) => {
          expect(result).to.be.a('string');
          done();
        });
      } catch (error) {}
    });
  });
});
