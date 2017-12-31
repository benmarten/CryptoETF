import KrakenWallet from '../../../src/model/integrations/KrakenWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Kraken integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await KrakenWallet.getBalance()
    assert(wallet.length > 0)
  })
})