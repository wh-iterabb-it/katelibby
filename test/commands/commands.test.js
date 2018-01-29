import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../commands';

chai.should();

chai.use(sinonChai);

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
        wunderground: {
          key: '',
        },
        giphy: {
          key: '',
        },
        worldcoinindex: {
          key: '',
        },
        commandChar: () => {
          return '!';
        },
        irc: {
          userName: () => {
            return 'kate';
          },
          realName: () => {
            return 'kate';
          },
        },
      },
      commands,
    };
  });

  afterEach(() => {
    // Restore sinon sandbox
    sandbox.restore();
  });

  describe('fortune command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.fortune(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

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
      const args = ' help';
      callback.nsfw = true;
      commands.fortune(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('8ball command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.eight(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

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
      const args = ' help';
      commands.eight(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('about command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.about(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

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
      const args = ' help';
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
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.help(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

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
      const args = ' help';
      commands.help(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('google command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.google(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.google(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('giphy command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.giphy(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = ' help';
      commands.giphy(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });
  
    describe('coin command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.coin(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = ' help';
      commands.coin(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('mtastatus command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.mtastatus(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.mtastatus(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with valid subway line as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = ' a';
      commands.mtastatus(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with invalid line as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'tacobell';
      commands.mtastatus(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('remind command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.remind(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.remind(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('weather command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.weather(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.weather(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with test as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'test';
      commands.weather(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });

  describe('woot command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.woot(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });

    it('should call say with computers as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'computers';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with wine as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'wine';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with sellout as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'sellout';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with home as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'home';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with tools as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'tools';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with accessories as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'accessories';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with sports as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'sports';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with kids as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'kids';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with shirt as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'shirt';
      commands.woot(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });
  });

  describe('xkcd command', () => {
    it('should call say with undefined args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = undefined;
      commands.xkcd(callback, target, from, args);
      callback.say.should.not.have.been.calledWith();
    });

    it('should call say with help as args', () => {
      const target = '#general';
      const from = 'beautato';
      const args = 'help';
      commands.xkcd(callback, target, from, args);
      callback.say.should.have.been.calledWith();
    });
  });
});
