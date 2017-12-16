import PoloniexWallet from '../../../src/model/integrations/PoloniexWallet'
import assert from 'assert'

describe('Testing Coinbase integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await PoloniexWallet.getBalance()
    assert(Object.keys(wallet).length > 0)
  })
})