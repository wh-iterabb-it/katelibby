import irc from 'irc';
import request from 'request';
import entities from 'entities';

import commands from '../commands';
import config from './config_helper';
import logger from '../utils/logger';
import urlRegex from '../utils/url_regex';

class ircHelper {
  constructor(callback) {
    ircHelper.connect(callback);

    /**
     * Emitted when a message is sent.
     * to can be either a nick (which is most likely this clients nick and means
     * a private message), or a channel (which means a message to that channel).
     * See the raw event for details on the message object.
     */
    callback.client.on('message', (from, to, text, message) => {
      ircHelper.onMessage(from, to, text, message, callback);
    });

    /**
     * Emitted when a user joins a channel (including when the client itself joins a channel).
     * See the raw event for details on the message object.
     */
    callback.client.on('join', (channel, nick, message) => {
      ircHelper.onJoin(channel, nick, message, callback);
    });
    /**
     * Emitted when a user is kicked from a channel. See the raw event for details on the message object.
     */
    callback.client.on('kick', (channel, nick, by, reason, message) => {
      ircHelper.onKick(channel, nick, by, reason, message, callback);
    });

    /**
     * Emitted when the server sends the channel topic on joining a channel, or when a user changes
     * the topic on a channel. See the raw event for details on the message object.
     */
    callback.client.on('topic', (channel, topic, nick, message) => {
      ircHelper.onMessage(channel, topic, nick, message, callback);
    });
  }

  static connect(callback) {
    const server = config.irc.server || 'localhost';
    const username = config.irc.userName || 'kate';
    const realname = config.irc.realName || 'Kate Libby';
    const password = config.irc.password || false;
    if (ircHelper.detectTwitch(server)) {
      logger.info(' - detected twitch ...');
      logger.info(' - attempting to use twitch configuration');
      // server = config.twitch.server || config.irc.server;
      // username = config.twitch.irc.userName || config.irc.userName;
      // realname = config.twitch.irc.realName || config.irc.realName;
      // password = config.twitch.password || config.irc.password;
    } else if (ircHelper.detectSlack(server)) {
      logger.info(' - detected slack ...');
      logger.info(' - attempting to use slack configuration');
      // server = config.slack.server || config.irc.server;
      // username = config.slack.irc.userName || config.irc.userName;
      // realname = config.slack.irc.realName || config.irc.realName;
      // password = config.slack.password || config.irc.password;
    }
    logger.info(` - connecting to ${server} ...`);
    logger.info(` - bot username ${username}`);
    logger.info(` - bot realname ${realname}`);
    callback.client = new irc.Client(
      server,
      username,
      {
        'password': password,
        ...config.irc,
      },
    );
    callback.client.on('registered', (message) => {
      callback.logger.info(message);
      callback.nick = message.args[0];  // eslint-disable-line
    });
    callback.logger.info(' ✅ connected');
  }

  static detectTwitch(server) {
    const twitchRegex = new RegExp('\\btwitch.tv\\b');
    if (twitchRegex.test(server)) {
      logger.debug(' - detected twitch url in server');
      return true;
    } else {
      logger.debug(' - no twitch url detected in server');
      return false;
    }
  }

  static detectSlack(server) {
    const slackRegex = new RegExp('\\bslack.com\\b');
    if (slackRegex.test(server)) {
      logger.debug(' - detected slack url in server');
      return true;
    } else {
      logger.debug(' - no slack url detected in server');
      return false;
    }
  }

  static detectCommand(from, target, text, message, callback) {
    const match = text.match(callback.commandPattern);
    callback.logger.info(message);
    if (match) {
      const command = match[1];
      const args = match[2];
      if (command in commands) {
        logger.debug(` - command: '${command}' detected ...`);
        const response = commands[command](callback, target, from, args);
        if (response) { callback.logger.info(response); }
      } else {
        callback.say(target, 'Sorry, I do not know that command');
      }
    }
  }

  static detectURL(target, text, callback) {
    if (ircHelper.isURL(text)) {
      ircHelper.getTitle(ircHelper.isURL(text), target, callback);
    }
  }

  static detectReddit(from, target, text, message, callback) {
    if (ircHelper.isSUB(text)) {
      callback.say(target, ircHelper.getSub(ircHelper.isSUB(text)));
    }
  }

  static isURL(str) {
    if (str.length < 2083 && (str.match(urlRegex))) {
      const match = str.match(urlRegex);
      return match[0];
    }
    return false;
  }

  /**
   * getSub
   * used with getSub, this will find sytax `/r/subreddit` mentions
   * and turn them into a url, perhaps will be refact into modules later
   */
  static isSUB(str) {
    if (str.length < 2083 && (str.match(/\/r\/([^\s/]+)/i))) {
      const match = str.match(/\/r\/([^\s/]+)/i);
      return match[0];
    }
    return false;
  }

  /**
   * getSub
   * used with isSUB, it puts the detected subreddit, into a url link
   */
  static getSub(sub) {
    return 'Are you talking about http://www.reddit.com' + sub + '/ ?';
  }

  /**
   * getTitle
   * makes a request to retrieve the <title> of a site
   * Disabled by default if you are on slack
   */
  static getTitle(nurl, target, callback) {
    const durl = (nurl.indexOf('http') !== 0 ? 'http://' + nurl : nurl);
    const titleRegex = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/ig;
    request(durl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const match = titleRegex.exec(body);
        if (match && match[2]) {
          const decodedTitle = entities.decodeHTML(match[2]);
          callback.say(target, '[' + decodedTitle + ']');
        }
      }
    });
  }

  /**
   * onMessage
   * intializes the message handler for the remander of the instance.
   */
  static onMessage(from, to, text, message, callback) {
    const target = (to === callback.nick ? from : to);
    ircHelper.detectCommand(from, target, text, message, callback);
    if (!ircHelper.detectSlack()) {
      ircHelper.detectURL(target, text, callback);
      ircHelper.detectReddit(from, target, text, message, callback);
    }
    logger.info(` + onMessage ${target} ${message}`);
  }

  static onKick(channel, nick, by, reason, message, callback) {
    const target = (to === callback.nick ? from : to);
    logger.info(` + onKick ${target}`);
  }

  static onJoin(channel, nick, message, callback) {
    const target = (nick === callback.nick ? channel : nick);
    logger.info(` + onJoin Channel ${target}`);
  }

  static onTopic(channel, topic, nick, message, callback) {
    const target = (to === callback.nick ? from : to);
    logger.info(` + onTopic ${target} ${topic}`);
  }
}

export default ircHelper;
