'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./../Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Coinmarket = require('./Coinmarket');

var _Coinmarket2 = _interopRequireDefault(_Coinmarket);

var _settings = require('./../../settings.json');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var portfolio = {};
var highestRank = 0;

var Portfolio = function () {
  function Portfolio() {
    _classCallCheck(this, Portfolio);
  }

  _createClass(Portfolio, null, [{
    key: 'clear',
    value: function clear() {
      portfolio = {};
    }
  }, {
    key: 'getCoin',
    value: function getCoin(symbol) {
      return portfolio[symbol];
    }
  }, {
    key: 'addCoin',
    value: function addCoin(coin) {
      if (portfolio[coin.getSymbol()]) {
        portfolio[coin.getSymbol()].addAmount(coin.getAmount());
      } else {
        portfolio[coin.getSymbol()] = coin;
        highestRank = coin.getRank() > highestRank ? coin.getRank() : highestRank;
      }
    }
  }, {
    key: 'addCoins',
    value: async function addCoins(coins) {
      var _this = this;

      return new Promise(async function (resolve) {
        for (var index in coins) {
          // noinspection JSUnfilteredForInLoop
          var coin = coins[index];
          if (coin) {
            _this.addCoin(coin);
          }
        }
        resolve();
      });
    }
  }, {
    key: 'getSumBtc',
    value: function getSumBtc() {
      var sumBtc = 0;
      for (var symbol in portfolio) {
        var coin = portfolio[symbol];
        sumBtc += coin.getBtcValue();
      }
      return sumBtc;
    }
  }, {
    key: 'getSumUsd',
    value: function getSumUsd() {
      var sumUsd = 0;
      for (var symbol in portfolio) {
        var coin = portfolio[symbol];
        sumUsd += coin.getUsdValue();
      }
      return sumUsd;
    }
  }, {
    key: 'addMissingCoins',
    value: async function addMissingCoins() {
      var topXCoins = _Coinmarket2.default.getCoins(highestRank);
      await Portfolio.addCoins(topXCoins);
    }
  }, {
    key: 'getOutput',
    value: function getOutput() {
      var NEW_LINE = '\n';
      var result = '--------------------------------------------------------' + NEW_LINE;
      var sortedKeys = _Utils2.default.getSortedKeys(portfolio, 'rank');
      for (var index in sortedKeys) {
        if (!sortedKeys.hasOwnProperty(index)) {
          continue;
        }
        var symbol = sortedKeys[index];
        var coin = portfolio[symbol];
        var rank = _Utils2.default.pad(3, coin.getRank(), ' ');
        var btcValue = _Utils2.default.pad(5, coin.getBtcValue().toFixed(2), ' ');
        var usdValue = _Utils2.default.pad(6, coin.getUsdValue().toFixed(0), ' ');
        var relMC = _Utils2.default.pad(5, (coin.getRelativeMarketCap() * 100).toFixed(1), ' ');
        var relMCRecommended = _Utils2.default.pad(4, (coin.getRelativeMarketCapRecommended() * 100).toFixed(1), ' ');
        var deltaAbs = _Utils2.default.round((coin.getRelativeMarketCap() - coin.getRelativeMarketCapRecommended()) * 100, 1);
        var relMCDelta = Math.abs(deltaAbs) > _settings2.default.options.rebalanceDeltaPct ? '[' + (deltaAbs > 0 ? '+' : '') + deltaAbs + '%]' : '';
        result += rank + '. ' + _Utils2.default.pad(5, symbol, ' ') + ': ' + btcValue + ' BTC | ' + usdValue + ' USD | ' + relMC + '% (' + relMCRecommended + '%)' + relMCDelta + NEW_LINE;
      }
      result += '--------------------------------------------------------' + NEW_LINE;
      result += 'TOTAL: ' + this.getSumBtc().toFixed(2) + ' BTC | ' + this.getSumUsd().toFixed(0) + ' USD';
      return result;
    }
  }]);

  return Portfolio;
}();

exports.default = Portfolio;