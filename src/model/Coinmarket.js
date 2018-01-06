// noinspection NpmUsedModulesInstalled
import request from 'request-promise'
import Coin from './Coin'
import * as Settings from './../Settings'


let coins = {}
let totalMarketCapUsd

export default class Coinmarket {
  /**
   * Returns the total market cap in USD.
   * @return {Promise} The total market cap as float.
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
      uri: 'https://api.coinmarketcap.com/v1/ticker/?limit=0',
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
    console.log('Retrieving Coinmarketcap statistics...')
    return this._getTotalMarketCapUsd().then(_totalMarketCapUsd => {
      totalMarketCapUsd = _totalMarketCapUsd
      return this._getCoinStats().then(coinsRefreshed => {
        for (let i in coinsRefreshed) {
          // noinspection JSUnfilteredForInLoop
          let coin = coinsRefreshed[i]
          if (coin) {
            coin['market_cap_pct'] = coin.market_cap_usd / totalMarketCapUsd
            this.modifySymbolIfNeeded(coin)
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

  static getBtcEth() {
    return coins['ETH'].price_btc
  }

  static getCoins(limit) {
    let result = {}
    for (let key in coins) {
      let coin = coins[key]
      if (!limit || parseInt(coin.rank) <= limit) {
        result[key] = new Coin(coin.symbol, 0, null, coin.rank)
      }
    }
    return result
  }

  /**
   * This modifies the symbol based on the settings. This is needed because there are two coins with BTG symbol.
   * @param coin The raw coin.
   */
  static modifySymbolIfNeeded(coin) {
    if (Settings.symbolNameMapping && Settings.symbolNameMapping[coin.name]) {
      coin.symbol = Settings.symbolNameMapping[coin.name]
    }
  }
}
