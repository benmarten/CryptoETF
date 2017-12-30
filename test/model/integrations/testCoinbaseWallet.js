import CoinbaseWallet from '../../../src/model/integrations/CoinbaseWallet'
import assert from 'assert'

const settings = require('../../../settings.json')

describe('Testing Coinbase integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.coinbase) {
      return
    }
    let wallet = await CoinbaseWallet.getBalance()
    assert(wallet.length > 0)
  })
})