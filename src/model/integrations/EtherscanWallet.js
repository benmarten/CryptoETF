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
        let addresses = credentials.addresses.join(',')
        let options = {
          uri: 'https://api.etherscan.io/api?module=account&action=balancemulti&address=' + encodeURIComponent(addresses),
          json: true
        }
        return request(options)
          .then(data => {
            let result = []
            for (let address of data.result) {
              let amount = address.balance / Math.pow(10,18)
              result.push(new Coin('ETH', amount, 'Etherscan'))
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