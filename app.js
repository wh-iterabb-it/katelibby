import Xxmp from './helpers/irc_helper';
import Slack from './helpers/slack_helper';
import config from './helpers/config_helper';
import logger from './utils/logger';

class App {
  static init() {
    this.bot_stack = [];
    this.connectDiscord();
    this.connectSlack();
    this.connectIRC();
  }

  static connectDiscord() {
    if (config.discord && config.discord.length >= 1) {
      config.discord.forEach((discordConfig) => {
        // TODO: make discord helper
      });
    } else {
      logger.info('No discord configuration found');
    }
  }

  static connectSlack() {
    if (config.slack && config.slack.length >= 1) {
      config.slack.forEach((slackConfig) => {
        logger.info(`Connecting ${slackConfig.realName} to slack`);
        const slack = new Slack();
        slack.connect(slackConfig);
        slack.setupEvents();
        this.bot_stack.push(slack);
      });
    } else {
      logger.info('No slack configuration found');
    }
  }

  static connectIRC() {
    if (config.irc && config.irc.length >= 1) {
      config.irc.forEach((ircConfig) => {
        // TODO: make irc helper
        const irc = new Xxmp();
        irc.connect(forEach);
        irc.setupEvents();
        this.bot_irc.push(irc);
      });
    } else {
      logger.info('No irc configuration found');
    }
  }
}

export default App;
