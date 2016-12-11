import request from 'request';
import parser from 'xml2js';
import entities from 'entities;
import irc from 'irc';

const url = 'http://web.mta.info/status/serviceStatus.txt';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Catfacts returns a random cat fact!');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'catfacts');
        return 'help';
       default:
        callback.say(target, 'You must specify a line!');
    }
  }

  const line_colors = {
    '123':  'light_red',
    '456':  'dark_green',
    '7':    'magenta',
    'ACE':  'dark_blue',
    'BDFM': 'orange',
    'G':    'light_green',
    'JZ':   'dark_red',
    'NQR':  'yellow',
    'L':    'gray',
    'S':    'gray',
    'SIR':  'dark_blue',
  }

    var line_key = getLineKey(args),
        all_status = [];

    // Make sure we asked for a sane line
    if (line_key == null) {
        return "I don't know that line :/";
    }

    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            parser.parseString(body, (err, data) => {
                for (let i in data.service.subway[0].line) {
                    const line = data.service.subway[0].line[i];
                        name = line.name[0],
                        status = line.status[0],
                        text = sanitize(line.text[0]);

                    all_status[name] = {
                        status: status,
                        text: text,
                    };
                }

               let theLine = all_status[line_key];
               let color = getColorForLine(line_key);
               let outstr = line_key + ": " + theLine.status + "\n" + theLine.text;

                if (color) {
                    outstr = irc.colors.wrap(color, line_key) + ": " + theLine.status + "\n" + theLine.text;
                }

                callback.say(target, outstr);
            });
        }
    });
}

function getLineKey(input) {
    input = input.toUpperCase();
    switch (input) {
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

function getColorForLine(line) {
    if (typeof line_colors[line] != 'undefined') {
        return line_colors[line];
    }
    return null;
}

function sanitize(text) {
    text = text.replace(/<\/?(br *\/?)>/gi, '\r\n');
    text = text.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
    text = entities.decodeHTML(text);
    lines = text.split("\r\n");
    for (var l in lines) {
        lines[l] = lines[l].trim();
    }
    lines = lines.filter(function(value) {
        return !(value == '' || value == null)
    });
    text = lines.join("\n");
    return text;
}
