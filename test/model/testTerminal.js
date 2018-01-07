import Coin from '../../src/model/Coin'
import Portfolio from '../../src/model/Portfolio'
import Coinmarket from '../../src/model/Coinmarket'
import Terminal from '../../src/model/Terminal'
import assert from 'assert'

describe('Testing Portfolio', () => {
  it('Test output', async () => {
    await Coinmarket.init()
    await Portfolio.addCoin(new Coin('BTC', 1.37))
    await Portfolio.addCoin(new Coin('ETH', 10))
    Portfolio.addMissingCoins(5).then()
    console.log = function(output) {
      assert(output.length > 0)
    }
    Terminal.printOutput(Portfolio.getPortfolio())
  })
})