import Coin from '../../src/model/Coin'
import assert from 'assert'
import Portfolio from '../../src/model/Portfolio'
import Coinmarket from '../../src/model/Coinmarket'

describe('Testing Portfolio', () => {
  afterEach(() => {
    Portfolio.clear()
  })
  it('add', async () => {
    let coin = new Coin('BTC', 1)
    assert(coin)
    Portfolio.addCoin(coin)
    let coin2 = Portfolio.getCoin('BTC')
    assert(coin === coin2)
    assert(coin2.getAmount() === 1)
  })
  it('add second', async () => {
    Portfolio.addCoin(new Coin('BTC', 1))
    Portfolio.addCoin(new Coin('BTC', 2))
    assert(Portfolio.getCoin('BTC').getAmount() === 3)
  })
  it('add all', async () => {
    let coins = [new Coin('BTC', 1), new Coin('ETH', 1), new Coin('BTC', 0.1)]
    await Portfolio.addCoins(coins)
    assert(Portfolio.getCoin('BTC').getAmount() === 1.1)
    assert(Portfolio.getCoin('ETH').getAmount() === 1.0)
  })
  it('sumBtc', async () => {
    await Coinmarket.init()
    let coins = [new Coin('BTC', 1), new Coin('ETH', 1), new Coin('BTC', 0.1)]
    await Portfolio.addCoins(coins)
    let sum = Portfolio.getSumBtc()
    assert(sum > 1.1)
  })
  it('sumUsd', async () => {
    await Coinmarket.init()
    await Portfolio.addCoin(new Coin('BTC', 1))
    await Portfolio.addCoin(new Coin('BCH', 10))
    let sum = Portfolio.getSumUsd()
    assert(sum > 0)
  })
  it('Test output', async () => {
    await Coinmarket.init()
    await Portfolio.addCoin(new Coin('BTC', 1.37))
    await Portfolio.addCoin(new Coin('ETH', 10))
    Portfolio.addMissingCoins(5)
    let result = Portfolio.getOutput(stretchFactor)
    console.log(result)
    assert(result)
  })
})