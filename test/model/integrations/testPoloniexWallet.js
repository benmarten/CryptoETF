import PoloniexWallet from '../../../src/model/integrations/PoloniexWallet'
import assert from 'assert'

describe('Testing Coinbase integration', () => {
  it('Testing initial connection and balances', async () => {
    let poloniexWallet = await PoloniexWallet.getBalance()
    assert(Object.keys(poloniexWallet).length > 0)
  })
})