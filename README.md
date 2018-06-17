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
Accepting a config from anywhere using the `--config` flag
```
npm run start --config /home/username/config/config.js
```

### Configuration

Currently katelibby bot is supported for Slack connections.
Simply copy the `./config/config.js.example` and rename it as `./config/config.js`.

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

#### Slack Usage

// TO-DO: fill this in

### Command Reference
---

`!catfacts` - Get a random cat fact in chat

`!coin`     - Getting the current price USD of a given crypto coin.

`!fortune`  - Check your fortune

`!g`        - Queries google and returns the first result.

`!help`     - displays a help message

`!mtastatus`- Gets MTA status of subway

`!w `       - Returns weather from underground weather,  !w only allows 500 calls a day and 10 a minute

`!woot`     - returns the latest woot sale
