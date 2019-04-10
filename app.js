const express = require('express');
const http = require('http');

// const Doctor = require('./lib/middleware/kubernetes').default;
const logger = require('./lib/utils/logger').default;
const Slack = require('./lib/helpers/slack_helper').default;
const config = require('./lib/helpers/config_helper').default;

class Kate {
  constructor() {
    //this.doctor = new Doctor();
    //this.doctor.app.set('port', 3946);
    this.bot_stack = [];
    this.connectDiscord();
    this.connectSlack();
    this.connectIRC();
    //this.doctor.updateStatus();
    //const server = http.createServer(this.doctor.app);
  }

  /**
   * connectDiscord
  **/
  connectDiscord() {
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
  connectSlack() {
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
  connectIRC() {
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
const kate = new Kate();

process.on('message', msg => {
  if (msg === 'shutdown') {
    process.exit(0);
  }
});

process.on('SIGTERM', () => {
  process.exit(1);
});
module.exports.default = kate;
