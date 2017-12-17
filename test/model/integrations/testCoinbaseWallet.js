import CoinbaseWallet from '../../../src/model/integrations/CoinbaseWallet'
import assert from 'assert'

describe('Testing Coinbase integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await CoinbaseWallet.getBalance()
    assert(wallet.length > 0)
  })
})