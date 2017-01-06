import pkginfo from './package.json';
import commands from './commands';
import config from './helpers/config_helper';
import urlRegex from './utils/url_regex';
import logger from './utils/logger';
// import { randColor, color } from './utils/text_color';
import irc from 'irc';
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
    this.connect(); // Connection to normal IRC
    this.messageHandler(); // Normal messageHandler for IRC
  },
  connect() {
    if (this.config.twitch.connect) {
      this.logger.info('connecting to ' + this.config.twitch.irc.server + ' ' + this.config.twitch.irc.userName);
      this.client = new irc.Client(
        this.config.twitch.irc.server,
        this.config.twitch.irc.userName,
        {
          ...this.config.twitch.irc,
        });
      this.client.on('registered', (message) => {
        this.logger.info(message);
        this.nick = message.args[0];
      });
    } else {
      this.logger.info('connecting to ' + this.config.irc.server + ' ' + this.config.irc.userName);
      this.client = new irc.Client(
        this.config.irc.server,
        this.config.irc.userName,
        {
          ...this.config.irc,
        });
      this.client.on('registered', (message) => {
        this.logger.info(message);
        this.nick = message.args[0];
      });
    }
    this.logger.info('connected');
  },
  messageHandler() {
    this.client.on('message', (from, to, text, message) => {
      const target = (to === this.nick ? from : to);
      const match = text.match(this.commandPattern);
      this.logger.info(message);
      if (match) {
        const command = match[1];
        const args = match[2];
        if (command in commands) {
          const response = commands[command](this, target, from, args);
          if (response) { this.logger.info(response); }
        } else {
          this.say(target, 'Sorry, I do not know that command');
        }
      } else if (this.isURL(text)) {
        this.getTitle(this.isURL(text), to);
      } else if (this.isSUB(text)) {
        this.say(target, this.getSub(this.isSUB(text)));
      }
    });
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
