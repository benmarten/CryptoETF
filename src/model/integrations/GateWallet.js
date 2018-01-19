import PromiseUtils from '../../PromiseUtils'
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
import GateIo from 'gate.io'


const settings = require('../../../settings.json')

export default class GateWallet {
  static getBalance() {
    return PromiseUtils.forEachPromise(settings.accounts.gate, this._getBalanceForCredential)
  }

  /**
   * Returns the balances for a Gate.io account.
   * @param credential The Gate.io api credentials.
   * @return {Promise} The account balances.
   */
  static _getBalanceForCredential(credential) {

    return new Promise((resolve, reject) => {

		const gateIoClient = new GateIo(credential.apiKey, credential.apiSecret);
		 
		gateIoClient.getBalances(function(err, response) {
		    if (err) {
		    	return reject(err)
		    }

		    let result = []
		    let balances = JSON.parse(response.body).available;

            for (let index in balances) {
            	let symbol = index
            	let amount = balances[index]

            	result.push(new Coin(symbol, amount, 'GateIo'))
            }
            resolve(result)
		});
    })
  }
}