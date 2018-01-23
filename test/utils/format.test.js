import chai from 'chai';
import sinonChai from 'sinon-chai';

import format from '../../utils/format';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Format Utility Tests', () => {
  describe('toHHMMSS method', () => {
    it('should return 1 second when 1 seconds passed in', () => {
      const expected = '00:00:01';
      const resp = format(1);
      expect(resp).to.equal(expected);
    });

    it('should return 1 minute when 60 seconds passed in', () => {
      const expected = '00:01:00';
      const resp = format(60);
      expect(resp).to.equal(expected);
    });

    it('should return 1 hour when 3600 seconds passed in', () => {
      const expected = '01:00:00';
      const resp = format(3600);
      expect(resp).to.equal(expected);
    });

    it('should return 0 when 0 seconds passed in', () => {
      const expected = '00:00:00';
      const resp = format(0);
      expect(resp).to.equal(expected);
    });
  });
});
