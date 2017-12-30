import PoloniexWallet from '../../../src/model/integrations/PoloniexWallet'
import assert from 'assert'

const settings = require('../../../settings.json')

describe('Testing Poloniex integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.poloniex) {
      return
    }
    let wallet = await PoloniexWallet.getBalance()
    assert(wallet.length > 0)
  })
})