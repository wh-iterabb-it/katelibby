import chai from 'chai';
import sinonChai from 'sinon-chai';

import irc from '../../helpers/irc_helper';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('IRC Helper Tests', () => {
  describe('detectSlack method', () => {
    it('should return true when slack.com is in string', () => {
      const resp = irc.detectSlack('blahblah.slack.com');
      expect(resp).be.true;
    });

    it('should return false when slack.com is not in string', () => {
      const resp = irc.detectSlack('blahblah.asf.com');
      expect(resp).be.false;
    });
  });

  describe('detectTwitch method', () => {
    it('should return true when twitch.tv is in string', () => {
      const resp = irc.detectTwitch('blahblah.twitch.tv');
      expect(resp).be.true;
    });

    it('should return false when twitch.tv is not in string', () => {
      const resp = irc.detectTwitch('blahblah.asf.com');
      expect(resp).be.false;
    });
  });

  describe('isSUB method', () => {
    it('should return false when a string is not a subreddit', () => {
      const testString = 'http://reddit.com/u/tacos';
      const resp = irc.isSUB(testString);
      expect(resp).be.false;
    });

    it('should return false when nothing or empty string is passed in', () => {
      const testString = '';
      const resp = irc.isSUB(testString);
      expect(resp).be.false;
    });

    it('should return a subreddit when valid regex is passed in', () => {
      const testString = 'http://reddit.com/r/me_irl';
      const expected = '/r/me_irl';
      const resp = irc.isSUB(testString);
      expect(resp).to.equal(expected);
    });
  });

  describe('isURL method', () => {
    it('should return false if not a valid url', () => {
      const testString = 'Remember that website? something .com or www. http:// something?';
      const resp = irc.isURL(testString);
      expect(resp).be.false;
    });

    it('should return a url if it is a valid url', () => {
      const testString = 'You guys talking about http://www.google.com ?';
      const expected = 'http://www.google.com';
      const resp = irc.isURL(testString);
      expect(resp).to.equal(expected);
    });
  });
});
