import commands from './commands';
import logger from './utils/logger';
// import xxmp from './helpers/irc_helper';
import Slack from './helpers/slack_helper'
import config from './helpers/config_helper';

class App {
  static init() {
    const slack = new Slack(this);
  }

}

export default App;
