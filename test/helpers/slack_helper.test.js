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
    sandbox.stub(logger, 'info');
    sandbox.stub(logger, 'warn');
    slack = new Slack();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('setCommandPattern', () => {
    it('should just not crash when spun up on this test', () => {
      const testCommandChar = '@';
      const expected = `^${testCommandChar}(\\w+) ?(.*)`;
      const slack = new Slack();
      let result = slack.setCommandPattern(testCommandChar);
      expect(result).to.equal(expected);
    });
  });
});
