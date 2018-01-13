import Portfolio from './model/Portfolio'
import Coinmarket from './model/Coinmarket'
import Coin from './model/Coin'
import Terminal from './model/Terminal'

async function refreshPortfolio() {
  return new Promise(async (resolve) => {
    try {
      await Coinmarket.init()

      Portfolio.addCoin(new Coin('BTC', 1.5, 'Coinbase'))
      Portfolio.addCoin(new Coin('ETH', 6.6, 'Coinbase'))
      Portfolio.addCoin(new Coin('XRP', 2600, 'Poloniex'))
      Portfolio.addCoin(new Coin('BCH', 1.14, 'Coinbase'))
      Portfolio.addCoin(new Coin('ADA', 1779, 'Poloniex'))
      Portfolio.addCoin(new Coin('XEM', 760, 'Coinbase'))
      Portfolio.addCoin(new Coin('LTC', 5, 'Bittrex'))
      Portfolio.addCoin(new Coin('XLM', 1471, 'Poloniex'))
      Portfolio.addCoin(new Coin('MIOTA', 235, 'Poloniex'))
      Portfolio.addCoin(new Coin('TRX', 6690, 'Poloniex'))

      await Portfolio.addMissingCoins()

      let portfolio = Portfolio.getPortfolio()
      Terminal.printOutput(portfolio)
    } catch (error) {
      console.log(error)
      console.log('Error getting data, retrying...')
      return setTimeout(refreshPortfolio, 5000)
    }
    return resolve()
  })
}

refreshPortfolio().then()
