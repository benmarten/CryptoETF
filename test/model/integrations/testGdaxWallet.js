import GdaxWallet from '../../../src/model/integrations/GdaxWallet'
import assert from 'assert'

describe('Testing Gdax integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await GdaxWallet.getBalance()
    assert(wallet.length > 0)
  })
})