katelibby
=========

[![Greenkeeper badge](https://badges.greenkeeper.io/wh-iterabb-it/katelibby.svg)](https://greenkeeper.io/)
[![Travis Badge](https://travis-ci.org/wh-iterabb-it/katelibby.svg?branch=development)](https://travis-ci.org/wh-iterabb-it/katelibby)
[![Dependency Status](https://img.shields.io/david/wh-iterabb-it/katelibby.svg?style=flat)](https://david-dm.org/wh-iterabb-it/katelibby#info=Dependencies)
[![devDependency Status](https://img.shields.io/david/dev/wh-iterabb-it/katelibby.svg?style=flat)](https://david-dm.org/wh-iterabb-it/katelibby#info=devDependencies)
[![codecov](https://codecov.io/gh/wh-iterabb-it/katelibby/branch/development/graph/badge.svg)](https://codecov.io/gh/wh-iterabb-it/katelibby)


### Description:

katelibby is a node IRC bot.

*Katelibby is still in development, after it has tests created it will have a production mode*

### Installation

```
npm install --no-optional
```

### Example Usage

Basic usage
```
node ./bin/start
```

Accepting a config from anywhere using the `--config` flag
```
node ./bin/start --config /home/username/config/config.js
```

### Configuration

Currently katelibby bot is supported for IRC, Twitch and Slack connections.
Simply copy the `./config/config.js.example` and rename it as `./config/config.js`.


#### Basic IRC Usage

By default the bot is setup to run looking for an irc server at `localhost`,
Simply change the `server` field to reflect which irc server you would like to connect to.
Also Kate can connect to multiple channels at the same time, by default it will connect to `#general` and a test channel called [#dangerroom](https://en.wikipedia.org/wiki/Danger_Room). Simply add more channels to the array separated by a comma.
```    
channels: ['#general, #dangerroom'],
```

### Advanced Configuration

Several of the commands depend on having API keys in the configuration file.
To use the `!giphy` command go to the giphy [api page](https://api.giphy.com/) to get a key.
Put that key in the `config.js`,
```
// Giphy API key
giphy: {
  key: 'keyhere'
},
```

To get current weather by location, go to weather underground's [api page](https://www.wunderground.com/weather/api/) to get started, make an account and get a key.
Put that key in the `config.js`,

```  
// Weather Underground API key
// only allows 500 calls a day and 10 a minute
wunderground: {
  key: 'keyhere',
},
```

#### Twitch Usage

The connection to twitch is controlled in the config, change the boolean field `connect` to `true` for twitch.
```
twitch: {
  connect: true,
```
If you would like to start the bot and use it on twitch, you first need to https://twitchapps.com/tmi/ and get a password.
Place the string you get back in the `password` field. It should look something like `oauth:2h583ilkwizhdhzy4orzm9plskq5z`.
Change the channel field to reflect the username of the channel you would like to connect to.
For example to connect to [Destiny](http://twitch.com/destiny)'s stream channel you config for the channel should look like
```    
channels: ['#destiny'],
```

#### Slack Usage

To connect to slack you need to [activate a gateway](https://get.slack.help/hc/en-us/articles/201727913-Connect-to-Slack-over-IRC-and-XMPP) which requires administrative rights. After you complete enabling the gateway you will receive a password which you will put in the `config.js` file.

```
slack: {
  connect: true,
```





### Command Reference
---

`!8ball`    - Ask a question, get an answer

`catfacts`  - Get a random cat fact in chat

`!fortune`  - Check your fortune

`!g`        - Queries google and returns the first result.

`!giphy`    - returns a gif based on query

`!help`     - displays a help message

`!in`       - Has kate send your message as a reminder to you at a certain time.

`!luck`     - Test your luck, and see how good it is

`!ronswanson`- Get a random Ron Swanson quote

`!mtastatus`- Gets MTA status of subway

`!in`       - remind you of something at a different time

`!uptime`   - Calculates the amount of uptime of Kate

`!w `       - Returns weather from underground weather,  !w only allows 500 calls a day and 10 a minute

`!woot`     - returns the latest woot sale

`!xkcd`     - returns random xkcd comic


## Contributors

[Beau Bouchard](https://github.com/BeauBouchard)

[Eric Norris](https://github.com/ericnorris)

[Eric Turner](https://github.com/codemuch)
