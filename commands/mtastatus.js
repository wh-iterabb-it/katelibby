import Mta from 'mta-gtfs';
import irc from 'irc';
import striptags from 'striptags';

import sanitize from '../utils/sanitize';

const lineColors = {
  '123': 'light_red',
  '456': 'dark_green',
  '7': 'magenta',
  'ACE': 'dark_blue',
  'BDFM': 'orange',
  'G': 'light_green',
  'JZ': 'dark_red',
  'NQR': 'yellow',
  'L': 'gray',
  'S': 'gray',
  'SIR': 'dark_blue',
};

function getColorForLine(line) {
  if (typeof lineColors[line] !== 'undefined') {
    return lineColors[line];
  }
  return null;
}

function getLineKey(input) {
  switch (input.toUpperCase()) {
    case '1':
    case '2':
    case '3':
      return '123';
    case '4':
    case '5':
    case '6':
      return '456';
    case '7':
      return '7';
    case 'A':
    case 'C':
    case 'E':
      return 'ACE';
    case 'B':
    case 'D':
    case 'F':
    case 'M':
      return 'BDFM';
    case 'G':
      return 'G';
    case 'J':
    case 'Z':
      return 'JZ';
    case 'L':
      return 'L';
    case 'N':
    case 'Q':
    case 'R':
      return 'NQR';
    case 'S':
      return 'S';
    case 'SIR':
      return 'SIR';
    default:
      return null;
  }
}

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Check the status of your NYC Metro Line!');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'mtastatus { line }');
        return 'help';
      default:
        if (!getLineKey(args)) {
          callback.say(target, 'You must specify a valid line!');
        }
    }
    const mta = new Mta({
      key: 'MY-MTA-API-KEY-HERE', // only needed for mta.schedule() method
      feed_id: 1, // optional, default = 1
    });
    mta.status('subway').then((subway) => {
      const lineName = getLineKey(args);
      const color = getColorForLine(lineName);
      subway.map((currentLine) => {
        if (currentLine.name === lineName) {
          let outStatus = sanitize(currentLine.name) + ': ' +
            sanitize(striptags(currentLine.status));
          let outText = sanitize(striptags(currentLine.text));
          if (color) {
            outStatus = irc.colors.wrap(color, outStatus);
            outText = irc.colors.wrap(color, outText);
          }
          callback.say(target, outStatus);
          if (outText.length > 0) {
            callback.say(target, outText);
          }
        }
        return null;
      });
    });
  } else {
    callback.say(target, 'You must specify a valid line!');
  }
};
