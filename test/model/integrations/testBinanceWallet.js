import BinanceWallet from '../../../src/model/integrations/BinanceWallet'
import assert from 'assert'

describe('Testing Binance integration', () => {
  it('Testing initial connection and balances', async () => {
    let wallet = await BinanceWallet.getBalance()
    assert(Object.keys(wallet).length > 0)
  })
})