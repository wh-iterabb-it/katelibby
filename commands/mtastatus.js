import request from 'request';
import { parseString } from 'xml2js';
import { sanitize } from '../utils/sanitize';
import irc from 'irc';

const url = 'http://web.mta.info/status/serviceStatus.txt';

const line_colors = {
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
  if (typeof line_colors[line] !== 'undefined') {
    return line_colors[line];
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
        if (!Boolean(getLineKey(args))) {
          callback.say(target, 'You must specify a valid line!');
        }
    }
  }

  request(url, (error, response, xml) => {
    if (!error && response.statusCode === 200) {
      parseString(xml, (err, data) => {
        // let services = ['subway', 'bus', 'BT', 'LIRR', 'MetroNorth'];
        // services = services.map((serviceName) => {
          // let currentService = data.service.subway.line.map((row) => {
          //   return {
          //     name: sanitize(row.name),
          //     status: sanitize(row.status),
          //     html: sanitize(row.text),
          //     date: sanitize(row.Date),
          //     time: sanitize(row.Time),
          //   };
          // });
          // return currentService;
        // });
        const subway = sanitize(data.service.subway);
        console.log(subway);
        const line = subway.line.map((currentLine) => {
          // response[serviceName] = clean(data.service[serviceName][0].line);
          if (currentLine.name === getLineKey(args)) {
            return {
              name: sanitize(currentLine.name),
              status: sanitize(currentLine.status),
              html: sanitize(currentLine.text),
              date: sanitize(currentLine.Date),
              time: sanitize(currentLine.Time),
            };
          }
          return null;
        });
        const color = getColorForLine(getLineKey(args));
        let outstr = getLineKey(args) + ': ' + line.status + '\n' + line.text;
        if (color) {
          outstr = irc.colors.wrap(color, getLineKey(args)) + ': ' + line.status + '\n' + line.text;
        }
        callback.say(target, outstr);
      });
    }
  });
};
