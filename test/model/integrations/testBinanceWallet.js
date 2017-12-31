import BinanceWallet from '../../../src/model/integrations/BinanceWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Binance integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await BinanceWallet.getBalance()
    assert(wallet.length > 0)
  })
})