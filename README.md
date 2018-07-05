katelibby
=========

[![Greenkeeper badge](https://badges.greenkeeper.io/wh-iterabb-it/katelibby.svg)](https://greenkeeper.io/)
[![Travis Badge](https://travis-ci.org/wh-iterabb-it/katelibby.svg?branch=development)](https://travis-ci.org/wh-iterabb-it/katelibby)
[![Dependency Status](https://img.shields.io/david/wh-iterabb-it/katelibby.svg?style=flat)](https://david-dm.org/wh-iterabb-it/katelibby#info=Dependencies)
[![devDependency Status](https://img.shields.io/david/dev/wh-iterabb-it/katelibby.svg?style=flat)](https://david-dm.org/wh-iterabb-it/katelibby#info=devDependencies)
[![codecov](https://codecov.io/gh/wh-iterabb-it/katelibby/branch/development/graph/badge.svg)](https://codecov.io/gh/wh-iterabb-it/katelibby)

### Description:

katelibby is a node slack bot.

*Katelibby is still in development, after it has tests created it will have a production mode*

### Installation

```
npm install
```
### Example Usage

Basic usage
```
npm run build
npm run start
```

### Configuration

Currently katelibby bot is supported for Slack connections.
Simply copy the `./config/config.js.example` and rename it as `./config/config.js`.

Accepting a config from anywhere using the `--config` flag
```
npm run start --config /home/username/config/config.js
```

### Advanced Configuration

Several of the commands depend on having API keys in the configuration file.

#### !giphy command


To use the `!giphy` command go to the giphy [api page](https://api.giphy.com/) to get a key.
You can use the Enviorment variable `KL_GIPHY_API_KEY` to pass in this key, or put that key in the `config.js`,
```
// Giphy API key
giphy: {
  key: process.env.KL_GIPHY_API_KEY || 'keyhere'
},
```

#### !weather command

To get current weather by location, go to weather underground's [api page](https://www.wunderground.com/weather/api/) to get started, make an account and get a key.
You can use the enviorment variable `KL_WU_API_KEY` to pass in this key, or put that key in the `config.js`,

```  
// Weather Underground API key
// only allows 500 calls a day and 10 a minute
wunderground: {
  key: process.env.KL_WU_API_KEY || 'keyhere',
},
```

#### !coin command

To get current crypto currency prices, go to the [api page](https://www.worldcoinindex.com/apiservice/) for world coin index, and get an api key.
You can use the enviorment variable `KL_WCI_API_KEY` to pass in this key, or put that key in the `config.js`,

```
  // World Coin Index API Key
  // get your key from
  // https://www.worldcoinindex.com/apiservice/
  worldcoinindex: {
    key: process.env.KL_WCI_API_KEY || 'keyhere',
  }
```

#### Advanced Slack Usage

The slack configuration in your `config.js` is an array, you can add multiple instances of the bot by simply adding more slack objects to the array. Each instance assumes a new connection, and allows you to add the bot to multiple slacks.

```
slack: [
  // gin bot for slack 1
  {
    realName: 'gin',
    token: process.env.SLACK_TOKEN || 'token 1', // REQUIRED
  },
  // tonic bot for slack 2
  {
    realName: 'tonic',
    token: process.env.SLACK_TOKEN || 'token 2', // REQUIRED
  }],
```

#### IRC Usage

*TO-DO*: fill this in

#### Discord Usage

*TO-DO*: fill this in

### Command Reference
---

`!about`    - Tells the uptime and version of the bot

`!catfacts` - Get a random cat fact in chat

`!coin`     - Getting the current price USD of a given crypto coin.

`!fortune`  - Check your fortune

`!g`        - Queries google and returns the first result.

`!help`     - displays a help message

`!trainstatus`- Gets status of MTA subway and LIRR trains

`!w `       - Returns weather from underground weather,  !w only allows 500 calls a day and 10 a minute

`!woot`     - returns the latest woot sale
