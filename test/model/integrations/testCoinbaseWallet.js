import CoinbaseWallet from '../../../src/model/integrations/CoinbaseWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Coinbase integration', () => {
  before(function() {
    if (!Settings.accounts.coinbase) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new CoinbaseWallet(Settings.accounts.coinbase[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})