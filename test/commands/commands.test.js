import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import irc from '../../helpers/irc_helper';

import commands from '../../commands';


chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Command Test', () => {
  let callback = {};
  let sandbox;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    callback = {
      nsfw: sandbox.stub(),
      say: sandbox.stub(),
      config: {
        commandChar: () => {
          return '!';
        },
        irc: {
          userName: () => {
            return 'kate';
          },
        }
      },
      commands: commands,
    };
  });

  afterEach(() => {
    // Restore sinon sandbox
    sandbox.restore();
  });

  describe('fortune command', () => {
    it('should call say with no args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = '';
      commands.fortune(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with any args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'taco';
      commands.fortune(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with no args and nsfw enabled', () => {
      const target = '#general';
      const from = 'beautato';
      const args = '';
      callback.nsfw = true;
      commands.fortune(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      callback.nsfw = true;
      commands.fortune(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('8ball command', () => {
    it('should call say with no args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = '';
      commands.eight(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with any args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'taco';
      commands.eight(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.eight(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('about command', () => {
    it('should call say with no args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = '';
      commands.about(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with any args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'taco';
      commands.about(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.about(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with version as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'version';
      commands.about(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with uptime as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'uptime';
      commands.about(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('help command', () => {
    it('should call say with no args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = '';
      commands.help(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with any args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'taco';
      commands.help(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.help(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });
});
