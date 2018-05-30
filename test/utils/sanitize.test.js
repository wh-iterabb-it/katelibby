import chai from 'chai';
import sinonChai from 'sinon-chai';

import Sanitize from '../../utils/sanitize';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Sanitize Utility Tests', () => {
  describe('sanitize method', () => {
    it('should return empty string if nothing is passed in', () => {
      const expected = '';
      const resp = Sanitize.sanitize();
      expect(resp).to.equal(expected);
    });

    it('should fix arrays of 1 length to be string', () => {
      const testData = ['tacos'];
      const expected = 'tacos';
      const resp = Sanitize.sanitize(testData);
      expect(resp).to.equal(expected);
    });

    it('should return empty string if empty object is passed in', () => {
      const testData = {};
      const expected = '';
      const resp = Sanitize.sanitize(testData);
      expect(resp).to.equal(expected);
    });

    it('should remove br tags', () => {
      const testData = '</br>';
      const expected = '';
      const resp = Sanitize.sanitize(testData);
      expect(resp).to.equal(expected);
    });

    it('should remove br tag and add rn line', () => {
      const testData = 'tacos</br>tacos';
      const expected = 'tacos\ntacos';
      const resp = Sanitize.sanitize(testData);
      expect(resp).to.equal(expected);
    });

    it('should remove empty lines', () => {
      const testData = 'tacos</br></br></br>tacos';
      const expected = 'tacos\ntacos';
      const resp = Sanitize.sanitize(testData);
      expect(resp).to.equal(expected);
    });
  });

  describe('detectHostName method', () => {
    it('should return www.youtube.com string for http youtube url', () => {
      const testData = 'http://www.youtube.com/watch?v=nXy32Dr4Z4A';
      const expected = 'www.youtube.com';
      const resp = Sanitize.detectHostName(testData);
      expect(resp).to.equal(expected);
    });

    it('should return www.youtube.com string for https youtube url', () => {
      const testData = 'https://www.youtube.com/watch?v=nXy32Dr4Z4A';
      const expected = 'www.youtube.com';
      const resp = Sanitize.detectHostName(testData);
      expect(resp).to.equal(expected);
    });

    it('should return www.youtube.com string for no protocol youtube url', () => {
      const testData = 'www.youtube.com/watch?v=nXy32Dr4Z4A';
      const expected = 'www.youtube.com';
      const resp = Sanitize.detectHostName(testData);
      expect(resp).to.equal(expected);
    });

    it('should return www.amazon.co.uk string for a complex amazon url', () => {
      const testData = 'https://www.amazon.co.uk/JavaScript-Babies-Code-Sterling-Childrens' +
      '/dp/1454921579/ref=sr_1_fkmr0_1?ie=UTF8&qid=1527617357&sr=8-1-fkmr0';
      const expected = 'www.amazon.co.uk';
      const resp = Sanitize.detectHostName(testData);
      expect(resp).to.equal(expected);
    });
  });

  describe('extractRootDomain method', () => {
    it('should return www.youtube.com string for http youtube url', () => {
      const testData = 'http://www.youtube.com/watch?v=nXy32Dr4Z4A';
      const expected = 'youtube.com';
      const resp = Sanitize.extractRootDomain(testData);
      expect(resp).to.equal(expected);
    });

    it('should return www.youtube.com string for https youtube url', () => {
      const testData = 'https://www.youtube.com/watch?v=nXy32Dr4Z4A';
      const expected = 'youtube.com';
      const resp = Sanitize.extractRootDomain(testData);
      expect(resp).to.equal(expected);
    });

    it('should return www.youtube.com string for no protocol youtube url', () => {
      const testData = 'www.youtube.com/watch?v=nXy32Dr4Z4A';
      const expected = 'youtube.com';
      const resp = Sanitize.extractRootDomain(testData);
      expect(resp).to.equal(expected);
    });

    it('should return www.amazon.co.uk string for a complex amazon url', () => {
      const testData = 'https://www.amazon.co.uk/JavaScript-Babies-Code-Sterling-Childrens' +
      '/dp/1454921579/ref=sr_1_fkmr0_1?ie=UTF8&qid=1527617357&sr=8-1-fkmr0';
      const expected = 'amazon.co.uk';
      const resp = Sanitize.extractRootDomain(testData);
      expect(resp).to.equal(expected);
    });
  });
});