import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import logger from '../../utils/logger';
import Irc from '../../helpers/irc_helper';

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
        irc.detectCommand(message);
        logger.error.should.not.have.been.calledWith();
      });

      it('should accept the promise from the mock stub with no error with fake command', () => {
        const message = {channel:'foo', user: 'bar', text: '!taco'};
        irc.detectCommand(message);
        logger.error.should.not.have.been.calledWith();
      });

      it('should accept the promise from the mock stub with no error with no command', () => {
        const message = {channel:'foo', user: 'bar', text: 'bell'};
        irc.detectCommand(message);
        logger.error.should.not.have.been.calledWith();
      });
    });
  });
});