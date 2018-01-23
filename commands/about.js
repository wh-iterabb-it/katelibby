import toHHMMSS from '../utils/format';
import pjson from '../package.json';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args.toLowerCase()) {
      case 'uptime': {
        const time = process.uptime();
        const uptime = toHHMMSS(time + '');
        callback.say(target, 'Uptime: ' + uptime);
        break;
      }
      case 'version': {
        callback.say(target, 'Version: ' + pjson.version);
        break;
      }
      case 'help':
      default:
        callback.say(target, callback.config.commandChar + 'about version ' +
         '- displays ' + callback.config.irc.userName + 's version');
        callback.say(target, callback.config.commandChar + 'about uptime - ' +
         'Calculates the amount of uptime of ' + callback.config.irc.userName);
        callback.say(target, 'Syntax is ' + callback.config.commandChar + 'about {uptime|version}');
        return 'help';
    }
  }
};
