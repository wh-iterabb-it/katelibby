import irc from 'irc';
import commands from '../commands';

module.exports = (callback) => {
  if (callback.config.twitch.connect) {
    callback.logger.info('connecting to ' + callback.config.twitch.irc.server +
    ' ' + callback.config.twitch.irc.userName);
    callback.client = new irc.Client(
      callback.config.twitch.irc.server,
      callback.config.twitch.irc.userName,
      {
        ...callback.config.twitch.irc,
      });
    callback.client.on('registered', (message) => {
      callback.logger.info(message);
      callback.nick = message.args[0];
    });
  } else {
    callback.logger.info('connecting to ' + callback.config.irc.server + ' ' + callback.config.irc.userName);
    callback.client = new irc.Client(
      callback.config.irc.server,
      callback.config.irc.userName,
      {
        ...callback.config.irc,
      });
    callback.client.on('registered', (message) => {
      callback.logger.info(message);
      callback.nick = message.args[0];
    });
  }
  callback.logger.info('connected');
  callback.client.on('message', (from, to, text, message) => {
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
  });
};
