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
  const li = [
    '45 seconds full throttle',
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes--definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Signs point to yes',
    'Yes',
    'Your request is not bro enough',
    'Reply hazy, try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    'I am sorry, too high to respond',
    'I think we both know the answer to that',
    'Hah!',
    'Don\'t count on it',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful',
  ];
  callback.say(target, li[Math.floor(Math.random() * li.length)]);
};
