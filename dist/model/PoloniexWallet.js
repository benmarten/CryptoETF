'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PromiseUtils = require('../PromiseUtils');

var _PromiseUtils2 = _interopRequireDefault(_PromiseUtils);

var _Coin = require('./Coin');

var _Coin2 = _interopRequireDefault(_Coin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var settings = require('../../settings.json');
var Poloniex = require('poloniex-api-node');

var wallet = {};

var PoloniexWallet = function () {
  function PoloniexWallet() {
    _classCallCheck(this, PoloniexWallet);
  }

  _createClass(PoloniexWallet, null, [{
    key: 'getBalance',
    value: function getBalance() {
      return _PromiseUtils2.default.forEachPromise(settings.accounts.poloniex, this._getBalanceForCredential);
    }

    /**
     *
     * @param credential.apiKey The api key.
     * @param credential.apiSecret The api secret.
     * @prop coin.available Available amount
     * @return {Promise}
     * @private
     */

  }, {
    key: '_getBalanceForCredential',
    value: function _getBalanceForCredential(credential) {
      return new Promise(function (resolve, reject) {
        var poloniex = new Poloniex(credential.apiKey, credential.apiSecret);
        poloniex.returnCompleteBalances('all', function (err, positions) {
          if (err) {
            return reject(err);
          }
          for (var symbol in positions) {
            // noinspection JSUnfilteredForInLoop
            var coin = positions[symbol];
            if (positions.hasOwnProperty(symbol) && coin.available !== '0.00000000' && parseFloat(coin.btcValue) > 0.0001) {
              var _coin = void 0;
              var value = positions[symbol].available;
              if (wallet[symbol]) {
                _coin = wallet[symbol];
                _coin.addAmount(value);
              } else {
                _coin = new _Coin2.default(symbol, value);
              }
              wallet[symbol] = _coin;
            }
          }
          resolve(wallet);
        });
      });
    }
  }]);

  return PoloniexWallet;
}();

exports.default = PoloniexWallet;