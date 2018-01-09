import BitfinexWallet from '../../../src/model/integrations/BitfinexWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Bitfinex integration', () => {
  before(function() {
    if (!Settings.accounts.bitfinex) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new BitfinexWallet(Settings.accounts.bitfinex[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})