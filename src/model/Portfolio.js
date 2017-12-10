import Utils from './../Utils'
import Coinmarket from './Coinmarket'
import {table} from 'table'
import Format from './../Format'

const settings = require('./../../settings.json')

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
      portfolio[coin.getSymbol()].addAmount(coin.getAmount())
    } else {
      portfolio[coin.getSymbol()] = coin
      highestRank = (coin.getRank() > highestRank) ? coin.getRank() : highestRank
    }
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

  static async addMissingCoins() {
    let topXCoins = Coinmarket.getCoins(highestRank)
    await Portfolio.addCoins(topXCoins)
  }

  static getOutput() {
    let data = [
      ['#', 'SYMBOL', 'AMOUNT', 'VALUE', 'VALUE', 'ALLOCATION', 'ALLOCATION', 'DELTA', 'DELTA', 'DELTA', 'REBALANCE'],
      ['', '', '', '฿', '$', 'actual %', 'target %', '%', '฿', '$', '']
    ]
    let sortedKeys = Utils.getSortedKeys(portfolio, 'rank')
    for (let index in sortedKeys) {
      if (!sortedKeys.hasOwnProperty(index)) {
        continue
      }
      let coin = portfolio[sortedKeys[index]]

      data.push([
        coin.getRank(),
        coin.getSymbol(),
        Utils.round(coin.getAmount(),1),
        Format.bitcoin(coin.getBtcValue()),
        Format.money(coin.getUsdValue(), 0),
        Format.percent(coin.getRelativeMarketCap()),
        Format.percent(coin.getRelativeMarketCapRecommended()),
        Format.addPlusSign(Format.percent(coin.getAllocationDeltaPct())),
        Format.addPlusSign(Format.bitcoin(coin.getAllocationDeltaBtc(this.getSumBtc()))),
        Format.addPlusSign(Format.money(coin.getAllocationDeltaUsd(this.getSumUsd()))),
        coin.getAllocationDeltaPct() * 100 > settings.options.rebalanceDeltaPct ? 'Y' : ''
      ])
    }

    data.push([
      '',
      '',
      '',
      Format.bitcoin(this.getSumBtc()),
      Format.money(this.getSumUsd()),
      '',
      '',
      '',
      '',
      '',
      ''])
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
          alignment: 'center'
        }
      },
      drawHorizontalLine: (index, size) => {
        return index === 0 || index === 2 || index === size - 1 || index === size
      }
    }
    return table(data, config)
  }
}
