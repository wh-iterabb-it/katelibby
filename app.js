import request from 'request';
import entities from 'entities';

import pkginfo from './package.json';
import commands from './commands';
import xxmp from './helpers/irc_helper';
import config from './helpers/config_helper';
import logger from './utils/logger';

const Bot = {
  init() {
    this.logger = logger;
    this.commands = commands;
    this.nick = '';
    this.commandPattern = new RegExp('^' + config.commandChar + '(\\w+) ?(.*)');
    xxmp(this); // Connection to normal IRC
  },
  say(to, message) {
    this.logger.info('say: ' + to + ' ' + message);
    // const newText = irc.colors.wrap('cyan', message);
    this.client.say(to, message);
  }
};

export function start() {
  logger.info('starting katelibby v' + pkginfo.version);
  const bot = () => Object.assign(Object.create(Bot));
  const kate = bot();
  kate.init();
}
