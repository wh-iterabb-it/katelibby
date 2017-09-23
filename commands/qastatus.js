module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'This command will give the QA status of open PRs for a repo.');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'qastatus { repo to check }');
        return 'help';
    }
  }
  
  // Get all PRs from the repo,

/**
 * Group the PRs into these categories
  * - QA Failed
  * - QA Passed
  * - Needs QA
  * based on their respective labels
 */

  callback.say(target, 'tacobell');
};
