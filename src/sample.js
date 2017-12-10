import Portfolio from './model/Portfolio'
import Coinmarket from './model/Coinmarket'
import Coin from './model/Coin'

async function refreshPortfolio() {
  return new Promise(async (resolve) => {
    try {
      await Coinmarket.init()

      Portfolio.addCoin(new Coin('BTC', 3))
      Portfolio.addCoin(new Coin('BCH', 3))
      Portfolio.addCoin(new Coin('ETH', 30))
      Portfolio.addCoin(new Coin('LTC', 10))
      Portfolio.addCoin(new Coin('XEM', 1000))
      Portfolio.addCoin(new Coin('DASH', 1))

      await Portfolio.addMissingCoins()
      console.log(Portfolio.getOutput())
    } catch (error) {
      console.log(error)
      console.log('Error getting data, retrying...')
      return setTimeout(refreshPortfolio, 5000)
    }
    return resolve()
  })
}

refreshPortfolio().then()
