
export default class AbstractWallet {

  /**
   * @param credentials The bittrex api credentials.
   */
  constructor(credentials) {
    this.credentials = credentials
  }

  /**
   * Returns the balances for this account
   *
   * @return {Promise} The account balances.
   */
  getBalance() {
    return this.constructor._getBalanceForCredential(this.credentials)
  }

  /**
   * @return {Promise} The account balances.
   */
  static _getBalanceForCredential(credentials) {
    throw new Error('Method _getBalanceForCredential() is not implemented!')
  }
}
