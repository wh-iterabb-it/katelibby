import chrono from 'chrono-node';
import schedule from 'node-schedule';
// import moment from 'moment';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Remind yourself of something at a future date.');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
        'in { time, date, or amount of time to pass } { thing to remind you of }');
        callback.say(target, 'Example: ' + callback.config.commandChar +
        'in 4:20pm tomorrow Blaze it!');
        return 'help';
    }
  }
  const parseResults = chrono.parse(args);
  const parseResult = parseResults && parseResults[0] ? parseResults[0] : null;
  if (parseResult) {
    const when = parseResult.start.assign('timezoneOffset', 'EST');
    const reminder = args.slice(parseResult.index +
      parseResult.text.length + 1).trim();

    const nEvent = schedule.scheduleJob(when, () => {
      callback.say(target, from + ': ' + reminder);
    });
    callback.eventStack += nEvent;
    callback.say(target, 'Alright, I will remind you at ' + when.toString());
  } else {
    callback.say(target, 'Not sure what you expected me to do with that...');
  }
};
