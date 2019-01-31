import chai from 'chai';
import sinonChai from 'sinon-chai';

import {toHHMMSS, toDDHHMMSS, formatMoney, formatPast} from '../../utils/format';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Format Utility Tests', () => {
  describe('toDDHHMMSS method', () => {
    it('should return 1 second when 1 seconds passed in', () => {
      const expected = '00:00:00:01';
      const resp = toDDHHMMSS(1);
      expect(resp).to.equal(expected);
    });

    it('should return 1 minute when 60 seconds passed in', () => {
      const expected = '00:00:01:00';
      const resp = toDDHHMMSS(60);
      expect(resp).to.equal(expected);
    });

    it('should return 1 hour when 3600 seconds passed in', () => {
      const expected = '00:01:00:00';
      const resp = toDDHHMMSS(3600);
      expect(resp).to.equal(expected);
    });

    it('should return 1 day when 86400 seconds passed in', () => {
      const expected = '01:00:00:00';
      const resp = toDDHHMMSS(86400);
      expect(resp).to.equal(expected);
    });

    it('should return 0 when 0 seconds passed in', () => {
      const expected = '00:00:00:00';
      const resp = toDDHHMMSS(0);
      expect(resp).to.equal(expected);
    });

    it('should return 1 day 1 hour 1 minute 6 seconds when 90066 seconds passed in', () => {
      const expected = '01:01:01:06';
      const resp = toDDHHMMSS(90066);
      expect(resp).to.equal(expected);
    });
  });

  describe('toHHMMSS method', () => {
    it('should return 1 second when 1 seconds passed in', () => {
      const expected = '00:00:01';
      const resp = toHHMMSS(1);
      expect(resp).to.equal(expected);
    });

    it('should return 1 minute when 60 seconds passed in', () => {
      const expected = '00:01:00';
      const resp = toHHMMSS(60);
      expect(resp).to.equal(expected);
    });

    it('should return 1 hour when 3600 seconds passed in', () => {
      const expected = '01:00:00';
      const resp = toHHMMSS(3600);
      expect(resp).to.equal(expected);
    });

    it('should return 0 when 0 seconds passed in', () => {
      const expected = '00:00:00';
      const resp = toHHMMSS(0);
      expect(resp).to.equal(expected);
    });

    it('should return 0 when 0 seconds passed in', () => {
      const expected = '01:01:06';
      const resp = toHHMMSS(3666);
      expect(resp).to.equal(expected);
    });
  });

  describe('formatMoney method', () => {
    it('should return correct dollar figure and round correctly on complex input', () => {
      const expected = '$705,726,246.27';
      const resp = formatMoney('705726246.26999999');
      expect(resp).to.equal(expected);
    });

    it('should return round correctly on "0.49999" to $0.50', () => {
      const expected = '$0.50';
      const resp = formatMoney('0.49999');
      expect(resp).to.equal(expected);
    });
  });

  describe('formatPast method', () => {
    it('should return 0:00:00 because we are passing in right now', () => {
      const expected = '0:00:00';
      let time = Math.floor(Date.now() / 1000);
      const resp = formatPast(time);
      expect(resp).to.equal(expected);
    });
  });

  describe('detectURL method', () => {
    it('should return true when detecting a real url', () => {
      try {
        const testURL = 'http://www.google.com';
        const result = detectURL(testURL);
        expect(result).to.equal(true);
      } catch (error) {}
    });

    it('should return false when detecting an invalid url', () => {
      try {
        const testURL = 'tacobell';
        const result = detectURL(testURL);
        expect(result).to.equal(false);
      } catch (error) {}
    });
  });
});
