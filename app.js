import commands from './commands';
import logger from './utils/logger';
import xxmp from './helpers/irc_helper';
import config from './helpers/config_helper';

const Bot = {
  init() {
    this.logger = logger;
    this.commands = commands;
    this.config = config;
    this.nick = '';
    this.commandPattern = new RegExp('^' + config.commandChar + '(\\w+) ?(.*)');
    const irc = new xxmp(this);
  },
  say(to, message) {
    this.logger.info('say: ' + to + ' ' + message);
    // const newText = irc.colors.wrap('cyan', message);
    this.client.say(to, message);
  }
};

export function start() {
  const bot = () => Object.assign(Object.create(Bot));
  const kate = bot();
  kate.init();
}
