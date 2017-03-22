import irc from 'irc';
import commands from '../commands';
import config from './config_helper';

function connect(callback) {
  if (config.twitch.connect) { // Twitch Connection
    callback.logger.info('connecting to ' + config.twitch.irc.server +
    ' ' + config.twitch.irc.userName);
    callback.client = new irc.Client(
      config.twitch.server,
      config.irc.userName,
      {
        config.irc.password,
        ...config.irc,
      });
    callback.client.on('registered', (message) => {
      callback.logger.info(message);
      callback.nick = message.args[0];
    });
  } else if (config.slack.connect) { // Slack Connection
    callback.logger.info('connecting to ' + config.slack.server +
    ' ' + config.twitch.irc.userName);
    callback.client = new irc.Client(
      config.slack.server,
      config.irc.userName,
      {
         config.slack.password,
        ...config.irc,
      });
    callback.client.on('registered', (message) => {
      callback.logger.info(message);
      callback.nick = message.args[0];
    });
  } else {
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
  }
  callback.logger.info('connected');
}

function initMessage(from, to, text, message, callback) {
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
  } else if (callback.isURL(text)) {
    callback.getTitle(callback.isURL(text), to);
  } else if (callback.isSUB(text)) {
    callback.say(target, callback.getSub(callback.isSUB(text)));
  }
}

function onMessage(from, to, text, message, callback) {
  const target = (to === callback.nick ? from : to);
  callback.say(target, 'test ' + target + '!');
}

function onKick(from, to, text, message, callback) {
  const target = (to === callback.nick ? from : to);
  callback.say(target, 'Goodbye ' + target + '!');
}

function onJoin(from, to, text, message, callback) {
  const target = (to === callback.nick ? from : to);
  callback.say(target, 'Welcome ' + target + '!');
}

module.exports = (callback) => {
  connect(callback);

  callback.client.on('message', (from, to, text, message) => {
    onMessage(from, to, text, message, callback);
  });
  callback.client.on('join', (from, to, text, message) => {
    initMessage(from, to, text, message, callback);
    onJoin(from, to, text, message, callback);
  });
  callback.client.on('kick', (from, to, text, message) => {
    onKick(from, to, text, message, callback);
  });
};
