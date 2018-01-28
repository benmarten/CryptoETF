import GateWallet from '../../../src/model/integrations/GateWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Gate integration', () => {
  before(function() {
    if (!Settings.accounts.gate) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new GateWallet(Settings.accounts.gate[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})