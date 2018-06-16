import chai from 'chai';
import sinonChai from 'sinon-chai';

import format from '../../utils/format';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Format Utility Tests', () => {
  describe('toDDHHMMSS method', () => {
    it('should return 1 second when 1 seconds passed in', () => {
      const expected = '00:00:00:01';
      const resp = format.toDDHHMMSS(1);
      expect(resp).to.equal(expected);
    });

    it('should return 1 minute when 60 seconds passed in', () => {
      const expected = '00:00:01:00';
      const resp = format.toDDHHMMSS(60);
      expect(resp).to.equal(expected);
    });

    it('should return 1 hour when 3600 seconds passed in', () => {
      const expected = '00:01:00:00';
      const resp = format.toDDHHMMSS(3600);
      expect(resp).to.equal(expected);
    });

    it('should return 1 day when 86400 seconds passed in', () => {
      const expected = '01:00:00:00';
      const resp = format.toDDHHMMSS(86400);
      expect(resp).to.equal(expected);
    });

    it('should return 0 when 0 seconds passed in', () => {
      const expected = '00:00:00:00';
      const resp = format.toDDHHMMSS(0);
      expect(resp).to.equal(expected);
    });

    it('should return 1 day 1 hour 1 minute 6 seconds when 90066 seconds passed in', () => {
      const expected = '01:01:01:06';
      const resp = format.toDDHHMMSS(90066);
      expect(resp).to.equal(expected);
    });
  });

  describe('toHHMMSS method', () => {
    it('should return 1 second when 1 seconds passed in', () => {
      const expected = '00:00:01';
      const resp = format.toHHMMSS(1);
      expect(resp).to.equal(expected);
    });

    it('should return 1 minute when 60 seconds passed in', () => {
      const expected = '00:01:00';
      const resp = format.toHHMMSS(60);
      expect(resp).to.equal(expected);
    });

    it('should return 1 hour when 3600 seconds passed in', () => {
      const expected = '01:00:00';
      const resp = format.toHHMMSS(3600);
      expect(resp).to.equal(expected);
    });

    it('should return 0 when 0 seconds passed in', () => {
      const expected = '00:00:00';
      const resp = format.toHHMMSS(0);
      expect(resp).to.equal(expected);
    });

    it('should return 0 when 0 seconds passed in', () => {
      const expected = '01:01:06';
      const resp = format.toHHMMSS(3666);
      expect(resp).to.equal(expected);
    });
  });
});
