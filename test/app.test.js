import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import logger from '../utils/logger';
import config from '../helpers/config_helper';
import kate from '../app';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('App Tests', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    sandbox.stub(logger, 'info');
    sandbox.stub(logger, 'warn');
    sandbox.stub(logger, 'debug');
    sandbox.stub(logger, 'error');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('connectDiscord method', () => {
    it('should return expected log for no config', () => {
      config.discord = '';
      kate.connectDiscord();
      // info log of 'No discord configuration found'
    });
    it('should return expected log for valid config', () => {
      config.discord = [{
        realName: 'Kate Libby',
        token: 'tacobell', // REQUIRED
      }];
      kate.connectDiscord();
      logger.error.should.not.have.been.calledWith();
    });
  });

  describe('connectSlack method', () => {
    it('should return expected log for no config', () => {
      config.slack = '';
      kate.connectSlack();
      // info log of 'No slack configuration found'
      logger.error.should.not.have.been.calledWith();
      logger.info.should.have.been.calledWith();
    });
  });

  describe('connectIRC method', () => {
    it('should return expected log for no config', () => {
      config.irc = '';
      kate.connectIRC();
      // info log of 'No irc  configuration found'
      logger.error.should.not.have.been.calledWith();
      logger.info.should.have.been.calledWith();
    });
  });

  describe('init', () => {
    context('Success Cases', () => {
      beforeEach(() => {
        // mocking stuff
        kate.connectDiscord = ()=> {};
        kate.connectSlack = ()=> {};
        kate.connectIRC = ()=> {};
        sandbox.stub(kate, 'connectDiscord');
        sandbox.stub(kate, 'connectSlack');
        sandbox.stub(kate, 'connectIRC');
      });

      it('should accept the promise from the mock stub with no error', () => {
        kate.init();
        kate.connectDiscord.should.have.been.calledWith();
        kate.connectSlack.should.have.been.calledWith();
        kate.connectIRC.should.have.been.calledWith();
        logger.error.should.not.have.been.calledWith();
      });
    });
  });
});
