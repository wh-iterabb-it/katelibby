import pkginfo from './package.json';
import commands from './commands';
import xxmp from './helpers/irc_helper';
import config from './helpers/config_helper';
import urlRegex from './utils/url_regex';
import logger from './utils/logger';
import request from 'request';
import entities from 'entities';

// this may be moved to a new client file later
// factory functions are hardly useful but i wanted use them
const Bot = {
  init() {
    this.logger = logger;
    this.config = config;
    this.commands = commands;
    this.nick = '';
    this.commandPattern = new RegExp('^' + this.config.commandChar + '(\\w+) ?(.*)');
    xxmp(this); // Connection to normal IRC
  },
  say(to, message) {
    this.logger.info('say: ' + to + ' ' + message);
    // const newText = irc.colors.wrap('cyan', message);
    this.client.say(to, message);
  },
  isURL(str) {
    if (str.length < 2083 && (str.match(urlRegex))) {
      const match = str.match(urlRegex);
      return match[0];
    }
    return false;
  },
  isSUB(str) {
    if (str.length < 2083 && (str.match(/\/r\/([^\s\/]+)/i))) {
      const match = str.match(/\/r\/([^\s\/]+)/i);
      return match[0];
    }
    return false;
  },
  getSub(sub) {
    return 'Are you talking about http://www.reddit.com' + sub + '/ ?';
  },
  getTitle(nurl, target) {
    const durl = (nurl.indexOf('http') !== 0 ? 'http://' + nurl : nurl);
    const titleRegex = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/ig;
    request(durl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const match = titleRegex.exec(body);
        if (match && match[2]) {
          const decodedTitle = entities.decodeHTML(match[2]);
          this.say(target, '[' + decodedTitle + ']');
        }
      }
    });
  },
};

export function start() {
  logger.info('bot realname ' + config.irc.realName);
  logger.info('starting katelibby v' + pkginfo.version);
  const bot = () => Object.assign(Object.create(Bot));
  const kate = bot();
  kate.init();
}
