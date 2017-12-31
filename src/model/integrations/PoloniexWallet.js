import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
import Poloniex from 'poloniex-api-node'
import * as Settings from './../../Settings'

export default class PoloniexWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(Settings.accounts.poloniex, this._getBalanceForCredential)
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
        let result = []
        for (let symbol in positions) {
          // noinspection JSUnfilteredForInLoop
          let value = positions[symbol].available
          result.push(new Coin(symbol, value, 'Poloniex'))
        }
        resolve(result)
      })
    })
  }
}
