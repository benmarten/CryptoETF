'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./../Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Coinmarket = require('./Coinmarket');

var _Coinmarket2 = _interopRequireDefault(_Coinmarket);

var _table = require('table');

var _Format = require('./../Format');

var _Format2 = _interopRequireDefault(_Format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var settings = require('./../../settings.json');

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
    key: 'removeCoin',
    value: function removeCoin(symbol) {
      delete portfolio[symbol];
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
    value: async function addMissingCoins(limitByRank) {
      var topX = limitByRank ? limitByRank : highestRank;
      var topXCoins = _Coinmarket2.default.getCoins(topX);
      await Portfolio.addCoins(topXCoins);
    }
  }, {
    key: 'getStretchFactor',
    value: function getStretchFactor() {
      var totalPortfolioPct = 0;
      for (var index in portfolio) {
        if (!portfolio.hasOwnProperty(index)) {
          continue;
        }
        var coin = portfolio[index];
        totalPortfolioPct += coin.getRelativeMarketCapRecommended();
      }
      return totalPortfolioPct;
    }
  }, {
    key: 'getOutput',
    value: function getOutput() {
      var stretchFactor = Portfolio.getStretchFactor();
      var data = [['#', 'SYMBOL', 'AMOUNT', 'VALUE', 'VALUE', 'ALLOCATION', 'ALLOCATION', 'TARGET', 'TARGET', 'BUY/SELL', 'BUY/SELL', 'DRIFT', 'REBALANCE'], ['', '', '', '฿', '$', 'actual %', 'target %', '฿', '$', '฿', '$', '%', '']];
      var sortedKeys = _Utils2.default.getSortedKeys(portfolio, 'rank');
      var targetSum = [];
      settings.options.targetValueBtc = settings.options.targetValueUsd / _Coinmarket2.default.getBtcUsd();
      targetSum['targetBtc'] = 0;
      targetSum['targetUsd'] = 0;
      for (var index in sortedKeys) {
        if (!sortedKeys.hasOwnProperty(index)) {
          continue;
        }
        var coin = portfolio[sortedKeys[index]];
        var targetBtc = coin.getRelativeMarketCapRecommended() / stretchFactor * settings.options.targetValueBtc;
        var targetUsd = coin.getRelativeMarketCapRecommended() / stretchFactor * settings.options.targetValueUsd;
        var drift = Math.abs((coin.getUsdValue() - targetUsd) / settings.options.targetValueUsd);
        data.push([coin.getRank(), coin.getSymbol(), _Utils2.default.round(coin.getAmount(), 2), _Format2.default.bitcoin(coin.getBtcValue()), _Format2.default.money(coin.getUsdValue(), 0), _Format2.default.percent(coin.getRelativeMarketCap()), _Format2.default.percent(coin.getRelativeMarketCapRecommended() / stretchFactor), _Format2.default.bitcoin(targetBtc), _Format2.default.money(targetUsd), targetBtc - coin.getBtcValue(), _Format2.default.money(targetUsd - coin.getUsdValue()), _Format2.default.percent(drift), drift * 100 > settings.options.rebalanceDeltaPct ? 'Y' : '']);
        targetSum['targetBtc'] += targetBtc;
        targetSum['targetUsd'] += targetUsd;
      }

      data.push(['', '', '', _Format2.default.bitcoin(this.getSumBtc()), _Format2.default.money(this.getSumUsd()), '', '', _Format2.default.bitcoin(targetSum['targetBtc']), _Format2.default.money(targetSum['targetUsd']), '', '', '', '']);
      var config = {
        columns: {
          2: {
            alignment: 'right'
          },
          3: {
            alignment: 'right'
          },
          4: {
            alignment: 'right'
          },
          5: {
            alignment: 'right'
          },
          6: {
            alignment: 'right'
          },
          7: {
            alignment: 'right'
          },
          8: {
            alignment: 'right'
          },
          9: {
            alignment: 'right'
          },
          10: {
            alignment: 'right'
          },
          12: {
            alignment: 'right'
          }
        },
        drawHorizontalLine: function drawHorizontalLine(index, size) {
          return index === 0 || index === 2 || index === size - 1 || index === size;
        }
      };
      return (0, _table.table)(data, config);
    }
  }]);

  return Portfolio;
}();

exports.default = Portfolio;