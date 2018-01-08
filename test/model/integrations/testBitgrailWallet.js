import assert from 'assert'
import BitgrailWallet from '../../../src/model/integrations/BitgrailWallet'

import * as Settings from './../../../src/Settings'

describe('Testing Bitgrail integration', () => {
  before(function() {
    if (!Settings.accounts.bitgrail) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new BitgrailWallet(Settings.accounts.bitgrail[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})