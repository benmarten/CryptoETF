import Portfolio from './model/Portfolio'
import Coinmarket from './model/Coinmarket'
import Coin from './model/Coin'

async function refreshPortfolio() {
  return new Promise(async (resolve) => {
    try {
      await Coinmarket.init()

      Portfolio.addCoin(new Coin('BTC', 3, 'Coinbase'))
      Portfolio.addCoin(new Coin('ETH', 20, 'Coinbase'))
      Portfolio.addCoin(new Coin('BCH', 3, 'Poloniex'))
      Portfolio.addCoin(new Coin('MIOTA', 100, 'Coinbase'))
      Portfolio.addCoin(new Coin('XRP', 1000, 'Poloniex'))
      Portfolio.addCoin(new Coin('LTC', 10, 'Coinbase'))
      Portfolio.addCoin(new Coin('ADA', 200, 'Bittrex'))
      Portfolio.addCoin(new Coin('DASH', 2, 'Poloniex'))
      Portfolio.addCoin(new Coin('XMR', 10, 'Poloniex'))
      Portfolio.addCoin(new Coin('XEM', 10, 'Poloniex'))

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
