import chai from 'chai';
import sinonChai from 'sinon-chai';

import kate from '../../helpers/slack_helper';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Slack Helper Tests', () => {
  describe('connect method', () => {
    it('should spin up preflight connection logic', () => {
      try {
        const slack = new Slack(this);
        slack.connect();
        const timer = new Promise(function(resolve) {
         setTimeout(resolve(1), 5000);
        });

        timer.then(() => {
          slack.disconnect();
          done();
        });
      } catch (error) {}
    });
  });
});
