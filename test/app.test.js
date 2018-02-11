import chai from 'chai';
import sinonChai from 'sinon-chai';

import commands from './commands';

// import logger from '../utils/logger';
// import irc from '../helpers/irc_helper';
import kate from '../app';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('App Tests', () => {
  describe('setCommandPattern method', () => {
    it('should return correct commandPattern when passed character', () => {
      const actual = kate.setCommandPattern('!');
      const expected = '^!(\\w+) ?(.*)';
      expect(actual).to.equal(expected);
    });
  });

  describe('setConfig method', () => {
    it('should return correct json for config', () => {
      const testJson = {
        irc: {
          server: 'localhost',
        },
      };
      const actual = kate.setConfig(testJson);
      const expected = testJson;
      expect(actual).to.equal(expected);
    });
  });
  
  describe('setupIRC method', () => {
    it('should return a fresh irc_helper response', () => {
      const expected = new xxmp(kate);
      const actual = kate.setupIRC();
      expect(actual).to.equal(expected);
    });
  });
});
