import irc from 'irc';

import commands from '../commands';
import logger from '../utils/logger';
import Sanitize from '../utils/sanitize';
import config from '../helpers/config_helper';

class ircHelper {
  constructor() {
    this.appData = {
      source: {}
    };
    logger.debug('irc helper start');
    this.commandPattern = this.setCommandPattern(config.commandChar);
  }

  /**
   * connect
   * builds all connection objects
   * @param irc
   */
  connect(inc_irc) {
    logger.debug('connect');
    this.appData.server = inc_irc.server;
    this.appData.username = inc_irc.userName;
    this.appData.realname = inc_irc.realName;
    this.appData.password = inc_irc.password || false;
    logger.debug(` - connecting to ${this.appData.server} ...`);
    logger.debug(` - bot username ${this.appData.username}`);
    logger.debug(` - bot realname ${this.appData.realname}`);
    this.client = new irc.Client(
      this.appData.server,
      this.appData.username,
      {
        'password': this.password,
        ...inc_irc,
      },
    );

    logger.info(' ✅ connected');
  }

  /**
   * setupEvents
   */
  setupEvents() {
    logger.debug('setupEvents');
    this.onMessage();
    this.onRegistered();
  }

  /**
   * onRegistered
   */
  onRegistered() {
  	logger.debug('onRegistered setup');
  	this.client.on('registered', (message) => {
      logger.debug(` - ${message}`);
      this.appData.nick = message.args[0];  // eslint-disable-line
    });
  }

  /**
   * onJoin
   */
  onJoin() {
  	/**
     * Emitted when a user joins a channel (including when the client itself joins a channel).
     * See the raw event for details on the message object.
     */
    this.client.on('join', (channel, nick, message) => {
      // this.onJoin(channel, nick, message);
    });
  }

  /**
   * onKick
   */
  onKick() {
    /**
     * Emitted when a user is kicked from a channel. See the raw event for details on the message object.
     */
    this.client.on('kick', (channel, nick, by, reason, message) => {
      // this.onKick(channel, nick, by, reason, message);
    });
  }

  /**
   * onTopic
   */
  onTopic() {
    /**
     * Emitted when the server sends the channel topic on joining a channel, or when a user changes
     * the topic on a channel. See the raw event for details on the message object.
     */
    this.client.on('topic', (channel, topic, nick, message) => {
      this.onMessage(channel, topic, nick, message);
    });
  }

  /**
   * onMessage
   * The message handler for incoming messages for the helper
   */
  onMessage() {
  	logger.debug('onMessage setup');
    /**
     * Emitted when a message is sent.
     * to can be either a nick (which is most likely this clients nick and means
     * a private message), or a channel (which means a message to that channel).
     * See the raw event for details on the message object.
     */
    this.client.on('message', (from, to, text, message) => {
	    const target = (to === this.appData.nick ? from : to);
	    this.detectCommand(from, target, text, message);
	    // ircHelper.detectURL(target, text, callback);
	    // ircHelper.detectReddit(from, target, text, message, callback);
	    logger.debug(` + onMessage ${target} ${message}`);
    });
  }

  /**
   * detectCommand
   * detects and calls a command from a message
   * @param {object} from - 
   * @param {object} target - 
   * @param {object} text - 
   * @param {Object} message - the message is the current message being read.
   */
  async detectCommand(from, target, text, message) {
    const match = text.match(this.commandPattern);
    logger.debug(message);
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
      } else {
        this.sendMessage(target, 'Sorry, I do not know that command');
      }
    }
  }

  /**
   * sendMessage
   * @param {Object} to - 
   * @param {Object} message - the message is the current message being read.
   */
  sendMessage(to, message) {
  	this.client.say(to, message);
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

}

export default ircHelper;
