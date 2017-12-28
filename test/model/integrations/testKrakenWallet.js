import KrakenWallet from '../../../src/model/integrations/KrakenWallet'
import assert from 'assert'

describe('Testing Kraken integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await KrakenWallet.getBalance()
    assert(wallet.length > 0)
  })
})