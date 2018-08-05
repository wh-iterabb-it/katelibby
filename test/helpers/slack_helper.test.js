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
    sandbox.stub(logger, 'error');
    slack = new Slack();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('setCommandPattern', () => {
    context('Success Cases', () => {
      it('should return a successful creation of the commandpattern with variable given', () => {
        const testCommandChar = '@';
        const expected = `^${testCommandChar}(\\w+) ?(.*)`;
        // const slack = new Slack();
        let result = slack.setCommandPattern(testCommandChar);
        expect(result).to.equal(expected);
      });
    });
  });

  describe('sendMessage', () => {
    context('Success Cases', () => {
      beforeEach(() => {
        slack = new Slack();
        // mocking stuff
        slack.rtm = () => {};
        slack.rtm.sendMessage = () => {};
        sandbox.stub(slack.rtm, 'sendMessage').resolves();
      });

      it('should accept the promise from the mock stub with no error', () => {
        const channelID = `1234`;
        const messageBody = `ok`;
        slack.sendMessage(channelID. messageBody);
        logger.error.should.not.have.been.calledWith();
      });
    });
  });
});
