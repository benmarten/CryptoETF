import assert from 'assert'
import HitbtcWallet from '../../../src/model/integrations/HitbtcWallet'

import * as Settings from './../../../src/Settings'

describe('Testing HitBtc integration', () => {
  before(function() {
    if (!Settings.accounts.hitbtc) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new HitbtcWallet(Settings.accounts.hitbtc[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})