import commands from './commands';
import xxmp from './helpers/irc_helper';
import config from './helpers/config_helper';

const Bot = {
  init() {
    this.logger = logger;
    this.commands = commands;
    this.nick = '';
    this.commandPattern = new RegExp('^' + config.commandChar + '(\\w+) ?(.*)');
    xxmp(this);
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

export default Bot;
