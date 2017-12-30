import BittrexWallet from '../../../src/model/integrations/BittrexWallet'
import assert from 'assert'

const settings = require('../../../settings.json')

describe('Testing Bittrex integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.bittrex) {
      return
    }
    let wallet = await BittrexWallet.getBalance()
    assert(wallet.length > 0)
  })
})