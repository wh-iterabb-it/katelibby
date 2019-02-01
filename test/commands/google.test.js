const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const commands = require('../../commands');

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
  });
});
