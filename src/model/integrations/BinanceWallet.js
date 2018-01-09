import AbstractWallet from "./AbstractWallet"
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
import Binance from 'binance'

export default class BinanceWallet extends AbstractWallet {

  /**
   * Returns the balances for a bittrex account.
   * @param credential The bittrex api credentials.
   * @return {Promise} The account balances.
   * @prop account The accounts for given credentials.
   * @prop account.balance The balance of the account.
   * @prop data.asset The currency.
   * @prop data.free The amount.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          const binance = new Binance.BinanceRest(credential)
          binance.account(function(err, account) {
            if (err) {
              return reject(err)
            }
            let result = []
            let balances = account.balances
            for (let index in balances) {
              let data = balances[index]
              let symbol = data.asset
              let amount = data.free

              result.push(new Coin(symbol, amount, 'Binance'))
            }
            resolve(result)
          })
        }
    )
  }
}
