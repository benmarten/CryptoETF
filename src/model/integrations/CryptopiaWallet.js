import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
import Cryptopia from 'cryptopia'

const settings = require('../../../settings.json')

export default class CryptopiaWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(settings.accounts.cryptopia, this._getBalanceForCredential)
  }

  /**
   * Returns the balances for a Cryptopia account.
   * @param credential The Cryptopia api credentials.
   * @return {Promise} The account balances.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          const cryptopia = new Cryptopia(credential.apiKey, credential.apiSecret, null, 10000)
          cryptopia.getBalance(function(err, response) {
            if (err) {
              return reject(err)
            }
            let result = []
            let balances = response.Data
            for (let index in balances) {
            	let data = balances[index]
            	let symbol = data.Symbol
            	let amount = data.Available
            	result.push(new Coin(symbol, amount, 'Cryptopia'))
            }
            resolve(result)
          })
        }
    )
  }
}