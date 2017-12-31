import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
import request from 'request-promise'
import crypto from 'crypto'
import querystring from 'querystring'
import * as Settings from './../../Settings'

export default class BitgrailWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(Settings.accounts.bitgrail, this._getBalanceForCredential)
  }

  /**
   * Returns the balances for a Bitgrail account.
   * @param credential The Bitgrail api credentials.
   * @return {Promise} The account balances.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          let params = {
            'nonce': new Date().getTime()
          }
          let options = {
            method: 'POST',
            uri: 'https://bitgrail.com/api/v1/balances',
            form: params,
            json: true,
            headers: {
              'KEY': credential.apiKey,
              'SIGNATURE': BitgrailWallet._signParameters(credential, params)
            }
          }
          return request(options)
              .then(data => {
                let result = []
                let balances = data.response
                for (let symbol in balances) {
                  let amount = balances[symbol].balance
                  result.push(new Coin(symbol, amount, 'Bitgrail'))
                }
                resolve(result)

              })
              .catch(err => {
                reject(err)
              })
        }
    )
  }

  static _signParameters(credential, body) {
    body = querystring.stringify(body)
    let hmac = crypto.createHmac('sha512', credential.apiSecret)
    return hmac.update(body).digest('hex')
  }
}