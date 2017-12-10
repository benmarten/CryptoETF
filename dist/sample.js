'use strict';

var _Portfolio = require('./model/Portfolio');

var _Portfolio2 = _interopRequireDefault(_Portfolio);

var _Coinmarket = require('./model/Coinmarket');

var _Coinmarket2 = _interopRequireDefault(_Coinmarket);

var _Coin = require('./model/Coin');

var _Coin2 = _interopRequireDefault(_Coin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function refreshPortfolio() {
  return new Promise(async function (resolve) {
    try {
      await _Coinmarket2.default.init();

      _Portfolio2.default.addCoin(new _Coin2.default('BTC', 3));
      _Portfolio2.default.addCoin(new _Coin2.default('ETH', 20));
      _Portfolio2.default.addCoin(new _Coin2.default('BCH', 3));
      _Portfolio2.default.addCoin(new _Coin2.default('MIOTA', 100));
      _Portfolio2.default.addCoin(new _Coin2.default('XRP', 1000));
      _Portfolio2.default.addCoin(new _Coin2.default('LTC', 10));
      _Portfolio2.default.addCoin(new _Coin2.default('DASH', 2));
      _Portfolio2.default.addCoin(new _Coin2.default('XMR', 10));
      _Portfolio2.default.addCoin(new _Coin2.default('BTG', 3));
      _Portfolio2.default.addCoin(new _Coin2.default('XEM', 10));

      await _Portfolio2.default.addMissingCoins();
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