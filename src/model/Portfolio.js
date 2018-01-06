import Utils from './../Utils'
import Coinmarket from './Coinmarket'
// noinspection NpmUsedModulesInstalled
import {table} from 'table'
import Format from './../Format'
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
      if (coin.getAmount() > 0) {
        existingCoin.addExchange(coin.getExchanges())
      } else {
        existingCoin.addExchangePossible(coin.getExchanges())
      }
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
    if (coin.getBtcValue() > Settings.options.minValueBtc && coin.getRank() >= 0) {
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
        if (coin && (coin.getBtcValue() > Settings.options.minValueBtc)) {
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
   * Formats the output for the command line.
   * @return {string} A string with the result.
   */
  static getOutput() {
    let stretchFactor = Portfolio.getStretchFactor()
    let data = [
      ['#', 'SYMBOL', 'AMOUNT', 'VALUE', 'VALUE', 'ALLOCATION', 'ALLOCATION', 'TARGET', 'TARGET', 'BUY/SELL', 'BUY/SELL', 'BUY/SELL', 'DRIFT', 'REBALANCE', 'EXCHANGES'],
      ['', '', '', '฿', '$', 'actual %', 'target %', '฿', '$', '฿', 'ETH', '$', '%', '', '']
    ]
    let sortedKeys = Utils.getSortedKeys(portfolio, 'rank')
    let targetSum = []
    let targetValueUsd = this.getTargetValueUsd()
    let targetValueBtc = this.getTargetValueUsd() / Coinmarket.getBtcUsd()
    targetSum['allocationActualPct'] = 0
    targetSum['allocationTargetPct'] = 0
    targetSum['targetBtc'] = 0
    targetSum['targetUsd'] = 0
    for (let index in sortedKeys) {
      if (!sortedKeys.hasOwnProperty(index)) {
        continue
      }
      let coin = portfolio[sortedKeys[index]]
      let allocationActualPct = coin.getRelativeMarketCap()
      let allocationTargetPct = coin.getRelativeMarketCapRecommended() / stretchFactor
      let targetBtc = coin.getRelativeMarketCapRecommended() / stretchFactor * targetValueBtc
      let targetUsd = coin.getRelativeMarketCapRecommended() / stretchFactor * targetValueUsd
      let drift = Math.abs((coin.getUsdValue() - targetUsd) / targetValueUsd)
      data.push([
        coin.getRank(),
        coin.getSymbol(),
        Utils.round(coin.getAmount(), 2),
        Format.bitcoin(coin.getBtcValue()),
        Format.money(coin.getUsdValue(), 0),
        Format.percent(allocationActualPct),
        Format.percent(allocationTargetPct),
        Format.bitcoin(targetBtc),
        Format.money(targetUsd),
        Format.bitcoin(targetBtc - coin.getBtcValue(), 8),
        Format.bitcoin((targetBtc - coin.getBtcValue()) / Coinmarket.getBtcEth(), 8),
        Format.money(targetUsd - coin.getUsdValue()),
        Format.percent(drift),
        Utils.hasDriftedAboveTreshold(drift),
        coin.getExchangesString()
      ])
      targetSum['allocationActualPct'] += allocationActualPct || 0
      targetSum['allocationTargetPct'] += allocationTargetPct || 0
      targetSum['targetBtc'] += targetBtc
      targetSum['targetUsd'] += targetUsd
    }

    let drift = (targetSum['targetBtc'] - this.getSumBtc()) / targetSum['targetBtc']
    data.push([
      '',
      '',
      '',
      Format.bitcoin(this.getSumBtc()),
      Format.money(this.getSumUsd()),
      Format.percent(targetSum['allocationActualPct']),
      Format.percent(targetSum['allocationTargetPct']),
      Format.bitcoin(targetSum['targetBtc']),
      Format.money(targetSum['targetUsd']),
      Format.bitcoin(targetSum['targetBtc'] - this.getSumBtc()),
      '',
      Format.money(targetSum['targetUsd'] - this.getSumUsd()),
      Format.percent(drift),
      Utils.hasDriftedAboveTreshold(drift),
      ''])

    // noinspection JSUnusedGlobalSymbols
    let config = {
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
        11: {
          alignment: 'right'
        },
        12: {
          alignment: 'right'
        },
        13: {
          alignment: 'right'
        }
      },
      drawHorizontalLine: (index, size) => {
        return index === 0 || index === 2 || index === size - 1 || index === size
      }
    }
    return table(data, config)
  }

  static getJson() {
    return JSON.stringify(portfolio, null, 2)
  }
}
