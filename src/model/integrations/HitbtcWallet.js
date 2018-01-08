import AbstractWallet from "./AbstractWallet"
import Coin from './../Coin'
import request from 'requestretry'

export default class HitbtcWallet extends AbstractWallet {

  /**
   * Returns the balances for a HitBTC account.
   * @param credential The HitBTC api credentials.
   * @return {Promise} The account balances.
   * @prop account The accounts for given credentials.
   * @prop account.balance The balance of the account.
   * @prop response.statusCode The status code of the request.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          // noinspection JSCheckFunctionSignatures
          let apiKeyBase64 = new Buffer(`${credential.apiKey}:${credential.apiSecret}`).toString('base64')
          let options = {
            url: 'https://api.hitbtc.com/api/2/account/balance',
            headers: {
              'Host': 'api.hitbtc.com',
              'Authorization': `Basic ${apiKeyBase64}`
            },
            maxAttempts: 10,   // (default) try 5 times
            retryDelay: 5000  // (default) wait for 5s before trying again
          }

          request(options, (error, response, body) => {
            if (error || response.statusCode !== 200) {
              reject(error)
              return
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