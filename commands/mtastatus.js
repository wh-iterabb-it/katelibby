import Mta from 'mta-gtfs';
import striptags from 'striptags';

import config from '../helpers/config_helper';
import logger from '../utils/logger';
import Sanitize from '../utils/sanitize';

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

module.exports = async (args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        return Promise.resolve('Check the status of your NYC Metro Line!\r\n' +
        'Syntax is ' + config.commandChar + 'mtastatus { line }');
      default:
        if (!getLineKey(args)) {
          return Promise.resolve('You must specify a valid line!');
        }
    }
    const mta = new Mta({
      key: 'MY-MTA-API-KEY-HERE', // only needed for mta.schedule() method
      feed_id: 1, // optional, default = 1
    });
    let response = '';
    await mta.status('subway').then((subway) => {
      const lineName = getLineKey(args);
      subway.map((currentLine) => {
        if (currentLine.name === lineName) {
          let outStatus = Sanitize.sanitize(currentLine.name) + ': ' +
            Sanitize.sanitize(striptags(currentLine.status));
          let outText = Sanitize.sanitize(striptags(currentLine.text));
          if (outText.length > 0) {
            outStatus = outStatus + outText;
          }
          response = outStatus;
        }
      });
    });
    return Promise.resolve(response);
  } else {
    return Promise.resolve('You must specify a valid line!');
  }
};