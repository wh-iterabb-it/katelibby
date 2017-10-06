import irc from 'irc';
import commands from '../commands';
import config from './config_helper';

function connect(callback) {
  callback.logger.info('connecting to ' + config.irc.server + ' ' + config.irc.userName);
  callback.client = new irc.Client(
    config.irc.server,
    config.irc.userName,
    {
      ...config.irc,
    });
  callback.client.on('registered', (message) => {
    callback.logger.info(message);
    callback.nick = message.args[0];
  });
  callback.logger.info('connected');
}

function connectTwitch(callback) {
  // Twitch Connection
  callback.logger.info('connecting to ' + config.twitch.irc.server +
  ' ' + config.twitch.irc.userName);
  callback.client = new irc.Client(
    config.twitch.server,
    config.irc.userName,
    {
      'password': config.twitch.password,
      ...config.twitch.irc,
    });
      
  callback.client.on('registered', (message) => {
    callback.logger.info(message);
    callback.nick = message.args[0];
  });
}

function connectSlack(callback) {
  // Slack Connection
  callback.logger.info('connecting to ' + config.slack.server +
  ' ' + config.twitch.irc.userName);
  callback.client = new irc.Client(
    config.slack.irc.server,
    config.slack.irc.userName,
    {
      'password': config.slack.password,
      ...config.slack.irc,
    });
  callback.client.on('registered', (message) => {
    callback.logger.info(message);
    callback.nick = message.args[0];
  });
}
// intializes the message handler for the remander of the instance.
function onMessage(from, to, text, message, callback) {
  const target = (to === callback.nick ? from : to);
  const match = text.match(callback.commandPattern);
  callback.logger.info(message);
  if (match) {
    const command = match[1];
    const args = match[2];
    if (command in commands) {
      const response = commands[command](callback, target, from, args);
      if (response) { callback.logger.info(response); }
    } else {
      callback.say(target, 'Sorry, I do not know that command');
    }
  // } else if (callback.isURL(text)) {
  //  callback.getTitle(callback.isURL(text), to);
  // } else if (callback.isSUB(text)) {
  //  callback.say(target, callback.getSub(callback.isSUB(text)));
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
  const target = (nick === callback.nick ? channel : nick);
  callback.say(target, 'Hello  ' + target + '!');
}

function onTopic(channel, topic, nick, message, callback) {
  const target = (to === callback.nick ? from : to);
  callback.say(target, 'Topic:  ' + target + ' ' + topic);
}

module.exports = (callback) => {
  connect(callback);

  /** function (nick, to, text, message) { }
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
