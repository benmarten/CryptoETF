import Utils from './../Utils'
import Coinmarket from './Coinmarket'
// noinspection NpmUsedModulesInstalled
import * as Settings from './../Settings'

let portfolio = {}
let highestRank = 0

export default class Portfolio {
  static clear() {
    portfolio = {}
  }

  static getCoin(symbol) {
    return portfolio[symbol]
  }

  static addCoin(coin) {
    if (portfolio[coin.getSymbol()]) {
      let existingCoin = portfolio[coin.getSymbol()]
      existingCoin.addAmount(coin.getAmount())
      existingCoin.addExchange(coin.getExchanges(), coin.getAmount())
    } else {
      portfolio[coin.getSymbol()] = coin
      this.updateHighestRankWithBalance(coin)
    }
  }

  /**
   * Records the highest rank, that a coin with > 0 value is at.
   * @param coin The coin
   */
  static updateHighestRankWithBalance(coin) {
    if (coin.getBtcValue() && coin.getRank() >= 0) {
      highestRank = (coin.getRank() > highestRank) ? coin.getRank() : highestRank
    }
  }

  static removeCoin(symbol) {
    delete portfolio[symbol]
  }

  static async addCoins(coins) {
    return new Promise(async (resolve) => {
      for (let index in coins) {
        // noinspection JSUnfilteredForInLoop
        let coin = coins[index]
        if (coin) {
          this.addCoin(coin)
        }
      }
      resolve()
    })
  }

  static getSumBtc() {
    let sumBtc = 0
    for (let symbol in portfolio) {
      let coin = portfolio[symbol]
      sumBtc += coin.getBtcValue()
    }
    return sumBtc
  }

  static getSumUsd() {
    let sumUsd = 0
    for (let symbol in portfolio) {
      let coin = portfolio[symbol]
      sumUsd += coin.getUsdValue()
    }
    return sumUsd
  }

  static async addMissingCoins(limitByRank) {
    let topX = limitByRank ? limitByRank : highestRank
    let topXCoins = Coinmarket.getCoins(topX)
    await Portfolio.addCoins(topXCoins)
  }

  static getStretchFactor() {
    let totalPortfolioPct = 0
    for (let index in portfolio) {
      if (!portfolio.hasOwnProperty(index)) {
        continue
      }
      let coin = portfolio[index]
      totalPortfolioPct += coin.getRelativeMarketCapRecommended()
    }
    return totalPortfolioPct
  }

  static trim() {
    let sortedKeys = Utils.getSortedKeys(portfolio, 'rank')
    for (let index in sortedKeys) {
      if (!sortedKeys.hasOwnProperty(index)) {
        continue
      }
      let coin = portfolio[sortedKeys[index]]
      if (coin.getRank() > highestRank) {
        delete portfolio[coin.getSymbol()]
      }
    }
  }

  /**
   * Returns the target value of the portfolio in USD.
   * @return {*} The target value in USD.
   */
  static getTargetValueUsd() {
    if (!Settings.options.targetValueUsd) {
      return Portfolio.getSumUsd()
    } else {
      return Settings.options.targetValueUsd
    }
  }

  /**
   * Returns the current portfolio.
   * @return {{Object}} The portfolio.
   */
  static getPortfolio() {
    return portfolio
  }

  /**
   * Returns the portfolio as json string.
   * @return {string} The portfolio as json string.
   */
  static getPortfolioJson() {
    return JSON.stringify(portfolio, null, 2)
  }
}
