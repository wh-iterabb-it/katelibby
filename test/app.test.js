import chai from 'chai';
import sinonChai from 'sinon-chai';

import config from '../helpers/config_helper';
import kate from '../app';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('App Tests', () => {
  describe('connectDiscord method', () => {
    it('should return expected log for no config', () => {
      config.discord = '';
      kate.connectDiscord();
      // info log of 'No discord configuration found'
    });
  });
  describe('connectIRC method', () => {
    it('should return expected log for no config', () => {
      config.irc = '';
      kate.connectIRC();
      // info log of 'No irc  configuration found'
    });
  });
});
