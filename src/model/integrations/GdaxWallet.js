import AbstractWallet from "./AbstractWallet"
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
const Gdax = require('gdax').AuthenticatedClient

export default class GdaxWallet extends AbstractWallet {

  /**
   * Returns the balances for a GDAX account.
   * @param credential The GDAX API credentials.
   * @return {Promise} The account balances.
   * @prop account The accounts for given credentials.
   * @prop account.balance The balance of the account.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
      let gdaxAccount = new Gdax(credential.apiKey, credential.apiSecret, credential.password)
      gdaxAccount.getAccounts(function(error, response, accounts) {
        if (error) {
          return reject(error)
        }
        let result = []
        accounts.forEach(account => {
          let symbol = account.currency
          result.push(new Coin(symbol, account.balance, 'GDAX'))
        })
        resolve(result)
      })
    })
  }
}