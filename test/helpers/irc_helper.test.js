import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import logger from '../../utils/logger';
import irc from '../../helpers/irc_helper';

chai.should();

chai.use(sinonChai);

describe('IRC Helper', () => {
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
});
