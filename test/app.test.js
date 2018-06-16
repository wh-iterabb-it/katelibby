import chai from 'chai';
import sinonChai from 'sinon-chai';

import kate from '../app';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('App Tests', () => {
  describe('setCommandPattern method', () => {
    it('should spin up preflight connection logic', (done) => {
      try {
        kate.init();
        const timer = new Promise(function(resolve) {
         setTimeout(resolve(1), 5000);
        });

        timer.then(() => {
          done();
        });
      } catch (error) {}
    });
  });
});
