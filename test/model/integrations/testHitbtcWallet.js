import assert from 'assert'
import HitbtcWallet from '../../../src/model/integrations/HitbtcWallet'

const settings = require('../../../settings.json')

describe('Testing HitBtc integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.hitbtc) {
      return
    }
    let wallet = await HitbtcWallet.getBalance()
    assert(wallet.length > 0)
  })
})