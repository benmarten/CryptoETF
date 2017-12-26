import Portfolio from './model/Portfolio'
import Coinmarket from './model/Coinmarket'
import Coin from './model/Coin'
import Utils from './Utils'

const settings = require('../settings.json')

async function refreshPortfolio() {
  return new Promise(async (resolve) => {
        try {
          await Coinmarket.init()
          let integrations = {}

          for (let account in settings.accounts) {
            let name = Utils.capitalize(account)
            try {
              integrations[name] = require(`./model/integrations/${name}Wallet`)
            } catch (ignored) {
              console.log(`Warning: Integration for Exchange: ${name} not found!`)
              continue
            }
            try {
              if (settings.accounts[account] && settings.accounts[account].length > 0) {
                console.log(`Retrieving ${name} balance...`)
                let coins = await integrations[name].default.getBalance()
                await Portfolio.addCoins(coins)
              }
            } catch (e) {
              console.log(`Error: An error occured while running integration: ${name}, ${e}`)
            }
          }

          for (let index in settings.otherHoldings) {
            if (settings.otherHoldings.hasOwnProperty(index)) {
              let otherHolding = settings.otherHoldings[index]
              Portfolio.addCoin(new Coin(Object.keys(otherHolding)[0], Object.values(otherHolding)[0]))
            }
          }

          if (!settings.options.hideMissingCoins) {
            await Portfolio.addMissingCoins()
          }
          Portfolio.trim()

          Portfolio.removeCoin('USDT')

          console.log(Portfolio.getOutput())
        }
        catch
            (error) {
          console.log(error)
          console.log('Error getting data, retrying...')
          return setTimeout(refreshPortfolio, 5000)
        }
        return resolve()
      }
  )
}

refreshPortfolio().then()
