module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Twitch command displays the status of the streamer as well as person website.');
        callback.say(target, 'Syntax is ' + callback.config.commandChar + 'twitch');
        return 'help';
    }
  }
  const status = 'live';
  callback.say(target, 'https://twitch.com/'+ callback.config.twitch.streamer + ' is currently '+ status);
  callback.say(target, 'Also so make sure to check out ');
  for (let site in callback.config.twitch.personal) {
      callback.say(target, callback.config.twitch.personal[site]);
  }
};
