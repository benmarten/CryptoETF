import assert from 'assert'
import BitgrailWallet from '../../../src/model/integrations/BitgrailWallet'

import * as Settings from './../../../src/Settings'

describe('Testing Bitgrail integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await BitgrailWallet.getBalance()
    assert(wallet.length > 0)
  })
})