<a name="1.6.1"></a>
## [1.6.1](https://github.com/benmarten/CryptoETF/compare/1.6.0...1.6.1) (2018-01-09)


### Features

* **ui:** colorize output; allow to hide exchanges below certain holding treshold ([94a1ac1](https://github.com/benmarten/CryptoETF/commit/94a1ac1))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/benmarten/CryptoETF/compare/1.5.1...1.6.0) (2018-01-06)


### Bug Fixes

* **coinmarket:** fix logic that returns only topX coins ([860ac07](https://github.com/benmarten/CryptoETF/commit/860ac07))
* **coinmarket:** fixed duplicate symbol handling ([50bd63c](https://github.com/benmarten/CryptoETF/commit/50bd63c))
* **ui:** fix rebalance indicator ([666e305](https://github.com/benmarten/CryptoETF/commit/666e305))


### Features

* **coinmarket:** include all possible coins ([45a72f2](https://github.com/benmarten/CryptoETF/commit/45a72f2))



<a name="1.5.1"></a>
## [1.5.1](https://github.com/benmarten/CryptoETF/compare/1.5.0...1.5.1) (2018-01-01)


### Bug Fixes

* **integration/bitgrail:** reject promise on 401 from bitgrail ([9c2b16b](https://github.com/benmarten/CryptoETF/commit/9c2b16b))


### Features

* add logging for coinmarketcap statistic retrieval ([d34b8c0](https://github.com/benmarten/CryptoETF/commit/d34b8c0))
* **settings:** set targetValueUsd to false to use current portfolio value as target; use rebalanceD ([2edab74](https://github.com/benmarten/CryptoETF/commit/2edab74))


### Performance Improvements

* **integrations:** retrieve balances in parallel, via Promise.all() ([#15](https://github.com/benmarten/CryptoETF/issues/15)) ([0e3d6c0](https://github.com/benmarten/CryptoETF/commit/0e3d6c0))



<a name=""></a>
#  1.5.0


### Bug Fixes

* **integrations:** fix binance module typo ([#12](https://github.com/benmarten/CryptoETF/issues/12)) ([e6e75ca](https://github.com/benmarten/CryptoETF/commit/e6e75ca))


### Features

* **integration:** implement Bitgrail API ([#11](https://github.com/benmarten/CryptoETF/issues/11)) ([e31c2f2](https://github.com/benmarten/CryptoETF/commit/e31c2f2))



<a name=""></a>
#  1.4.0


### Features

* adds option to hide missing coins ([3fd1b9c](https://github.com/benmarten/CryptoETF/commit/3fd1b9c))
* save output to file ([0de2b1f](https://github.com/benmarten/CryptoETF/commit/0de2b1f))
* **integration:** add GDAX integration ([#10](https://github.com/benmarten/CryptoETF/issues/10)) ([e91975a](https://github.com/benmarten/CryptoETF/commit/e91975a))
* **integration:** adds Kraken integration ([#7](https://github.com/benmarten/CryptoETF/issues/7)) ([7e1ba78](https://github.com/benmarten/CryptoETF/commit/7e1ba78))

<a name=""></a>
#  1.3.1


### Features

* Adds Bitfinex support

<a name=""></a>
#  1.3.0


### Bug Fixes

* fix a bug in portfolio rebalance recommendation ([fd70090](https://github.com/benmarten/CryptoETF/commit/fd70090))
* fix delta rebalancing detection for negative numbers ([cd26d62](https://github.com/benmarten/CryptoETF/commit/cd26d62))
* **index:** make wallets from settings.json optional ([f72fcfe](https://github.com/benmarten/CryptoETF/commit/f72fcfe))
* **sample:** add targetValue to settings.json.sample ([e3ad723](https://github.com/benmarten/CryptoETF/commit/e3ad723))


### Features

* add eth diff ([cf11839](https://github.com/benmarten/CryptoETF/commit/cf11839))
* different stats ([3f65102](https://github.com/benmarten/CryptoETF/commit/3f65102))
* exclude usdt ([4e29347](https://github.com/benmarten/CryptoETF/commit/4e29347))
* improve output, improve sample ([f12602c](https://github.com/benmarten/CryptoETF/commit/f12602c))
* **hitbtc:** retry on requestfailure ([2b5a725](https://github.com/benmarten/CryptoETF/commit/2b5a725))
* **integrations:** add binance & hitbtc integrations ([2a66e5a](https://github.com/benmarten/CryptoETF/commit/2a66e5a))
* **integrations:** add bittrex ([503ca53](https://github.com/benmarten/CryptoETF/commit/503ca53))
* **portfolio:** add more sum columns ([eb1174f](https://github.com/benmarten/CryptoETF/commit/eb1174f))



