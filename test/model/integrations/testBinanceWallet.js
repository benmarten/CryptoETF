import BinanceWallet from '../../../src/model/integrations/BinanceWallet'
import assert from 'assert'

const settings = require('../../../settings.json')

describe('Testing Binance integration', () => {
  it('Testing initial connection and balances', async () => {
    if (!settings.accounts.binance) {
      return
    }
    let wallet = await BinanceWallet.getBalance()
    assert(wallet.length > 0)
  })
})