import assert from 'assert'
import EthplorerWallet from "../../../src/model/integrations/EthplorerWallet";

import * as Settings from './../../../src/Settings'

describe('Testing Ethplorer integration', () => {
  before(function() {
    if (!Settings.accounts.ethplorer) {
      this.skip()
    }
  })
  it('Testing initial connection and balances', async () => {
    let wallet = new EthplorerWallet(Settings.accounts.ethplorer[0])
    let balance = await wallet.getBalance()
    assert(balance.length > 0)
  })
})
