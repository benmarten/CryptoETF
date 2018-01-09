import GdaxWallet from '../../../src/model/integrations/GdaxWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Gdax integration', () => {
  before(function() {
    if (!Settings.accounts.gdax) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new GdaxWallet(Settings.accounts.gdax[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})