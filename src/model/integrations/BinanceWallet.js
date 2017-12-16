import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'

const settings = require('../../../settings.json')
const Binance = require('binance')

let wallet = {}

export default class BinanceWallet {
  static async getBalance() {
    await PromiseUtils.forEachPromise(settings.accounts.binance, this._getBalanceForCredential)
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
          const binance = new Binance.BinanceRest(credential)
          binance.account(function(err, account) {
            if (err) {
              return reject(err)
            }
            let balances = account.balances
            for (let index in balances) {
              let data = balances[index]
              let symbol = data.asset
              let amount = data.free

              if (amount === '0.00000000') {
                continue
              }

              let coin
              if (wallet[symbol]) {
                coin = wallet[symbol]
                coin.addAmount(amount)
              } else {
                coin = new Coin(symbol, amount)
              }
              wallet[symbol] = coin
            }
            resolve(wallet)
          })
        }
    )
  }
}