import request from 'superagent';
import GitHubApi from 'github';

import logger from '../utils/logger';
import config from '../helpers/config_helper';

function Github() {
  this.instance = new GitHubApi( ...config.github.connect );

  if (!(this instanceof Github)) return new Github(config);
}

Github.prototype.authorize = function(){
  this.instance.authenticate({
    type: config.github.auth.type,
    token: config.github.auth.token
  });
};

Github.prototype.getEventsforRepo = function(repo, callback){
  logger.info('getOpenPRs()');
  this.instance.getEventsForRepo({
    owner: config.github.owner, // this can maybe be passed in later
    repo: repo
  }, function(err, res) {
      if (!err) {
        logger.info('request complete, return');
        callback(res.data);
      } else {
        logger.warn( `getOpenPRs has errored: ${err.toJSON()}`);
      }
  });
};

Github.prototype.getOpenPRs = function(repo, callback){
  logger.info('getOpenPRs()');
  this.instance.pullRequests.getAll({
    owner: config.github.owner, // this can maybe be passed in later
    repo: repo,
  }, function(err, res) {
      if (!err) {
        logger.info('request complete, return');
        callback(res.data);
      } else {
        logger.warn( `getOpenPRs has errored: ${err.toJSON()}`);
      }
  });
};

Github.prototype.getSinglePR = function(repo, number,  callback){
  logger.info(`getSinglePR(${id})`);
  this.instance.pullRequests.get({
    owner: config.github.owner, // this can maybe be passed in later
    repo: repo,
    number: number
  }, function(err, res) {
      if (!err) {
        logger.info('request complete, return');
        callback(res.data);
      } else {
        logger.warn( `getSinglePR has errored: ${err.toJSON()}`);
      }
  });
};

module.exports = Github;
