import chai from 'chai';
import sinon from 'sinon';

import commands from '../../commands/';
import config from '../../helpers/config_helper';

const { expect } = chai;

describe('Command', () => {
  describe('Help', () => {
    const commandList = require('../../commands/');

    const commandz = Object.keys(commandList).map((command) => {
      return config.commandChar + command;
    }).join(' ');

    const msg = `Hello, I am ${config.slack[0].realName}, a bot. My commands are: `;
    const expected = `${msg}${commandz}\n\rYou can also type ${config.commandChar}{command} help, to get more info about a specific command`;

    const expectedHelp = `Syntax is ${config.commandChar}{command} help, to get more info about a specific command 🤔`;

    it('should return expected help result when invoked', (done) => {
      try {
        commands.help.main('',config.slack[0]).then((result) => {
          expect(result).to.equal(expected);
          done();
        });
      } catch (error) {}
    });

    it('should return expected help result when passed in "help"', (done) => {
      try {
        commands.help.main('help').then((result) => {
          expect(result).to.equal(expectedHelp);
          done();
        });
      } catch (error) {}
    });
  });
});
