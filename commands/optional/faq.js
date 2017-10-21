module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, '8ball command is just for asking the magic RNG a question');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         '8ball { question you want to ask }');
        return 'help';
    }
  }

  callback.say(target, "faq")]);
};
