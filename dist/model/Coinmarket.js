'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _Coin = require('./Coin');

var _Coin2 = _interopRequireDefault(_Coin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var coins = {};
var totalMarketCapUsd = void 0;

var Coinmarket = function () {
  function Coinmarket() {
    _classCallCheck(this, Coinmarket);
  }

  _createClass(Coinmarket, null, [{
    key: '_getTotalMarketCapUsd',

    /**
     * Returns the total market cap in USD.
     * @return {Promise.<float>} The total market cap as float.
     * @prop result.total_market_cap_usd The total market cap in USD.
     */
    value: function _getTotalMarketCapUsd() {
      var options = {
        uri: 'https://api.coinmarketcap.com/v1/global',
        json: true
      };
      return (0, _requestPromise2.default)(options).then(function (result) {
        return result.total_market_cap_usd;
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_getCoinStats',
    value: function _getCoinStats() {
      var options = {
        uri: 'https://api.coinmarketcap.com/v1/ticker/',
        json: true
      };
      return (0, _requestPromise2.default)(options).then(function (coins) {
        return coins;
      }).catch(function (err) {
        console.log(err);
      });
    }

    /**
     * Initializes the coinmarket class with latest statistics.
     * @return {Promise.<Array>} coins Returns the coins.
     * @prop coin.market_cap_usd The market cap for the given coin in USD.
     */

  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      return this._getTotalMarketCapUsd().then(function (_totalMarketCapUsd) {
        totalMarketCapUsd = _totalMarketCapUsd;
        return _this._getCoinStats().then(function (coinsRefreshed) {
          for (var i in coinsRefreshed) {
            // noinspection JSUnfilteredForInLoop
            var coin = coinsRefreshed[i];
            if (coin) {
              coin['market_cap_pct'] = coin.market_cap_usd / totalMarketCapUsd;
              coins[coin.symbol] = coin;
            }
          }
          return coins;
        });
      });
    }

    /**
     * Returns the current price for 1 Coin in BTC.
     * @param symbol
     * @prop coin.price_btc The current price for one coin in BTC.
     */

  }, {
    key: 'getBtcForX',
    value: function getBtcForX(symbol) {
      var coin = coins[symbol];
      try {
        return coin.price_btc;
      } catch (e) {
        // console.log(`Error looking up value for coin ${symbol} with error: ${e}`)
        return 0;
      }
    }

    /**
     * Returns the current price for 1 Coin in USD.
     * @param symbol
     * @prop coin.price_usd The current price for one coin in USD.
     */

  }, {
    key: 'getUsdForX',
    value: function getUsdForX(symbol) {
      var coin = coins[symbol];
      try {
        return coin.price_usd;
      } catch (e) {
        // console.log(`Error looking up value for coin ${symbol} with error: ${e}`)
        return 0;
      }
    }

    /**
     * Returns the current price for 1 Coin in USD.
     * @param symbol
     * @prop coin.price_usd The current price for one coin in USD.
     */

  }, {
    key: 'getRankForX',
    value: function getRankForX(symbol) {
      var coin = coins[symbol];
      try {
        return parseInt(coin.rank);
      } catch (e) {
        // console.log(`Error looking up value for coin ${symbol} with error: ${e}`)
        return 9999;
      }
    }
  }, {
    key: 'getRelativeMarketCapForX',
    value: function getRelativeMarketCapForX(symbol) {
      try {
        return coins[symbol].market_cap_pct;
      } catch (e) {
        // console.log(`Error looking up value for coin ${symbol} with error: ${e}`)
        return 0;
      }
    }
  }, {
    key: 'getTotalMarketCapUsd',
    value: function getTotalMarketCapUsd() {
      return totalMarketCapUsd;
    }
  }, {
    key: 'getBtcUsd',
    value: function getBtcUsd() {
      return coins['BTC'].price_usd;
    }
  }, {
    key: 'getCoins',
    value: function getCoins(limit) {
      var result = {};
      for (var key in coins) {
        result[key] = new _Coin2.default(coins[key].symbol, 0, coins[key].rank);
        if (result[key].rank === limit) {
          break;
        }
      }
      return result;
    }
  }]);

  return Coinmarket;
}();

exports.default = Coinmarket;