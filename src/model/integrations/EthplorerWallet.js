import AbstractWallet from "./AbstractWallet";
import Coin from '../Coin'
import request from 'request-promise'

export default class EtherscanWallet extends AbstractWallet {
  /**
   * Returns the Ether balance for addresses
   * @param addresses The Bitcoin wallet addresss.
   * @return {Promise} The address balances.
   */
  static _getBalanceForCredential(credentials) {
    return new Promise((resolve, reject) => {
      let options = {
        uri: 'https://api.ethplorer.io/getAddressInfo/' + credentials.address + '?apiKey=freekey',
        json: true
      }
      return request(options)
        .then(data => {
          let result = []
          let amount = data.ETH.balance
          result.push(new Coin('ETH', amount, 'Ethplorer'))
          for (let token of data.tokens) {
            let token_symbol = token.tokenInfo.symbol
            let token_amount = Number(token.balance / Math.pow(10,token.tokenInfo.decimals))
            if (token_symbol && token_amount) {
              result.push(new Coin(token_symbol, token_amount, 'Ethplorer'))
            }
          }
          resolve(result)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
