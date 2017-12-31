import BitfinexWallet from '../../../src/model/integrations/BitfinexWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Bitfinex integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await BitfinexWallet.getBalance()
    assert(wallet.length > 0)
  })
})