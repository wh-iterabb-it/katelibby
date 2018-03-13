import commands from './commands';
import logger from './utils/logger';
// import xxmp from './helpers/irc_helper';
import config from './helpers/config_helper';

class App {
  static init() {
    logger.info('taco bell');
    logger.debug('taco bell debug');
    logger.warn('taco bell warn');
    // const { WebClient } = require('@slack/client');
    //
    // // An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
    // const token = process.env.SLACK_TOKEN;
    //
    // const web = new WebClient(token);
    //
    // // The first argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
    // const channelId = 'C1232456';
    //
    // // See: https://api.slack.com/methods/chat.postMessage
    // web.chat.postMessage(channelId, 'Hello there')
    //   .then((res) => {
    //     // `res` contains information about the posted message
    //     console.log('Message sent: ', res.ts);
    //   }).catch(console.error);
  }

}

export default App;
