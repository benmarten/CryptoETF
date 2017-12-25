import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
import Bitfinex from 'bitfinex'

const settings = require('../../../settings.json')

export default class BitfinexWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(settings.accounts.bitfinex, this._getBalanceForCredential)
  }

  /**
   * Returns the balances for a Bitfinex account.
   * @param credential The Bitfinex api credentials.
   * @return {Promise} The account balances.
   * @prop account The accounts for given credentials.
   * @prop account.balance The balance of the account.
   * @prop data.asset The currency.
   * @prop data.free The amount.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          const {apiKey, apiSecret} = credential
          const bitfinex = new Bitfinex(apiKey, apiSecret)

          bitfinex.wallet_balances((err, balances) => {
            if (err) {
              return reject(err)
            }

            const result = balances.map(({currency, amount}) => new Coin(currency.toUpperCase(), amount, 'Bitfinex'))

            resolve(result)
          })
        }
    )
  }
}