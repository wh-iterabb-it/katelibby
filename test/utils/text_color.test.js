import chai from 'chai';
import sinonChai from 'sinon-chai';

import color from '../../utils/text_color';

chai.should();

chai.use(sinonChai);

const { expect } = chai;

describe('Text Color Utility Tests', () => {
  describe('colorize method', () => {
    it('should return null if invalid color', () => {
      const expected = null;
      const resp = color.colorize('text', 'tacoColor');
      expect(resp).to.equal(expected);
    });

    it('should return valid color format of string for irc', () => {
      const expected = '\u000305text\u000f';
      const resp = color.colorize('text', 'dark_red');
      expect(resp).to.equal(expected);
    });
  });

  describe('getColors method', () => {
    it('should valid array of colors matching expected', () => {
      const expected = [
        'white',
        'black',
        'gray',
        'light_gray',
        'dark_blue',
        'dark_green',
        'light_red',
        'dark_red',
        'magenta',
        'orange',
        'yellow',
        'light_green',
        'cyan',
        'light_cyan',
        'light_blue',
        'light_magenta',
        'reset',
      ];
      const resp = color.getColors();
      expect(resp).to.eql(expected);
    });
  });

  describe('randColor method', () => {
    it('should return a random but valid color for a string', () => {
      const expected = [
        '\u000300text\u000f', // white
        '\u000301text\u000f', // black
        '\u000302text\u000f', // dark_blue
        '\u000303text\u000f', // dark_green
        '\u000304text\u000f', // light_red
        '\u000305text\u000f', // dark_red
        '\u000306text\u000f', // magenta
        '\u000307text\u000f', // orange
        '\u000308text\u000f', // yellow
        '\u000314text\u000f', // gray
        '\u000315text\u000f', // light_gray
        '\u000309text\u000f', // light_green
        '\u000310text\u000f', // cyan
        '\u000311text\u000f', // light_cyan
        '\u000312text\u000f', // light_blue
        '\u000313text\u000f', // light_magenta
        '\u000ftext\u000f', // reset
      ];

      const expectedSet = new Set(expected);
      const resp = color.randColor('text');
      const check = expectedSet.has(resp);
      expect(check).to.equal(true);
    });
  });
});
