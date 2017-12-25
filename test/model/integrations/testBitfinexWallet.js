import BitfinexWallet from '../../../src/model/integrations/BitfinexWallet'
import assert from 'assert'

describe('Testing Bitfinex integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await BitfinexWallet.getBalance()
    assert(wallet.length > 0)
  })
})