import PromiseUtils from '../../PromiseUtils'
import request from 'request'
import Coin from './../Coin'

const settings = require('../../../settings.json')

let wallet = {}

export default class HitbtcWallet {
  static async getBalance() {
    await PromiseUtils.forEachPromise(settings.accounts.hitbtc, this._getBalanceForCredential)
    return wallet
  }

  /**
   * Returns the balances for a HitBTC account.
   * @param credential The HitBTC api credentials.
   * @return {Promise} The account balances.
   * @prop account The accounts for given credentials.
   * @prop account.balance The balance of the account.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          let apiKeyBase64 = new Buffer(`${credential.apiKey}:${credential.apiSecret}`).toString('base64')
          let options = {
            url: 'https://api.hitbtc.com/api/2/account/balance',
            headers: {
              'Host': 'api.hitbtc.com',
              'Authorization': `Basic ${apiKeyBase64}`
            }
          }

          request(options, (error, response, body) => {
            if (error || response.statusCode !== 200) {
              return reject(err)
            }
            let balances = JSON.parse(body)
            for (let index in balances) {
              let data = balances[index]
              let symbol = data.currency
              let amount = data.available

              if (parseFloat(amount) === 0) {
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