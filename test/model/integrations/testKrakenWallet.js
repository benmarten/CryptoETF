import KrakenWallet from '../../../src/model/integrations/KrakenWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Kraken integration', () => {
  before(function() {
    if (!Settings.accounts.kraken) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new KrakenWallet(Settings.accounts.kraken[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})