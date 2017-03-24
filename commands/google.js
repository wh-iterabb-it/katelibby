import google from 'google';

module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Googling stuff in IRC has never been easier');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'g { query for google }');
        return 'help';
    }
  }
  try {
    google.resultsPerPage = 25;
    google(args.toString(), (err, res) => {
      if (err) {
        callback.logger.error('google failed' + err);
      }
      callback.logger.info('response returned with statuscode: ' +
        res.statusCode);
        console.log(res);
      if (res.links && res.links.length) {
        if (res.links[0].title.match(/Images for/i) != null) {
          callback.say(target, res.links[1].title + ' - ' + res.links[0].href);
          callback.say(target, res.links[1].description);
        } else {
          // link.href is an alias for link.link
          callback.say(target, res.links[0].title + ' - ' + res.links[0].href);
          callback.say(target, res.links[0].description);
        }
      } else {
        callback.say(target, 'There were litterally no results');
      }
    });
  } catch (e) {
    callback.logger.error('google  failed' + e);
    callback.say(target, 'And what do we say to death?'); //  Not today
  }
};
