import BittrexWallet from '../../../src/model/integrations/BittrexWallet'
import assert from 'assert'

describe('Testing Bittrex integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await BittrexWallet.getBalance()
    assert(wallet.length > 0)
  })
})