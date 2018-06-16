// import xxmp from './helpers/irc_helper';
import Slack from './helpers/slack_helper';

class App {
  static init() {
    const slack = new Slack(this);
    slack.connect();
  }
}

export default App;
