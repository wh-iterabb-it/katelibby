import { toHHMMSS } from '../utils/sanitize';
import pjson from '../package.json';
console.log(pjson.version);
module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args.toLowerCase()) {
      case 'help':

      case 'uptime':
        let time = process.uptime();
        let uptime = toHHMMSS(time + '');
        callback.say(target, 'Uptime: ' + uptime);
        return 'uptime';
      case 'version':
        callback.say(target, 'Version: ' + pjson.version);
        return 'version';
      case 'help':
      default:
        callback.say(target, callback.config.commandChar + 'about version - displays ' + callback.config.irc.userName + 's version');
        callback.say(target, callback.config.commandChar + 'about uptime - Calculates the amount of uptime of ' + callback.config.irc.userName);
        callback.say(target, 'Syntax is ' + callback.config.commandChar + 'about {uptime|version}');
        return 'help';
    }
  }
};
