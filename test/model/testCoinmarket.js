import Coinmarket from '../../src/model/Coinmarket'
import assert from 'assert'

describe('Testing coinmarketcap.com integration', () => {
  it('global market cap is greater than 0.', async () => {
    let result = await Coinmarket._getTotalMarketCapUsd()
    assert(result > 0)
  })

  it('100 largest coin stats are available', async () => {
    let result = await Coinmarket._getCoinStats()
    assert(result.length > 0)
  })

  it('relative market cap is calculated for each coin', async () => {
    let coins = await Coinmarket.init()
    assert(Object.keys(coins).length > 0)
    let sum = 0
    for (let i in coins) {
      let coin = coins[i]
      assert(coin.hasOwnProperty('market_cap_pct'))
      sum += coin.market_cap_pct
    }
    assert(sum <= 1)
    assert(sum >= 0.9)
  })
  it('test TotalMarketCapUsd > 0', async () => {
    let result = await Coinmarket.getTotalMarketCapUsd()
    assert(result > 0)
  })
  it('test BtcUsdX price', async () => {
    let result = await Coinmarket.getBtcUsd()
    assert(result > 0)
  })
  it('test getCoins, and limit', async () => {
    await Coinmarket.init()
    let result = await Coinmarket.getCoins()
    assert(Object.keys(result).length > 0)
    result = await Coinmarket.getCoins(10)
    assert(Object.keys(result).length === 10)
    result = await Coinmarket.getCoins(1)
    assert(Object.keys(result).length === 1)
  })
})