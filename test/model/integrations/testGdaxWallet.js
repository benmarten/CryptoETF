import GdaxWallet from '../../../src/model/integrations/GdaxWallet'
import assert from 'assert'

const settings = require('../../../settings.json')

describe('Testing Gdax integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.gdax) {
      return
    }
    let wallet = await GdaxWallet.getBalance()
    assert(wallet.length > 0)
  })
})