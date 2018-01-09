import Portfolio from './model/Portfolio'
import Coinmarket from './model/Coinmarket'
import Coin from './model/Coin'
import Utils from './Utils'
import fs from 'fs'
import * as Settings from './Settings'
import Terminal from './model/Terminal'

async function refreshPortfolio() {
  return new Promise(async (resolve) => {
        try {
          Portfolio.clear()
          await Coinmarket.init()
          let promises = []

          for (let account in Settings.accounts) {
            let name = Utils.capitalize(account)
            let Wallet;
            try {
              Wallet = require(`./model/integrations/${name}Wallet`).default;
            } catch (ignored) {
              console.log(`Warning: Integration for Exchange: ${name} not found!`)
              continue
            }

            for (let index in Settings.accounts[account]) {
              let credentials = Settings.accounts[account][index]
              let integration = new Wallet(credentials)
              console.log(`Retrieving ${name} balance...`)
              try {
                promises.push(integration.getBalance().then(coins => Portfolio.addCoins(coins)))
              } catch (e) {
                console.log(`Error: An error occured while running integration: ${name}, ${e}`)
              }
            }
          }

          await Promise.all(promises)

          for (let index in Settings.otherHoldings) {
            if (Settings.otherHoldings.hasOwnProperty(index)) {
              let otherHolding = Settings.otherHoldings[index]
              Portfolio.addCoin(new Coin(Object.keys(otherHolding)[0], Object.values(otherHolding)[0]))
            }
          }

          if (!Settings.options.hideMissingCoins) {
            await Portfolio.addMissingCoins()
          }
          Portfolio.trim()

          Portfolio.removeCoin('USDT')

          if (Settings.outputFile) {
            fs.writeFile(Settings.outputFile, Portfolio.getPortfolioJson(), 'utf8', function(err) {
              if (err) throw err
              console.log(`Saved data to ${Settings.outputFile}...`)
            })
          }

          let portfolio = Portfolio.getPortfolio()
          Terminal.printOutput(portfolio)
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
