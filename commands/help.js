module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, from + ', you think you are real fucking smart...');
        callback.say(target, 'LOL hey guys, what if I got the help on the help command');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         '{command} help, to get more info about a specific command 🤔');
        return 'help';
    }
  }
  const msg = 'Hello, I am ' + callback.config.irc.realName + ', a bot. My commands are: ';
  const commands = Object.keys(callback.commands).map(
      (command) => { return callback.config.commandChar + command; }
  ).join(' ');

  callback.say(target, msg + commands);
  callback.say(target, 'You can also type ' + callback.config.commandChar +
  '{command} help, to get more info about a specific command');
};
