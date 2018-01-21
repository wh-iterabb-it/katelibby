import irc from 'irc';

import commands from '../commands';
import config from './config_helper';
import logger from '../utils/logger';
import urlRegex from '../utils/url_regex';

function connect(callback) {
  let server = config.irc.server || 'localhost';
  let username = config.irc.userName || 'kate';
  let realname = config.irc.realName || 'Kate Libby';
  let password = config.irc.password || false;
  if(detectTwitch()) {
    logger.info(` - detected twitch ...`);
    logger.info(` - attempting to use twitch configuration`);
    // server = config.twitch.server || config.irc.server;
    // username = config.twitch.irc.userName || config.irc.userName;
    // realname = config.twitch.irc.realName || config.irc.realName;
    // password = config.twitch.password || config.irc.password;
  } else if(detectSlack()) {
    logger.info(` - detected slack ...`);
    logger.info(` - attempting to use slack configuration`);
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
    });
  callback.client.on('registered', (message) => {
    callback.logger.info(message);
    callback.nick = message.args[0];
  });
  callback.logger.info(' ✅ connected');

}

function detectTwitch() {
  const twitchRegex = new RegExp("\\b" + "twitch.tv" + "\\b");
  if (twitchRegex.test(config.irc.server)) {
    logger.debug(` - detected twitch url in config.irc.server`);
    return true;
  } else {
    logger.debug(` - no twitch url detected in config.irc.server`);
    return false;
  }
}

function detectSlack() {
  const slackRegex = new RegExp("\\b" + "slack.com" + "\\b");
  if (slackRegex.test(config.irc.server)) {
    logger.debug(` - detected slack url in config.irc.server`);
    return true;
  } else {
    logger.debug(` - no slack url detected in config.irc.server`);
    return false;
  }
}

function detectCommand(from, target, text, message, callback) {
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

function detectURL(from, target, text, message, callback) {
  if(isURL(text)) {
    getTitle(isURL(text), target);
  }
}

function detectReddit(from, target, text, message, callback) {
  if(isSUB(text)) {
    callback.say(target, getSub(isSUB(text)));
  }
}

function isURL(str) {
  if (str.length < 2083 && (str.match(urlRegex))) {
    const match = str.match(urlRegex);
    return match[0];
  }
  return false;
}


function isSUB(str) {
  if (str.length < 2083 && (str.match(/\/r\/([^\s\/]+)/i))) {
    const match = str.match(/\/r\/([^\s\/]+)/i);
    return match[0];
  }
  return false;
}

function getSub(sub) {
  return 'Are you talking about http://www.reddit.com' + sub + '/ ?';
}

function getTitle(nurl, target) {
  const durl = (nurl.indexOf('http') !== 0 ? 'http://' + nurl : nurl);
  const titleRegex = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/ig;
  request(durl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const match = titleRegex.exec(body);
      if (match && match[2]) {
        const decodedTitle = entities.decodeHTML(match[2]);
        say(target, '[' + decodedTitle + ']');
      }
    }
  });
}

// intializes the message handler for the remander of the instance.
function onMessage(from, to, text, message, callback) {
  const target = (to === callback.nick ? from : to);
  detectCommand(from, target, text, message, callback);
  if(!detectSlack()) {
    detectURL(from, target, text, message, callback);
    detectReddit(from, target, text, message, callback);
  }
}

// function onMessage(from, to, text, message, callback) {
//   const target = (to === callback.nick ? from : to);
//   callback.say(target, 'test ' + target + '!');
// }

function onKick(channel, nick, by, reason, message, callback) {
  callback.say(target, 'Goodbye !');
}

function onJoin(channel, nick, message, callback) {
  // const target = (nick === callback.nick ? channel : nick);
  // callback.say(target, 'Hello  ' + target + '!');
}

function onTopic(channel, topic, nick, message, callback) {
  const target = (to === callback.nick ? from : to);
  callback.say(target, 'Topic:  ' + target + ' ' + topic);
}

module.exports = (callback) => {
  connect(callback);

  /**
   * Emitted when a message is sent.
   * to can be either a nick (which is most likely this clients nick and means a private message), or a channel (which means a message to that channel).
   * See the raw event for details on the message object.
   */
  callback.client.on('message', (from, to, text, message) => {
    onMessage(from, to, text, message, callback);
  });

  /**
   * Emitted when a user joins a channel (including when the client itself joins a channel).
   * See the raw event for details on the message object.
   */
  callback.client.on('join', (channel, nick, message) => {
    onJoin(channel, nick, message, callback);
  });
  /**
   * Emitted when a user is kicked from a channel. See the raw event for details on the message object.
   */
  callback.client.on('kick', (channel, nick, by, reason, message) => {
    onKick(channel, nick, by, reason, message, callback);
  });

  /**
   * Emitted when the server sends the channel topic on joining a channel, or when a user changes
   * the topic on a channel. See the raw event for details on the message object.
   */
  callback.client.on('topic', (channel, topic, nick, message) => {
    onMessage(channel, topic, nick, message, callback);
  });
};
