const {
  WebClient, RTMClient, CLIENT_EVENTS, IncomingWebhook,
} = require('@slack/client');

import config from '../helpers/config_helper';
import commands from '../commands';
import logger from '../utils/logger';
import urlRegex from '../utils/urlRegex';
import Sanitize from '../utils/sanitize';
import toHHMMSS from '../utils/format';
import pkjson from '../package.json';



class slackHelper {
  constructor(callback) {
    this.appData = {
      source: {}
    };
    logger.info('slack helper start');
    this.connect();
    this.commandPattern = this.setCommandPattern(config.commandChar);
    this.onMessage();
    this.rtm.start();
  }

  setupEvents() {
    // this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, this.onAuthenticate(connectData));
    // this.rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, this.onConnect());
    this.onMessage();
  }

  /**
   * connect
   * builds all connection objects
   */
  connect() {
    logger.info('connect');
    this.connectRTM();
    this.connectWeb();
  }

  connectRTM() {
    logger.info('connectRTM');
    // Initialize the RTM client with the recommended settings. Using the defaults for these
    // settings is deprecated.
    this.rtm = new RTMClient(config.slack.token);
    // {
    //   dataStore: false,
    //   useRtmConnect: true,
    // }
  }

  connectWeb() {
    logger.info('connectWeb');
    // Initialize a Web API client
    this.web = new WebClient(config.slack.token);
  }

  /**
   * onAuthenticate
   * The client will emit an RTM.AUTHENTICATED event on when the connection data is available
   * (before the connection is open)
   * @param {object} connectData
   */
  onAuthenticate(connectData) {
    // Cache the data necessary for this app in memory
    this.appData.selfId = connectData.self.id;
    this.appData.teamId = connectData.team.id;
    logger.info(`Logged in as ${connectData.self.id} of team ${connectData.team.id}`);
  }

  /**
   * onConnect
   * The Connect handler for when a new connection is established
   */
  onConnect() {
    logger.info('Ready');
  }

  /**
   * onMessage
   * The message handler for incoming messages for the helper
   */
  onMessage() {
    this.rtm.on('message', (message) => {
      // For structure of `event`, see https://api.slack.com/events/message

      // Skip messages that are from a bot or my own user ID
      if ((message.subtype && message.subtype === 'bot_message') ||
           // (!message.subtype && message.user === this.rtm.activeUserId) || // self messages
           (message.user === undefined)) {
        return;
      }

      this.detectCommand(message);

      // Log the message
      logger.info(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
    });
  }

  onReactionAdded() {
    // Log all reactions
    rtm.on('reaction_added', (event) => {
      // Structure of `event`: <https://api.slack.com/events/reaction_added>
      console.log(`Reaction from ${event.user}: ${event.reaction}`);
    });
  }

  onReactionRemoved() {
    rtm.on('reaction_removed', (event) => {
      // Structure of `event`: <https://api.slack.com/events/reaction_removed>
      console.log(`Reaction removed by ${event.user}: ${event.reaction}`);
    });
  }

  /**
   * onReady
   * The ready handler for when connection is established and readiness 
   */
  onReady() {
    rtm.on('ready', (event) => {

      // Getting a conversation ID is left as an exercise for the reader. It's usually available as the `channel` property
      // on incoming messages, or in responses to Web API requests.

      // const conversationId = '';
      // rtm.sendMessage('Hello, world!', conversationId);
    });
  }

  /**
   * detectCommand
   * detects and calls a command from a message
   * @param {Object} message - the message is the current message being read.
   */
  async detectCommand(message) {
    const text = message.text;
    const match = text.match(this.commandPattern);
    const url = this.detectURL(text)
    if (match) {
      const command = match[1];
      const args = match[2];

      if (command in commands) {
        logger.info(`Command found: channel: ${message.channel}, user: ${message.user}, command: ${command}`);
        commands[command](args).then((response) => {
          this.sendMessage(message.channel, `${response}`);
          logger.info(response);
        }).catch((error) => {
          this.sendMessage(message.channel, `${error}`);
          logger.error(error);
        });
      } else {
        // i want this to be abstracted into a stats util or something
        if (command === 'stats') {
          this.sendMessage(message.channel, 'Stats for this Slack');
          const time = process.uptime();
          const uptime = toHHMMSS(time + '');
          this.sendMessage(message.channel, 'Total Uptime of Bot: ' + uptime);
          this.sendMessage(message.channel, 'Version: ' + pkjson.version);
          this.sendMessage(message.channel, 'Top domains linked in this slack:');
          for(let prop in this.appData.source) {
            this.sendMessage(message.channel, `${this.appData.source[prop].domain} = ${this.appData.source[prop].count} links`);
          }
        } else {
          this.sendMessage(message.channel, 'Sorry I do not know that command.');
        }
      }
    } else if (url) {
      // this is a simple url counter... 
      const domain = Sanitize.extractRootDomain(url);
      if (this.appData.source.hasOwnProperty(domain)) {
        this.appData.source[domain].count ++;
      } else {
        const thegoods = {
          'domain': domain,
          'count': 1
        };
        this.appData.source[domain] = thegoods;
      }
      logger.info(this.appData.source[domain].domain + ' ' + this.appData.source[domain].count);
    }
  }

  /**
   * detectURL
   * @param {string} str - a string to check for a url in it
   */
  detectURL(str) {
    if (str.length < 2083 && (str.match(urlRegex))) {
      const match = str.match(urlRegex);
      return match[0];
    }
    return false;
  }

  /**
   * sendMessage
   * used for sending a message to channel or person
   * @param {string} channelID - Unique Identifier for the channel to message, also can be a user id
   * @param {string} messageBody - the message to send
   */
  sendMessage(channelID, messageBody) {
    // use the `sendMessage()` method to send a simple string to a channel using the channel ID
    this.rtm.sendMessage(messageBody, channelID)
      // Returns a promise that resolves when the message is sent
      .then((msg) => logger.info(`Sent: ${channelID} with ts:${msg.ts}`))
      .catch(logger.error);
  }

  /**
   * setCommandPattern
   * @param {char} commandChar - a single character which denotes the start of a command
   * @return {string} regexString - the regular expression string for the commands to be parsed by
   */
  setCommandPattern(commandChar) {
    logger.info('setCommandPattern');
    const regexString = `^${commandChar}(\\w+) ?(.*)`;
    this.commandPattern = new RegExp(regexString);
    return regexString;
  }
}

export default slackHelper;
