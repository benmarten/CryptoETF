import BittrexWallet from '../../../src/model/integrations/BittrexWallet'
import assert from 'assert'

describe('Testing Bittrex integration', () => {
  it('Testing initial connection and balances', async () => {
    let bittrexWallet = await BittrexWallet.getBalance()
    assert(Object.keys(bittrexWallet).length > 0)
  })
})