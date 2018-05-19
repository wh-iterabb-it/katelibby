import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../../commands/';
import logger from '../../../utils/logger';
import config from '../../../helpers/config_helper';

const { expect } = chai;
chai.should();
chai.use(sinonChai);

describe('Weather Command', () => {
  describe('w', () => {
    let sandbox;

    before(() => {
      sandbox = sinon.sandbox.create();
    });

    beforeEach(() => {
      sandbox.stub(logger, 'error');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should log an error when there is no api key', () => {
      commands.weather('12345');
      expect(logger.error).to.have.been.called;
    });
  });
});
