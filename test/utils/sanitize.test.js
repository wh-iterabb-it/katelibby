import chai from 'chai';
import sinonChai from 'sinon-chai';

import sanitize from '../../utils/sanitize';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Sanitize Utility Tests', () => {
  describe('sanitize method', () => {
    it('should return empty string if nothing is passed in', () => {
      const expected = '';
      const resp = sanitize();
      expect(resp).to.equal(expected);
    });

    it('should return empty string if empty object is passed in', () => {
      const testData = {};
      const expected = '';
      const resp = sanitize(testData);
      expect(resp).to.equal(expected);
    });

    it('should remove br tags', () => {
      const testData = '</br>';
      const expected = '';
      const resp = sanitize(testData);
      expect(resp).to.equal(expected);
    });

    it('should remove br tag and add rn line', () => {
      const testData = 'tacos</br>tacos';
      const expected = 'tacos\ntacos';
      const resp = sanitize(testData);
      expect(resp).to.equal(expected);
    });

    it('should remove empty lines', () => {
      const testData = 'tacos</br></br></br>tacos';
      const expected = 'tacos\ntacos';
      const resp = sanitize(testData);
      expect(resp).to.equal(expected);
    });
  });
});
