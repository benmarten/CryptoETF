import PoloniexWallet from '../../../src/model/integrations/PoloniexWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Poloniex integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await PoloniexWallet.getBalance()
    assert(wallet.length > 0)
  })
})