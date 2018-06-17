import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import commands from '../../commands/';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('Google', () => {

    const expectedHelp = 'Googling stuff in IRC has never been easier \r\nSyntax is !g { query for google }';

    it('should return expected help result when passed help', () => {

    });
  });
});
