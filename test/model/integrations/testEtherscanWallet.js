import assert from 'assert'
import EtherscanWallet from "../../../src/model/integrations/EtherscanWallet";

import * as Settings from './../../../src/Settings'

describe('Testing Etherscan integration', () => {
  before(function() {
    if (!Settings.accounts.etherscan) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new EtherscanWallet(Settings.accounts.etherscan[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})