import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'

const settings = require('../../../settings.json')
const Bittrex = require('node-bittrex-api')

let wallet = {}

export default class BittrexWallet {
  static async getBalance() {
    await PromiseUtils.forEachPromise(settings.accounts.bittrex, this._getBalanceForCredential)
    return wallet
  }

  /**
   * Returns the balances for a bittrex account.
   * @param credential The bittrex api credentials.
   * @return {Promise} The account balances.
   * @prop account The accounts for given credentials.
   * @prop account.balance The balance of the account.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          Bittrex.options(credential)
          Bittrex.getbalances(function(data, err) {
            if (err) {
              return reject(err)
            }
            let balances = data.result
            for (let index in balances) {
              let data = balances[index]
              if (data.Balance > 0) {
                let symbol = data.Currency
                let amount = data.Balance

                let coin
                if (wallet[symbol]) {
                  coin = wallet[symbol]
                  coin.addAmount(amount)
                } else {
                  coin = new Coin(symbol, amount)
                }
                wallet[symbol] = coin
              }
            }
            resolve(wallet)
          })
        }
    )
  }
}