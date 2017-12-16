import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'

const Coinbase = require('coinbase').Client
const settings = require('../../../settings.json')

export default class CoinbaseWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(settings.accounts.coinbase, this._getBalanceForCredential)
  }

  /**
   * Returns the balances for a coinbase account.
   * @param credential The coinbase api credentials.
   * @return {Promise} The account balances.
   * @prop account The accounts for given credentials.
   * @prop account.balance The balance of the account.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
      let coinbaseAccount = new Coinbase(credential)
      coinbaseAccount.getAccounts({}, function(err, accounts) {
        if (err) {
          return reject(err)
        }
        let result = []
        accounts.forEach(account => {
          let symbol = account.balance.currency
          result.push(new Coin(symbol, account.balance.amount, 'Coinbase'))
        })
        resolve(result)
      })
    })
  }
}