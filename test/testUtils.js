import assert from 'assert'
import Utils from './../src/Utils'

describe('Testing utils', () => {
  it('Test float rounding', async () => {
    assert(Utils.round(1.111) === 1)
    assert(Utils.round(1.111, 1) === 1.1)
    assert(Utils.round(1.111, 2) === 1.11)
    assert(Utils.round(1.111, 10) === 1.111)
    assert(Utils.round(1.5666) === 2)
    assert(Utils.round(1.5666, 1) === 1.6)
    assert(Utils.round(1.5666, 2) === 1.57)
    assert(Utils.round(1.5666, 10) === 1.5666)
  })

  it('Test hasDriftedAboveTreshold', () => {
    assert(Utils.hasDriftedAboveTreshold(0.11, 10))
    assert(!Utils.hasDriftedAboveTreshold(0.09, 10))
  })
})
