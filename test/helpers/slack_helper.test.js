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
    sandbox.stub(logger, 'debug');
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
        sandbox.stub(slack.rtm, 'sendMessage').resolves({ts: 'stuff'});
      });

      it('should accept the promise from the mock stub with no error', () => {
        const channelID = `1234`;
        const messageBody = `ok`;
        slack.sendMessage(channelID. messageBody);
        logger.error.should.not.have.been.calledWith();
      });
    });

    // context('Failure Cases', () => {
    //   beforeEach(() => {
    //     slack = new Slack();
    //     // mocking stuff
    //     slack.rtm = () => {};
    //     slack.rtm.sendMessage = () => {};
    //     sandbox.stub(slack.rtm, 'sendMessage').rejects(new Error('foo'));
    //   });

    //   it('should throw an error durring a promise rejection', () => {
    //     const channelID = `1234`;
    //     const messageBody = `ok`;
    //     slack.sendMessage(channelID. messageBody);
    //     logger.error.should.have.been.calledWith();
    //   });
    // });
  });

  describe('detectCommand', () => {
    context('Success Cases', () => {
      beforeEach(() => {
        slack = new Slack();
        slack.setCommandPattern('!');
        // mocking stuff
        slack.rtm = () => {};
        slack.rtm.sendMessage = () => {};
        sandbox.stub(slack.rtm, 'sendMessage').resolves({ts: 'stuff'});
      });

      it('should accept the promise from the mock stub with no error with real command', () => {
        const message = {channel:'foo', user: 'bar', text: '!help'};
        slack.detectCommand(message);
        logger.error.should.not.have.been.calledWith();
      });

      it('should accept the promise from the mock stub with no error with fake command', () => {
        const message = {channel:'foo', user: 'bar', text: '!taco'};
        slack.detectCommand(message);
        logger.error.should.not.have.been.calledWith();
      });

      it('should accept the promise from the mock stub with no error with no command', () => {
        const message = {channel:'foo', user: 'bar', text: 'bell'};
        slack.detectCommand(message);
        logger.error.should.not.have.been.calledWith();
      });
    });
  });

  describe('setupEvents', () => {
    context('Success Cases', () => {
      beforeEach(() => {
        slack = new Slack();
        // mocking stuff
        slack.onMessage = ()=> {};
        sandbox.stub(slack, 'onMessage');
      });

      it('should accept the promise from the mock stub with no error', () => {
        slack.setupEvents();
        logger.debug.should.have.been.calledWith();
        slack.onMessage.should.have.been.calledWith();
        logger.error.should.not.have.been.calledWith();
      });
    });
  });

  describe('connect', () => {
    context('Success Cases', () => {
      beforeEach(() => {
        slack = new Slack();
        // mocking stuff
        slack.connectRTM = ()=> {};
        slack.connectWeb = ()=> {};
        sandbox.stub(slack, 'connectRTM');
        sandbox.stub(slack, 'connectWeb');
      });

      it('should accept the promise from the mock stub with no error', () => {
        slack.connect({token: 'test', realName: 'kate'});
        slack.connectRTM.should.have.been.calledWith();
        slack.connectWeb.should.have.been.calledWith();
        logger.error.should.not.have.been.calledWith();
      });
    });
  });
});
