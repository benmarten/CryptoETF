import PoloniexWallet from '../../../src/model/integrations/PoloniexWallet'
import assert from 'assert'

describe('Testing Poloniex integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await PoloniexWallet.getBalance()
    assert(wallet.length > 0)
  })
})