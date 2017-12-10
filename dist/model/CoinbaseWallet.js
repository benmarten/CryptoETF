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

var Coinbase = require('coinbase').Client;
var settings = require('../../settings.json');

var wallet = {};

var CoinbaseWallet = function () {
  function CoinbaseWallet() {
    _classCallCheck(this, CoinbaseWallet);
  }

  _createClass(CoinbaseWallet, null, [{
    key: 'getBalance',
    value: async function getBalance() {
      await _PromiseUtils2.default.forEachPromise(settings.accounts.coinbase, this._getBalanceForCredential);
      return wallet;
    }

    /**
     * Returns the balances for a coinbase account.
     * @param credential The coinbase api credentials.
     * @return {Promise} The account balances.
     * @prop account The accounts for given credentials.
     * @prop account.balance The balance of the account.
     */

  }, {
    key: '_getBalanceForCredential',
    value: function _getBalanceForCredential(credential) {
      return new Promise(function (resolve, reject) {
        var coinbaseAccount = new Coinbase(credential);
        coinbaseAccount.getAccounts({}, function (err, accounts) {
          if (err) {
            return reject(err);
          }
          accounts.forEach(function (account) {
            if (account.balance.amount !== '0.00000000') {
              var symbol = account.balance.currency;

              var coin = void 0;
              if (wallet[symbol]) {
                coin = wallet[symbol];
                coin.addAmount(account.balance.amount);
              } else {
                coin = new _Coin2.default(symbol, account.balance.amount);
              }
              wallet[symbol] = coin;
            }
          });
          resolve(wallet);
        });
      });
    }
  }]);

  return CoinbaseWallet;
}();

exports.default = CoinbaseWallet;