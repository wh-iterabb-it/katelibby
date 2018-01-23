import commands from './commands';
import logger from './utils/logger';
import xxmp from './helpers/irc_helper';
import config from './helpers/config_helper';

class App {
  static init() {
    this.setLogger(logger);
    this.setCommands(commands);
    this.setConfig(config);
    this.setCommandPattern(config.commandChar);
    this.setupIRC();
    this.setNSFW(config.app.nsfw);
  }

  static setNSFW(incNSFW) {
    this.nsfw = incNSFW;
    return this.nsfw;
  }

  static setLogger(incLogger) {
    this.logger = incLogger;
    return this.logger;
  }

  static setCommands(incCommands) {
    this.commands = incCommands;
    return this.commands;
  }

  static setConfig(incConfig) {
    this.config = incConfig;
    return this.config;
  }

  static setCommandPattern(commandChar) {
    const regexString = '^' + commandChar + '(\\w+) ?(.*)';
    this.commandPattern = new RegExp(regexString);
    return regexString;
  }

  static setupIRC() {
    const irc = new xxmp(this);
    return irc;
  }

  static say(to, message) {
    this.logger.info('say: ' + to + ' ' + message);
    // const newText = irc.colors.wrap('cyan', message);
    this.client.say(to, message);
  }
}

export default App;
