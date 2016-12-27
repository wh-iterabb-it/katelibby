import { toHHMMSS } from '../utils/sanitize';
module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Calculates the amount of uptime of ' + callback.config.irc.userName);
        callback.say(target, 'Syntax is ' + callback.config.commandChar + 'uptime');
        return 'help';
    }
  }

  const time = process.uptime();
  const uptime = toHHMMSS(time + '');

  callback.say(target, 'Uptime: ' + uptime);
};
