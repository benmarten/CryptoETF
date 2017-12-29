import assert from 'assert'
import BitgrailWallet from "../../../src/model/integrations/BitgrailWallet";

describe('Testing Bitgrail integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await BitgrailWallet.getBalance()
    assert(wallet.length > 0)
  })
})