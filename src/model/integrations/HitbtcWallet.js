import PromiseUtils from '../../PromiseUtils'
import request from 'request'
import Coin from './../Coin'

const settings = require('../../../settings.json')

export default class HitbtcWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(settings.accounts.hitbtc, this._getBalanceForCredential)
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
            let result = []
            let balances = JSON.parse(body)
            for (let index in balances) {
              let data = balances[index]
              let symbol = data.currency
              let amount = data.available

              result.push(new Coin(symbol, amount, 'HitBTC'))

            }
            resolve(result)
          })
        }
    )
  }
}