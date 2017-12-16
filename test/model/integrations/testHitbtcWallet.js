import assert from 'assert'
import HitbtcWallet from '../../../src/model/integrations/HitbtcWallet'

describe('Testing HitBtc integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await HitbtcWallet.getBalance()
    assert(Object.keys(wallet).length > 0)
  })
})