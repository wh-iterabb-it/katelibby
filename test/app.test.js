import chai from 'chai';
import sinonChai from 'sinon-chai';

import kate from '../app';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('App Tests', () => {
  describe('setCommandPattern method', () => {
    it('should spin up preflight connection logic', () => {
      kate.init();
    });
  });
});
