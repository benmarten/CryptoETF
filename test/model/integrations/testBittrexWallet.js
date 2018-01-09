import BittrexWallet from '../../../src/model/integrations/BittrexWallet'
import assert from 'assert'

import * as Settings from './../../../src/Settings'

describe('Testing Bittrex integration', () => {
  before(function() {
    if (!Settings.accounts.bittrex) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new BittrexWallet(Settings.accounts.bittrex[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})