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
    let wallet = new BinanceWallet(Settings.accounts.binance[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})