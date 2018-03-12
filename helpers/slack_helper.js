const { WebClient, RtmClient, CLIENT_EVENTS, IncomingWebhook } = require('@slack/client');
import logger from '../utils/logger';
import config from '../helpers/config_helper';

class slackHelper {
  constructor(callback) {
    this.appData = {};

    // passes the config' slack token to the connection function
    this.rtm = this.connect(config.slack.token);
    this.rtm = this.setupEvents(this.rtm);
    this.rtm.start();
  }

  static setupEvents(rtm) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, this.onAuthenticate(connectData));
    rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, this.onConnect());
  }

  /**
   * connect
   * @param {string} token - the slack token provided from config
   */
  static connect(token) {
    // Initialize the RTM client with the recommended settings. Using the defaults for these
    // settings is deprecated.
    const rtm = new RtmClient(token, {
      dataStore: false,
      useRtmConnect: true,
    });

    return rtm;
  }

  /**
   * onAuthenticate
   * The client will emit an RTM.AUTHENTICATED event on when the connection data is available
   * (before the connection is open)
   * @param {object} connectData
   */
  static onAuthenticate(connectData) {
    // Cache the data necessary for this app in memory
    this.appData.selfId = connectData.self.id;
    this.appData.teamId = connectData.team.id;
    logger.info(`Logged in as ${connectData.self.id} of team ${connectData.team.id}`);
  }

  /**
   * onConnect
   *
   */
  static onConnect() {
    logger.info(`Ready`);
  }

}

export default slackHelper;
