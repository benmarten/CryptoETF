import request from 'request-promise'
import Coin from './Coin'

let coins = {}
let totalMarketCapUsd

export default class Coinmarket {
  /**
   * Returns the total market cap in USD.
   * @return {Promise.<float>} The total market cap as float.
   * @prop result.total_market_cap_usd The total market cap in USD.
   */
  static _getTotalMarketCapUsd() {
    let options = {
      uri: 'https://api.coinmarketcap.com/v1/global',
      json: true
    }
    return request(options)
        .then(result => {
          return result.total_market_cap_usd
        })
        .catch(err => {
          console.log(err)
        })
  }

  static _getCoinStats() {
    let options = {
      uri: 'https://api.coinmarketcap.com/v1/ticker/',
      json: true
    }
    return request(options)
        .then(coins => {
          return coins
        })
        .catch(err => {
          console.log(err)
        })
  }

  /**
   * Initializes the coinmarket class with latest statistics.
   * @return {Promise.<Array>} coins Returns the coins.
   * @prop coin.market_cap_usd The market cap for the given coin in USD.
   */
  static init() {
    return this._getTotalMarketCapUsd().then(_totalMarketCapUsd => {
      totalMarketCapUsd = _totalMarketCapUsd
      return this._getCoinStats().then(coinsRefreshed => {
        for (let i in coinsRefreshed) {
          // noinspection JSUnfilteredForInLoop
          let coin = coinsRefreshed[i]
          if (coin) {
            coin['market_cap_pct'] = coin.market_cap_usd / totalMarketCapUsd
            coins[coin.symbol] = coin
          }
        }
        return coins
      })
    })
  }

  /**
   * Returns the current price for 1 Coin in BTC.
   * @param symbol
   * @prop coin.price_btc The current price for one coin in BTC.
   */
  static getBtcForX(symbol) {
    let coin = coins[symbol]
    try {
      return coin.price_btc
    } catch (e) {
      // console.log(`Error looking up value for coin ${symbol} with error: ${e}`)
      return 0
    }
  }

  /**
   * Returns the current price for 1 Coin in USD.
   * @param symbol
   * @prop coin.price_usd The current price for one coin in USD.
   */
  static getUsdForX(symbol) {
    let coin = coins[symbol]
    try {
      return coin.price_usd
    } catch (e) {
      // console.log(`Error looking up value for coin ${symbol} with error: ${e}`)
      return 0
    }
  }

  /**
   * Returns the current price for 1 Coin in USD.
   * @param symbol
   * @prop coin.price_usd The current price for one coin in USD.
   */
  static getRankForX(symbol) {
    let coin = coins[symbol]
    try {
      return parseInt(coin.rank)
    } catch (e) {
      // console.log(`Error looking up value for coin ${symbol} with error: ${e}`)
      return 9999
    }
  }

  static getRelativeMarketCapForX(symbol) {
    try {
      return coins[symbol].market_cap_pct
    } catch (e) {
      // console.log(`Error looking up value for coin ${symbol} with error: ${e}`)
      return 0
    }
  }

  static getTotalMarketCapUsd() {
    return totalMarketCapUsd
  }

  static getBtcUsd() {
    return coins['BTC'].price_usd
  }

  static getCoins(limit) {
    let result = {}
    for (let key in coins) {
      result[key] = new Coin(coins[key].symbol, 0, coins[key].rank)
      if (result[key].rank === limit) {
        break
      }
    }
    return result
  }
}
