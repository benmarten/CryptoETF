import Utils from './../Utils'
import Coinmarket from './Coinmarket'
import settings from './../../settings.json'

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
    const NEW_LINE = '\n'
    let result = `--------------------------------------------------------${NEW_LINE}`
    let sortedKeys = Utils.getSortedKeys(portfolio, 'rank')
    for (let index in sortedKeys) {
      if (!sortedKeys.hasOwnProperty(index)) {
        continue
      }
      let symbol = sortedKeys[index]
      let coin = portfolio[symbol]
      let rank = Utils.pad(3, coin.getRank(), ' ')
      let btcValue = Utils.pad(5, coin.getBtcValue().toFixed(2), ' ')
      let usdValue = Utils.pad(6, (coin.getUsdValue()).toFixed(0), ' ')
      let relMC = Utils.pad(5, (coin.getRelativeMarketCap() * 100).toFixed(1), ' ')
      let relMCRecommended = Utils.pad(4, (coin.getRelativeMarketCapRecommended() * 100).toFixed(1), ' ')
      let deltaAbs = Utils.round((coin.getRelativeMarketCap() - coin.getRelativeMarketCapRecommended()) * 100, 1)
      let relMCDelta = (Math.abs(deltaAbs) > settings.options.rebalanceDeltaPct) ? `[${(deltaAbs > 0) ? '+' : ''}${deltaAbs}%]` : ''
      result += `${rank}. ${Utils.pad(5, symbol, ' ')}: ${btcValue} BTC | ${usdValue} USD | ${relMC}% (${relMCRecommended}%)${relMCDelta}${NEW_LINE}`
    }
    result += `--------------------------------------------------------${NEW_LINE}`
    result += `TOTAL: ${this.getSumBtc().toFixed(2)} BTC | ${(this.getSumUsd()).toFixed(0)} USD`
    return result
  }
}
