const { WebClient, RTMClient, CLIENT_EVENTS, IncomingWebhook } = require('@slack/client');
import logger from '../utils/logger';
import config from '../helpers/config_helper';
import commands from '../commands';

class slackHelper {
  constructor(callback) {
    this.appData = {};

    // passes the config' slack token to the connection function
    // rtm = this.connectRTM(config.slack.token,, {
    //   dataStore: false,
    //   useRtmConnect: true,
    // });
    logger.info('slack helper start');
    this.rtm = new RTMClient(config.slack.token);
    // this.rtm = this.setupEvents(this.rtm);
    this.commandPattern = this.setCommandPattern(config.commandChar);
    this.onMessage();
    this.rtm.start();
    this.web = this.connectWeb(config.slack.token);

  }

  setupEvents() {
    // this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, this.onAuthenticate(connectData));
    // this.rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, this.onConnect());
    this.onMessage();
  }

  /**
   * connect
   * @param {string} token - the slack token provided from config
   */
  connect(token) {

  }

  connectRTM(token) {
    // Initialize the RTM client with the recommended settings. Using the defaults for these
    // settings is deprecated.


    return rtm;
  }

  connectWeb(token) {
    logger.info('connectWeb');
    // Initialize a Web API client
    const web = new WebClient(token);

    return web;
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
    logger.info(`Ready`);
  }

  /** 
   * onMessage
   * The message handler for incoming messages for the helper
   */
  onMessage() {
    this.rtm.on('message', (message) => {
      // For structure of `event`, see https://api.slack.com/events/message

      // Skip messages that are from a bot or my own user ID
      if ( (message.subtype && message.subtype === 'bot_message') ||
           // (!message.subtype && message.user === this.rtm.activeUserId) || // self messages
           (message.user === undefined) ) {
        return;
      }

      this.detectCommand(message);

      // Log the message
      logger.info(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
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
        logger.info(`Command found: channel: ${message.channel}, user: ${message.user}, command: ${command}`);
        commands[command](args).then((r) => {
          this.sendMessage(message.channel, `${r}`);
          logger.error(r);
        }).catch((e)=>{
          this.sendMessage(message.channel, `${r}`);
          logger.error(e);
        });
      } else {
        this.sendMessage(message.channel, `Sorry I do not know that command.`);
      }
    }
  }

  //
  sendMessage(channelID, messageBody) {
    // We now have a channel ID to post a message in!
    // use the `sendMessage()` method to send a simple string to a channel using the channel ID
    this.rtm.sendMessage(messageBody, channelID)
      // Returns a promise that resolves when the message is sent
      .then((msg) => logger.info(`Sent: ${channelID} with ts:${msg.ts}`))
      .catch(logger.error);
  }

  setCommandPattern(commandChar) {
    logger.info('setCommandPattern');
    const regexString = `^${commandChar}(\\w+) ?(.*)`;
    this.commandPattern = new RegExp(regexString);
    return regexString;
  }

  commandCheck() {

  }

}

export default slackHelper;
