import Coinmarket from './Coinmarket'
import Portfolio from './Portfolio'

const settings = require('../../settings.json')

export default class Coin {
  symbol
  // noinspection JSCheckFunctionSignatures
  amount = parseFloat(0)
  rank
  exchanges = {}
  exchangesPossible = {}

  constructor(symbol, amount, exchange, rank) {
    if (!symbol || (!amount && amount !== 0)) {
      throw new Error('Empty constructor data provided for coin.')
    }
    if (settings.symbolMapping[symbol]) {
      symbol = settings.symbolMapping[symbol]
    }

    this.symbol = symbol
    this.amount = parseFloat(amount)

    if (exchange) {
      if (this.amount > 0) {
        this.addExchange(exchange)
      } else {
        this.addExchangePossible(exchange)
      }
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
    return Coinmarket.getRelativeMarketCapForX(this.symbol)
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
   */
  addExchange(exchange) {
    if (typeof exchange === 'object') {
      for (let idx in exchange) {
        this.exchanges[exchange[idx]] = 1
      }
    }
    this.exchanges[exchange] = 1
  }

  /**
   * Records on which exchange the coin is traded.
   * @param exchange The name of the exchange
   */
  addExchangePossible(exchange) {
    if (typeof exchange === 'object') {
      for (let idx in exchange) {
        this.exchangesPossible[exchange[idx]] = 1
      }
    }
    this.exchangesPossible[exchange] = 1
  }

  getExchanges() {
    return Object.keys(this.exchanges)
  }

  getExchangesString() {
    let result
    if (Object.keys(this.exchanges).length > 0) {
      result = Object.keys(this.exchanges).toString()
    } else {
      result = Object.keys(this.exchangesPossible).toString()
    }
    return (result.charAt(result.length - 1) === ',') ? result.slice(0, -1) : result
  }
}