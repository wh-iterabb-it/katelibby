const {
  WebClient, RTMClient, CLIENT_EVENTS, IncomingWebhook,
} = require('@slack/client');

import commands from '../commands';
import logger from '../utils/logger';
import Sanitize from '../utils/sanitize';
import config from '../helpers/config_helper';

class slackHelper {
  constructor() {
    this.appData = {
      source: {}
    };
    logger.debug('slack helper start');
    this.commandPattern = this.setCommandPattern(config.commandChar);
  }

  setupEvents() {
    logger.debug('setupEvents');
    // this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, this.onAuthenticate(connectData));
    // this.rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, this.onConnect());
    this.onMessage();
  }

  /**
   * connect
   * builds all connection objects
   * @param slack
   *    token - the slack token to form the connection
   */
  connect(slack) {
    logger.debug('connect');
    this.appData.realName = slack.realName;
    this.connectRTM(slack.token);
    this.connectWeb(slack.token);
  }

  /**
   * connectRTM
   * Initialize the RTM client with the recommended settings. Using the defaults for these
   * @param token - the slack token to form the connection
   */
  connectRTM(token) {
    logger.debug('connectRTM');
    this.rtm = new RTMClient(token);
    this.rtm.start();
    // settings is deprecated.
    // {
    //   dataStore: false,
    //   useRtmConnect: true,
    // }
  }

  /**
   * connectWeb
   * builds web object
   * @param token - the slack token to form the connection
   */
  connectWeb(token) {
    logger.debug('connectWeb');
    // Initialize a Web API client
    this.web = new WebClient(token);
  }

  /**
   * onMessage
   * The message handler for incoming messages for the helper
   */
  onMessage() {
    logger.debug('onMessage setup');
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
      logger.debug(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
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
    if (match) {
      const command = match[1];
      const args = match[2];

      if (command in commands) {
        logger.debug(`Command found: channel: ${message.channel}, user: ${message.user}, command: ${command}`);
        commands[command].main(args,this.appData).then((response) => {
          this.sendMessage(message.channel, `${response}`);
          logger.debug(response);
        }).catch((error) => {
          this.sendMessage(message.channel, `${error}`);
          logger.error(error);
        });
      }
    }
  }

  /**
   * sendMessage
   * used for sending a message to channel or person
   * @param {string} channelID - Unique Identifier for the channel to message, also can be a user id
   * @param {string} messageBody - the message to send
   */
  sendMessage(channelID, messageBody) {
   // try {
      // use the `sendMessage()` method to send a simple string to a channel using the channel ID
      this.rtm.sendMessage(messageBody, channelID)
        .then((msg) => logger.debug(`Sent: ${channelID} with ts:${msg.ts}`))
        .catch((err) => {
          logger.error(`sendMessage has experienced an Error: ${err}`);
        });
    // } catch(err) {
    //   logger.error(`sendMessage has experienced an Error: ${err}`);
    // }
  }

  /**
   * setCommandPattern
   * @param {char} commandChar - a single character which denotes the start of a command
   * @return {string} regexString - the regular expression string for the commands to be parsed by
   */
  setCommandPattern(commandChar) {
    logger.debug('setCommandPattern');
    const regexString = `^${commandChar}(\\w+) ?(.*)`;
    this.commandPattern = new RegExp(regexString);
    return regexString;
  }

  /**
   * onAuthenticate
   * The client will emit an RTM.AUTHENTICATED event on when the connection data is available
   * (before the connection is open)
   * @param {object} connectData
   */
  // onAuthenticate(connectData) {
  //   // Cache the data necessary for this app in memory
  //   this.appData.selfId = connectData.self.id;
  //   this.appData.teamId = connectData.team.id;
  //   logger.info(`Logged in as ${connectData.self.id} of team ${connectData.team.id}`);
  // }

  /**
   * onConnect
   * The Connect handler for when a new connection is established
   */
  // onConnect() {
  //   logger.info('Ready');
  // }

  // onReactionAdded() {
  //   // Log all reactions
  //   rtm.on('reaction_added', (event) => {
  //     // Structure of `event`: <https://api.slack.com/events/reaction_added>
  //     console.log(`Reaction from ${event.user}: ${event.reaction}`);
  //   });
  // }

  // onReactionRemoved() {
  //   rtm.on('reaction_removed', (event) => {
  //     // Structure of `event`: <https://api.slack.com/events/reaction_removed>
  //     console.log(`Reaction removed by ${event.user}: ${event.reaction}`);
  //   });
  // }

  /**
   * onReady
   * The ready handler for when connection is established and readiness
   */
  // onReady() {
  //   rtm.on('ready', (event) => {
  //
  //     // Getting a conversation ID is left as an exercise for the reader. It's usually available as the `channel` property
  //     // on incoming messages, or in responses to Web API requests.
  //
  //     // const conversationId = '';
  //     // rtm.sendMessage('Hello, world!', conversationId);
  //   });
  // }
}

export default slackHelper;
