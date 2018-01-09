import PoloniexWallet from '../../../src/model/integrations/PoloniexWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Poloniex integration', () => {
  before(function() {
    if (!Settings.accounts.poloniex) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new PoloniexWallet(Settings.accounts.poloniex[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})