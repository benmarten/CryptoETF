import GdaxWallet from '../../../src/model/integrations/GdaxWallet'
import assert from 'assert'
import * as Settings from './../../../src/Settings'

describe('Testing Gdax integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await GdaxWallet.getBalance()
    assert(wallet.length > 0)
  })
})