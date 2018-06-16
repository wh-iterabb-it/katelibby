import chai from 'chai';
import sinonChai from 'sinon-chai';

import kate from '../../helpers/slack_helper';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Slack Helper Tests', () => {
  describe('detectURL method', () => {
    it('should return true when detecting a real url', () => {
      try {
        const slack = new Slack();
        const testURL = 'http://wh.iterabb.it';
        const result = slack.detectURL(testURL);
        expect(result).to.equal(true);
      } catch (error) {}
    });

    it('should return false when detecting an invalid url', () => {
      try {
        const slack = new Slack();
        const testURL = 'tacobell';
        const result = slack.detectURL(testURL);
        expect(result).to.equal(true);
      } catch (error) {}
    });
  });
});
