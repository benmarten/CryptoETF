import Coin from '../../src/model/Coin'
import assert from 'assert'

describe('Testing coin model', () => {
  it('Coin can be created', async () => {
    assert(new Coin('BTC', 1))
    try {
      new Coin('BTC')
    } catch (e) {
      assert(e)
    }
  })
  it('Adding balance to coin', async () => {
    let coin = new Coin('BTC', 1)
    coin.addAmount(1)
    coin.addAmount(-.1)
    assert(coin.getAmount() === 1.9)
    try {
      coin.addAmount(-2)
    } catch (e) {
      assert(e.message === 'Amount cannot be negative.')
    }
  })
})