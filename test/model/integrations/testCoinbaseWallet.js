import CoinbaseWallet from '../../../src/model/integrations/CoinbaseWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Coinbase integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await CoinbaseWallet.getBalance()
    assert(wallet.length > 0)
  })
})