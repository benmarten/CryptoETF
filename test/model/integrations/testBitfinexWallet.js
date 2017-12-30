import BitfinexWallet from '../../../src/model/integrations/BitfinexWallet'
import assert from 'assert'

const settings = require('../../../settings.json')

describe('Testing Bitfinex integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.bitfinex) {
      return
    }
    let wallet = await BitfinexWallet.getBalance()
    assert(wallet.length > 0)
  })
})