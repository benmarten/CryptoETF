'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Coinmarket = require('./Coinmarket');

var _Coinmarket2 = _interopRequireDefault(_Coinmarket);

var _Portfolio = require('./Portfolio');

var _Portfolio2 = _interopRequireDefault(_Portfolio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var settings = require('../../settings.json');

var Coin = function () {
  function Coin(symbol, amount, rank) {
    _classCallCheck(this, Coin);

    this.amount = parseFloat(0);

    if (!symbol || !amount && amount !== 0) {
      throw new Error('Empty constructor data provided for coin.');
    }
    if (settings.symbolMapping[symbol]) {
      symbol = settings.symbolMapping[symbol];
    }

    this.symbol = symbol;
    this.amount = parseFloat(amount);

    if (rank) {
      this.rank = parseInt(rank);
    } else {
      this.rank = _Coinmarket2.default.getRankForX(symbol);
    }
  }

  _createClass(Coin, [{
    key: 'getSymbol',
    value: function getSymbol() {
      return this.symbol;
    }
  }, {
    key: 'getAmount',
    value: function getAmount() {
      return this.amount;
    }
  }, {
    key: 'addAmount',
    value: function addAmount(amount) {
      if (this.amount + amount < 0) {
        throw new Error('Amount cannot be negative.');
      }
      this.amount += parseFloat(amount);
    }
  }, {
    key: 'getBtcValue',
    value: function getBtcValue() {
      return this.amount * _Coinmarket2.default.getBtcForX(this.symbol);
    }
  }, {
    key: 'getUsdValue',
    value: function getUsdValue() {
      return this.amount * _Coinmarket2.default.getUsdForX(this.symbol);
    }
  }, {
    key: 'getRelativeMarketCap',
    value: function getRelativeMarketCap() {
      return this.getUsdValue() / _Portfolio2.default.getSumUsd();
    }
  }, {
    key: 'getRelativeMarketCapRecommended',
    value: function getRelativeMarketCapRecommended() {
      return _Coinmarket2.default.getRelativeMarketCapForX(this.symbol);
    }
  }, {
    key: 'getAllocationDeltaPct',
    value: function getAllocationDeltaPct() {
      return this.getRelativeMarketCap() - this.getRelativeMarketCapRecommended();
    }
  }, {
    key: 'getAllocationDeltaBtc',
    value: function getAllocationDeltaBtc(total) {
      return this.getBtcValue() - Math.abs(this.getRelativeMarketCapRecommended() * total);
    }
  }, {
    key: 'getAllocationDeltaUsd',
    value: function getAllocationDeltaUsd(total) {
      return this.getUsdValue() - Math.abs(this.getRelativeMarketCapRecommended() * total);
    }
  }, {
    key: 'getRank',
    value: function getRank() {
      return this.rank;
    }
  }]);

  return Coin;
}();

exports.default = Coin;