import Coinmarket from './Coinmarket'
import Portfolio from './Portfolio'
import * as Settings from './../Settings'
import _ from 'lodash'

export default class Coin {
  symbol
  // noinspection JSCheckFunctionSignatures
  amount = parseFloat(0)
  rank
  exchanges = {}

  constructor(symbol, amount, exchange, rank) {
    if (!symbol || (!amount && amount !== 0)) {
      throw new Error('Empty constructor data provided for coin.')
    }
    if (Settings.symbolMapping[symbol]) {
      symbol = Settings.symbolMapping[symbol]
    }

    this.symbol = symbol
    this.amount = parseFloat(amount)

    if (exchange) {
      this.addExchange(exchange, amount)
    }

    if (rank) {
      this.rank = parseInt(rank)
    } else {
      this.rank = Coinmarket.getRankForX(symbol)
    }
  }

  getSymbol() {
    return this.symbol
  }

  getAmount() {
    return this.amount
  }

  addAmount(amount) {
    if (this.amount + amount < 0) {
      throw new Error('Amount cannot be negative.')
    }
    this.amount += parseFloat(amount)
  }

  getBtcValue() {
    return this.amount * Coinmarket.getBtcForX(this.symbol)
  }

  getUsdValue() {
    return this.amount * Coinmarket.getUsdForX(this.symbol)
  }

  getRelativeMarketCap() {
    return this.getUsdValue() / Portfolio.getSumUsd()
  }

  getRelativeMarketCapRecommended() {
    if (Settings.hasOwnProperty('allocations')) {
      if (Settings.allocations.hasOwnProperty(this.symbol)) {
        return Settings.allocations[this.symbol]
      } else {
        return 0
      }
    } else {
      return Coinmarket.getRelativeMarketCapForX(this.symbol)
    }
  }

  getAllocationDeltaPct() {
    return this.getRelativeMarketCap() - this.getRelativeMarketCapRecommended()
  }

  getAllocationDeltaBtc(total) {
    return this.getBtcValue() - Math.abs(this.getRelativeMarketCapRecommended() * total)
  }

  getAllocationDeltaUsd(total) {
    return this.getUsdValue() - Math.abs(this.getRelativeMarketCapRecommended() * total)
  }

  getRank() {
    return this.rank
  }

  /**
   * Records on which exchange the coin is traded and we hold it.
   * @param exchange The name of the exchange
   * @param amount The amount held on the exchange
   */
  addExchange(exchange, amount) {
    if (!exchange || exchange.length === 0) {
      return
    }
    if (typeof exchange === 'object') {
      for (let idx in exchange) {
        this.exchanges[exchange[idx]] = amount
      }
    }
    this.exchanges[exchange] = amount
  }

  getExchanges() {
    return Object.keys(this.exchanges)
  }

  getExchangesString() {
    let coin = this
    let result = _.pickBy(this.exchanges, (value) => {
      return (value * Coinmarket.getBtcForX(coin.symbol)) >
          (Settings.options.exchangeMinValueBtc || 0)
    })
    if (Settings.options.compactMode) {
      let resultlong = Object.keys(result).length > 0 ? Object.keys(result) : Object.keys(this.exchanges);
      result = []
      for (var i = 0; i < resultlong.length; i++) {
        result.push(resultlong[i].substr(0,3))
      }
      result = result.toString()
    } else {
      if (Object.keys(result).length > 0) {
        result = Object.keys(result).toString()
      } else {
        result = Object.keys(this.exchanges).toString().blue.italic
      }
    }

    return (result.charAt(result.length - 1) === ',') ? result.slice(0, -1) : result
  }
}
