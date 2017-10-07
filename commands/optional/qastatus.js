import githubAPI from 'github';

import config from '../helpers/config_helper';
import logger from '../utils/logger';

/** 
 * Github - qastatus command
 * This will fetch the QA status from open PRs in a specified github repo. 
 * You will need to make sure you setup the missing fields in the github namespace
 *    type: config.github.auth.type,
 *    token: config.github.auth.token
 *    owner: config.github.owner,
 *    repo: config.github.repo,
 */


/** 
 * const teams - Acceptable ticket prefixes
 * If you want to add some sort of prefix, so you can sort the tickets by name, 
 * add additional things to the array, such as 'teamname1', 'teamname2', ect
 * this way you can sort between teams with the command
 */
const teams = ['ALL'];
const labels = {
  preqa: {
    name: 'Ready for QA',
    symbol: ':grey_question:',
  }, 
  inqa: {
    name: 'In QA',
    symbol: ':pray:',
  },
  qafail: {
    name: 'QA Failed',
    symbol: ':x:',
  },
  qapass: {
    name: 'QA Passed',
    symbol: ':white_check_mark:',
  },
};

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'This command will give the QA status of open PRs for a repo.');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
        'qastatus { team prefix, ie teamname1, teamname2 or ALL for all of the teams }');
        callback.say(target, labels.preqa.symbol + ' ' + labels.preqa.name);
        callback.say(target, labels.inqa.symbol + ' ' + labels.inqa.name);
        callback.say(target, labels.qafail.symbol + ' ' + labels.qafail.name);
        callback.say(target, labels.qapass.symbol + ' ' + labels.qapass.name);
      return 'help';
    }
  } 
  if(!teams.includes(args.toUpperCase().trim())) {
    callback.say(target, 'listen buddy, you gotta pick a name from the list... ' + teams.join(', '));
    return 'vsauce';
  }
  // Get all PRs from the repo,
  let instance = new githubAPI( ...config.github.connect );
  instance.authenticate({
    type: config.github.auth.type,
    token: config.github.auth.token
  });
  callback.say(target, 'Finding all results for \`'+ args.toUpperCase() + '\`');
  if(args.toUpperCase().trim() === 'ALL') { 
    var formula = '(-)';
  } else {
    var formula = '('+args.toUpperCase()+'-)';
  }
  var qaPass = new Promise((resolve, reject) => {
    instance.pullRequests.getAll({
      owner: config.github.owner,
      repo: config.github.repo
    }, (err, res) => {
      if (!err) {
        logger.info('request complete, return');
        res.data.forEach((pr) => {
          if(pr.title.match(formula)) {
            instance.issues.getIssueLabels({
              owner: config.github.owner,
              repo: config.github.repo,
              number: pr.number
            }, (err, ras) => {
              ras.data.forEach((label,idx, array) => {
                if(label.name === labels.qapass.name){
                  callback.say(target, labels.qapass.symbol + pr.title.replace(/-/g, ' ') +
                    ' https://github.com/' + config.github.owner + '/' + config.github.repo + '/pull/'+pr.number);
                }
                if (idx === array.length - 1) { 
                  resolve(1);
                }
              }); // end of forEach
            }); // end of getIssueLabels
          } // if match formula
        });  // end of foreach PR
      } else { // if error
        logger.info( `getOpenPRs has errored: ${err.toJSON()}`);
      } // else Error
    });
  }); // qaPass promise

  qaPass.then(() => { // ------------------------
    return new Promise((resolve, reject) => { 
      instance.pullRequests.getAll({
        owner: config.github.owner,
        repo: config.github.repo
      }, (err, res) => {
        if (!err) {
          logger.info('request complete, return');
          res.data.forEach((pr) => {
            if(pr.title.match(formula)) {
              instance.issues.getIssueLabels({
                owner: config.github.owner,
                repo: config.github.repo,
                number: pr.number
              }, (err, ras) => {
                ras.data.forEach((label,idx, array) => {
                  if(label.name === labels.qafail.name){
                    callback.say(target, labels.qafail.symbol +' '+ pr.title.replace(/-/g, ' ') +
                      ' https://github.com/' + config.github.owner + '/' + config.github.repo + '/pull/'+pr.number);
                  }
                  if (idx === array.length - 1) { 
                    resolve(1);
                  }
                }); // end of forEach
              }); // end of getIssueLabels
            } // if match formula
          });  // end of foreach PR
        } else { // if error
          logger.info( `getOpenPRs has errored: ${err.toJSON()}`);
        } // else Error
      });// getAll
    }); // new promise
  }).then(() => { // end of QA fail ------------------------
    return new Promise((resolve, reject) => { 
      instance.pullRequests.getAll({
        owner: config.github.owner,
        repo: config.github.repo
      }, (err, res) => {
        if (!err) {
          logger.info('request complete, return');
          res.data.forEach((pr) => {
            if(pr.title.match(formula)) {
              instance.issues.getIssueLabels({
                owner: config.github.owner,
                repo: config.github.repo,
                number: pr.number
              }, (err, ras) => {
                ras.data.forEach((label,idx, array) => {
                  if(label.name === labels.inqa.name){
                    callback.say(target, labels.inqa.symbol +' '+ pr.title.replace(/-/g, ' ') +
                      ' https://github.com/' + config.github.owner + '/' + config.github.repo + '/pull/'+pr.number);
                  }
                  if (idx === array.length - 1) { 
                    resolve(1);
                  }
                }); // end of forEach
              }); // end of getIssueLabels
            } // if match formula
          });  // end of foreach PR
        } else { // if error
          logger.info( `getOpenPRs has errored: ${err.toJSON()}`);
        } // else Error
      });// getAll
    }); // new promise
  }).then(() => { // End of In QA ------------------------
    return new Promise((resolve, reject) => { 
      instance.pullRequests.getAll({
        owner: config.github.owner,
        repo: config.github.repo
      }, (err, res) => {
        if (!err) {
          logger.info('request complete, return');
          res.data.forEach((pr) => {
            if(pr.title.match(formula)) {
              instance.issues.getIssueLabels({
                owner: config.github.owner,
                repo: config.github.repo,
                number: pr.number
              }, (err, ras) => {
                ras.data.forEach((label,idx, array) => {
                  if(label.name === labels.preqa.name){
                    callback.say(target, labels.preqa.symbol +' '+ pr.title.replace(/-/g, ' ') + 
                      ' https://github.com/' + config.github.owner + '/' + config.github.repo + '/pull/'+pr.number);
                  }
                  if (idx === array.length - 1) { 
                    resolve(1);
                  }
                }); // end of forEach
              }); // end of getIssueLabels
            } // if match formula
          });  // end of foreach PR
        } else { // if error
          logger.info( `getOpenPRs has errored: ${err.toJSON()}`);
        } // else Error
      });// getAll
    }); // new promise
  }); // end of need QA ------------------------
};
