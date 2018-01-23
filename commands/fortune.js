module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Fortune is for getting a cookie fortune in IRC');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'fortune ');
        return 'help';
    }
  }
  let li = [
    'You will make a fortune with your friend.',
    'Everything will now come your way.',
    'You have at your command the wisdom of the ages.',
    'You have a deep appreciation of the arts and music.',
    'The great joy in life is doing what people say you cannot do.',
    'Invest in Crypto, I see great profits in your future.', // btc=$725 ETH=$7.21 Nov 27, 2016
    'When you squeeze and orange, orange juice comes out - because that is whats inside',
    'Every exit is an entrance to new experiences',
    'Today is the tomorrow we worried about yesterday',
    'There are no limitations to the mind except those we aknowledge.',
    'Old dreams never die they just get filed away.',
    'If you want the rainbow, you have to tolerate the rain.',
    'Humans are born to live and not prepare to live',
    'To courageously shoulder the responsibility of ones mistake is character.',
    'measure twice, cut once',
    'keep cool, never freeze -mayonnaise jar',
    'always underpromise and overdeliver',
    'Never half-ass 2 things. Whole ass 1 thing.',
    'Courtesy is contagious',
    'Sometimes when you get denied at the front door, the back door is unlocked',
    'Constant grinding can turn an iron rod into a needle.',
    'Avoid Senseless contradictions with others.',
    'Too many people volunteer to carry the stool when its time to move the piano',
    'You will always get what you want through your charm and personality.',
    'Luck sometimes visits a fool, but it never sits down with him.',
    'Determination is the wake-up call to the human will.',
    'You are given the chance to take part in an exciting adventure.',
    'A fool is one who values advice spoken from stars and chance.',
    'Birds are entangled by their feet and men by their tongues.',
    'Starting down the right path is pointless, if you are just going to take a wrong turn at the first fork.',
    '404 fortune not found',
    'Great works are performed not by strength, but by perserverance',
    'All men should try to learn before they die what they are running from, and to, and why.',
    'Our deeds determine us, as much as we determine our deeds.',
    'Its amazing how much good you can do if you dont care who gets the credit.',
    'Its better to be alone sometimes.',
    'Let the deeds speak.',
    'Lucky Numbers 4, 8, 15, 16, 23 and 42',
    'Never give up. Always find a reason to keep trying.',
    'Accept your past without regrets. Handle your present with confidence. Face your future without fear.',
    'Don’t be discouraged, because every wrong attempt discarded is another step forward.',
    'Never give up, until you are getting paid to',
    'Dont spend time. Invest it.',
    'Sometimes the path less traveled is more muddy',
    'Your loyalty is a virtue, but not when its wedded with blind stubbornness.',
    'Life is too short for time cards',
    'Every lunch is a chance to reinvent the meal',
    'You are here to create not merely survive',
    'Enthusiasm is as contagious as apathy',
    'Alas, the onion you eat is some one elses water lily',
    'Why ask for advice if you wont take any',
  ];

  const liNSFW = [
    'The possibility of a career change is near.', // nsfw?
    'Consolidate rather than expand your business in the near future.', // nsfw
    'I am sorry, too high to respond', // nsfw
    'Dont blow out other peoples candles, it wont make yours brighter.',
    'in hindsight, \'Oh well\', is better than \'what if.\'', // nsfw
  ];

  if (callback.nsfw) {
    li = li.concat(liNSFW);
  }

  callback.say(target, li[Math.floor(Math.random() * li.length)]);
};
