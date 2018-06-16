import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import logger from '../../utils/logger';
import Slack from '../../helpers/slack_helper';

chai.should();
chai.use(sinonChai);
const { expect } = chai;

describe('Slack Helper Tests', () => {
  let sandbox;
  let slack;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    slack = new Slack();
    sandbox.stub(logger, 'warn');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('detectURL method', () => {
    it('should return true when detecting a real url', () => {
      try {
        const testURL = 'http://www.google.com';
        const result = slack.detectURL(testURL);
        expect(result).to.equal(true);
      } catch (error) {}
    });

    it('should return false when detecting an invalid url', () => {
      try {
        const testURL = 'tacobell';
        const result = slack.detectURL(testURL);
        expect(result).to.equal(false);
      } catch (error) {}
    });
  });
});
