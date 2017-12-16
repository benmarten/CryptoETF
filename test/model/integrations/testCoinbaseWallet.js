import CoinbaseWallet from '../../../src/model/integrations/CoinbaseWallet'
import assert from 'assert'

describe('Testing Coinbase integration', () => {
  it('Testing initial connection and balances', async () => {
    let coinbaseWallet = await CoinbaseWallet.getBalance()
    assert(Object.keys(coinbaseWallet).length > 0)
  })
})