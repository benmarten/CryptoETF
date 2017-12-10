import PromiseUtils from '../PromiseUtils'
import Coin from './Coin'

const settings = require('../../settings.json')
const Poloniex = require('poloniex-api-node')

let wallet = {}

export default class PoloniexWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(settings.accounts.poloniex, this._getBalanceForCredential)
  }

  /**
   *
   * @param credential.apiKey The api key.
   * @param credential.apiSecret The api secret.
   * @prop coin.available Available amount
   * @return {Promise}
   * @private
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
      let poloniex = new Poloniex(credential.apiKey, credential.apiSecret)
      poloniex.returnCompleteBalances('all', (err, positions) => {
        if (err) {
          return reject(err)
        }
        for (let symbol in positions) {
          // noinspection JSUnfilteredForInLoop
          let coin = positions[symbol]
          if (positions.hasOwnProperty(symbol) && coin.available !== '0.00000000' &&
              parseFloat(coin.btcValue) > 0.0001) {
            let coin
            let value = positions[symbol].available
            if (wallet[symbol]) {
              coin = wallet[symbol]
              coin.addAmount(value)
            } else {
              coin = new Coin(symbol, value)
            }
            wallet[symbol] = coin
          }
        }
        resolve(wallet)
      })
    })
  }
}
