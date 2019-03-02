// import Xxmp from './helpers/irc_helper';

const logger = require('./utils/logger').default;
const Slack = require('./helpers/slack_helper').default;
const config = require('./helpers/config_helper').default;

class App {
  static init() {
    this.bot_stack = [];
    this.connectDiscord();
    this.connectSlack();
    this.connectIRC();
  }

  /**
   * connectDiscord
  **/
  static connectDiscord() {
    if (config.discord && config.discord.length >= 1) {
      config.discord.forEach((discordConfig) => {
        // TODO: make discord helper
      });
    } else {
      logger.info('No discord configuration found');
    }
  }

  /**
   * connectSlack
  **/
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

  /**
   * connectIRC
  **/
  static connectIRC() {
    if (config.irc && config.irc.length >= 1) {
      // config.irc.forEach((ircConfig) => {
      //   // TODO: make irc helper
      //   const irc = new Xxmp();
      //   irc.connect(forEach);
      //   irc.setupEvents();
      //   this.bot_irc.push(irc);
      // });
    } else {
      logger.info('No irc configuration found');
    }
  }
}

module.exports.default = App;
