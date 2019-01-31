import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const logger = require('../../utils/logger').default;
const Irc = require('../../helpers/irc_helper').default;

chai.should();
chai.use(sinonChai);
const { expect } = chai;

describe('Irc Helper Tests', () => {
  let sandbox;
  let irc;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    sandbox.stub(logger, 'info');
    sandbox.stub(logger, 'warn');
    sandbox.stub(logger, 'debug');
    sandbox.stub(logger, 'error');
    irc = new Irc();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('setCommandPattern', () => {
    context('Success Cases', () => {
      it('should return a successful creation of the commandpattern with variable given', () => {
        const testCommandChar = '@';
        const expected = `^${testCommandChar}(\\w+) ?(.*)`;
        let result = irc.setCommandPattern(testCommandChar);
        expect(result).to.equal(expected);
      });
    });
  });

  describe('sendMessage', () => {
    context('Success Cases', () => {
      beforeEach(() => {
        irc.client = () => {};
        irc.client.say = () => {};
        sandbox.stub(irc.client, 'say');
      });

      it('should complete without error for calling say function', () => {
        irc.sendMessage('to', 'message');
        irc.client.say.should.have.been.calledWith();
      });
    });
  });

  describe('setupEvents', () => {
    context('Success Cases', () => {
      beforeEach(() => {
        // mocking stuff
        irc.onMessage = ()=> {};
        irc.onRegistered = ()=> {};
        sandbox.stub(irc, 'onMessage');
        sandbox.stub(irc, 'onRegistered');
      });

      it('should accept the promise from the mock stub with no error', () => {
        irc.setupEvents();
        logger.debug.should.have.been.calledWith();
        irc.onMessage.should.have.been.calledWith();
        irc.onRegistered.should.have.been.calledWith();
        logger.error.should.not.have.been.calledWith();
      });
    });
  });

 describe('detectCommand', () => {
    context('Success Cases', () => {
      beforeEach(() => {
        irc.setCommandPattern('!');
        // mocking stuff
        irc.client = () => {};
        irc.client.say = () => {};
        sandbox.stub(irc.client, 'say');
      });

      it('should accept the promise from the mock stub with no error with real command', () => {
        const message = {channel:'foo', user: 'bar', text: '!help'};
        const text = '!help';
        irc.detectCommand('from', 'target', text, message);
        logger.error.should.not.have.been.calledWith();
      });

      it('should accept the promise from the mock stub with no error with fake command', () => {
        const message = {channel:'foo', user: 'bar', text: '!taco'};
        const text = '!taco';
        irc.detectCommand('from', 'target', text, message);
        logger.error.should.not.have.been.calledWith();
      });

      it('should accept the promise from the mock stub with no error with no command', () => {
        const message = {channel:'foo', user: 'bar', text: 'bell'};
        const text = 'bell';
        irc.detectCommand('from', 'target', text, message);
        logger.error.should.not.have.been.calledWith();
      });
    });
  });
});
