import chai from 'chai';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Utils', () => {
  let logger = require('../../utils/logger.js').default;
  // stubbing out some tests for logger
  describe('Logger', () => {
    it('should log debug without errors', () => {
      logger.debug('test');
    });
    it('should log info without errors', () => {
      logger.info('test');
    });
    it('should log warn without errors', () => {
      logger.warn('test');
    });
    it('should log error without errors', () => {
      logger.error('test');
    });
  });
});
