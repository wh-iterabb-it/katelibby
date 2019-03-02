const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const commands = require('../../lib/commands');

const { expect } = chai;

describe('Command', () => {
  describe('Catfacts', () => {
    const expectedHelp = 'Catfacts returns a random cat fact! \r\nSyntax is !catfacts';

    it('should return expected help result when passed help', (done) => {
      try {
        commands.catfacts.main('help').then((result) => {
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
        commands.catfacts.main('').then((result) => {
          expect(result).to.be.a('string');
          done();
        });
      } catch (error) {}
    });
  });
});
