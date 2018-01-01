import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
import Bittrex from 'node-bittrex-api'
import * as Settings from './../../Settings'

export default class BittrexWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(Settings.accounts.bittrex, this._getBalanceForCredential)
  }

  /**
   * Returns the balances for a bittrex account.
   * @param credential The bittrex api credentials.
   * @return {Promise} The account balances.
   * @prop account The accounts for given credentials.
   * @prop account.balance The balance of the account.
   * @prop data.Currency The currency.
   * @prop data.Balance The balance.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          Bittrex.options(credential)
          Bittrex.getbalances(function(data, err) {
            if (err) {
              return reject(err)
            }
            let result = []
            let balances = data.result
            for (let index in balances) {
              let data = balances[index]
              let symbol = data.Currency
              let amount = data.Balance

              result.push(new Coin(symbol, amount, 'Bittrex'))
            }
            resolve(result)
          })
        }
    )
  }
}