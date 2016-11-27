module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Check to see how lucky you are with the RNG');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'luck ');
        return 'help';
    }
  }
  const li = [
    'Reply hazy, try again',
    'Excellent Luck',
    'Bad Luck',
    'Average Luck',
    'Good Luck',
    'Godly Luck',
    'Very Bad Luck',
    'Outlook Good',
    'Better not tell you now',
    'You will meet a dark handsome stranger',
    'ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━ !!!!',
    '（　´_ゝ`）ﾌｰﾝ',
    'Good news will come to you by mail',
  ];
  callback.say(target, li[Math.floor(Math.random() * li.length)]);
};
