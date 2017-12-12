'use strict';

var _CoinbaseWallet = require('./model/CoinbaseWallet');

var _CoinbaseWallet2 = _interopRequireDefault(_CoinbaseWallet);

var _PoloniexWallet = require('./model/PoloniexWallet');

var _PoloniexWallet2 = _interopRequireDefault(_PoloniexWallet);

var _Portfolio = require('./model/Portfolio');

var _Portfolio2 = _interopRequireDefault(_Portfolio);

var _Coinmarket = require('./model/Coinmarket');

var _Coinmarket2 = _interopRequireDefault(_Coinmarket);

var _Coin = require('./model/Coin');

var _Coin2 = _interopRequireDefault(_Coin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = require('../settings.json');

async function refreshPortfolio() {
  return new Promise(async function (resolve) {
    try {
      await _Coinmarket2.default.init();

      var coinbaseCoins = await _CoinbaseWallet2.default.getBalance();
      await _Portfolio2.default.addCoins(coinbaseCoins);

      var poloniexCoins = await _PoloniexWallet2.default.getBalance();
      await _Portfolio2.default.addCoins(poloniexCoins);

      for (var index in settings.otherHoldings) {
        var otherHolding = settings.otherHoldings[index];
        _Portfolio2.default.addCoin(new _Coin2.default(Object.keys(otherHolding)[0], Object.values(otherHolding)[0]));
      }

      await _Portfolio2.default.addMissingCoins();

      _Portfolio2.default.removeCoin('USDT');

      console.log(_Portfolio2.default.getOutput());
    } catch (error) {
      console.log(error);
      console.log('Error getting data, retrying...');
      return setTimeout(refreshPortfolio, 5000);
    }
    return resolve();
  });
}

refreshPortfolio().then();