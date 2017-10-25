import githubAPI from 'github';

import config from '../helpers/config_helper';

const ooo_msg = 'http://';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'FAQ command is just for answering commonly asked questions rudely');
        callback.say(target, 'Syntax is ' + callback.config.commandChar + 'faq { subject }');
        callback.say(target, 'The subjects are: ');
        callback.say(target, '    { release } - what is the current release branch of the project.');
        callback.say(target, '    { ooo } - the out of office email address for google calendar.');
        callback.say(target, '    { deploy } - lets you know when the next release branch will be deployed.');
        return 'help';
      case 'release':
        // Authenticate with Github
        let instance = new githubAPI(...config.github.connect);
        instance.authenticate({
          type: config.github.auth.type,
          token: config.github.auth.token
        });

        let currentRelease = new Promise((resolve, reject) => {
          instance.repos.getBranch({
            owner: config.github.owner,
            repo: config.github.repo,
            branch: config.github.release_branch,
          }, (err, res) => {
            if (!err) {
              logger.info('request complete, return');
              callback.say(target, res.data.commit.message);
              resolve(0);
              return 'release';
            } else {
              logger.info(`get currentRelease has errored: ${err.toJSON()}`);
              resolve(1);
              return 'release';
            }
          });
        });
        return 'release';
      case 'ooo':
        callback.say(target, ooo_msg);
        return 'ooo';
      case 'deploy':
        const li = [
          'The next release will be deployed later',
          'We plan on releasing the next release soon',
          'The next release comes out at exactly {{ DATABASE ERROR TABLE RELEASE TIME NOT FOUND }}',
        ];
        callback.say(target, li[Math.floor(Math.random() * li.length)]);
        return 'deploy';
    }
  }
};
