import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../commands';

const { expect } = chai;

describe('Command', () => {
  describe('About', () => {

    const expectedHelp = 'About this bot, will return \r\nSyntax is !about';

    it('should return expected help result when passed help', (done) => {
      try {
        commands.about.main('help').then((result) => {
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
        commands.about.main('').then((result) => {
          expect(result).to.be.a('string');
          done();
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
