import PromiseUtils from '../PromiseUtils'
import Coin from './Coin'

const Coinbase = require('coinbase').Client
const settings = require('../../settings.json')

let wallet = {}

export default class CoinbaseWallet {
  static async getBalance() {
    await PromiseUtils.forEachPromise(settings.accounts.coinbase, this._getBalanceForCredential)
    return wallet
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
        accounts.forEach(account => {
          if (account.balance.amount !== '0.00000000') {
            let symbol = account.balance.currency

            let coin
            if (wallet[symbol]) {
              coin = wallet[symbol]
              coin.addAmount(account.balance.amount)
            } else {
              coin = new Coin(symbol, account.balance.amount)
            }
            wallet[symbol] = coin
          }
        })
        resolve(wallet)
      })
    })
  }
}