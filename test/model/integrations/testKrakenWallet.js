import KrakenWallet from '../../../src/model/integrations/KrakenWallet'
import assert from 'assert'

const settings = require('../../../settings.json')

describe('Testing Kraken integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.kraken) {
      return
    }
    let wallet = await KrakenWallet.getBalance()
    assert(wallet.length > 0)
  })
})