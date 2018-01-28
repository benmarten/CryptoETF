import assert from 'assert'
import BlockchainWallet from "../../../src/model/integrations/BlockchainWallet";

import * as Settings from './../../../src/Settings'

describe('Testing Blockchain integration', () => {
  before(function() {
    if (!Settings.accounts.blockchain) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new BlockchainWallet(Settings.accounts.blockchain[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})