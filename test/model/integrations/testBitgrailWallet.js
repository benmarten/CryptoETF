import assert from 'assert'
import BitgrailWallet from "../../../src/model/integrations/BitgrailWallet";

const settings = require('../../../settings.json')

describe('Testing Bitgrail integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.bitgrail) {
      return
    }
    let wallet = await BitgrailWallet.getBalance()
    assert(wallet.length > 0)
  })
})