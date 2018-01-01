import assert from 'assert'
import HitbtcWallet from '../../../src/model/integrations/HitbtcWallet'

import * as Settings from './../../../src/Settings'

describe('Testing HitBtc integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await HitbtcWallet.getBalance()
    assert(wallet.length > 0)
  })
})