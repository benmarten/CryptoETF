import BittrexWallet from '../../../src/model/integrations/BittrexWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Bittrex integration', () => {
  before(function() {
    if (!Settings.accounts.binance) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = await BittrexWallet.getBalance()
    assert(wallet.length > 0)
  })
})