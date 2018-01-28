import AbstractWallet from "./AbstractWallet";
import Coin from '../Coin'
import request from 'request-promise'

export default class BlockchainWallet extends AbstractWallet {
  /**
   * Returns the Bitcoin balance for addresses
   * @param addresses The Bitcoin wallet addressses.
   * @return {Promise} The address balances.
   */
  static _getBalanceForCredential(credentials) {
    return new Promise((resolve, reject) => {
        let addresses = credentials.addresses.join('|')
        let options = {
          uri: 'https://blockchain.info/nl/multiaddr?limit=0&active=' + encodeURIComponent(addresses),
          json: true
        }
        return request(options)
          .then(data => {
            let result = []
            for (let address of data.addresses) {
              let amount = address.final_balance / Math.pow(10,8)
              result.push(new Coin('BTC', amount, 'Blockchain'))
            }
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      }
    )
  }
}