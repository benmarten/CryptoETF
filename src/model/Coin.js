import Coinmarket from './Coinmarket'
import Portfolio from './Portfolio'

const settings = require('../../settings.json')

export default class Coin {
  symbol
  amount = parseFloat(0)
  rank

  constructor(symbol, amount, rank) {
    if (!symbol || (!amount && amount !== 0)) {
      throw new Error('Empty constructor data provided for coin.')
    }
    if (settings.symbolMapping[symbol]) {
      symbol = settings.symbolMapping[symbol]
    }

    this.symbol = symbol
    this.amount = parseFloat(amount)

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
}