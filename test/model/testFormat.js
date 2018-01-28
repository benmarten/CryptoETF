import assert from 'assert'
import Format from './../../src/Format'

describe('Testing formatter', () => {
  it('format.money', async () => {
    assert(Format.money(1000) === '1,000.00')
    assert(Format.money(null) === '')
  })
  it('format.percent', async () => {
    assert(Format.percent(99.01) === '99.0')
    assert(Format.percent(1) === '1.0')
    assert(Format.percent(0.001) === '0.0')
    assert(Format.percent(null) === '')
  })
  it('format.bitcoin', async () => {
    assert(Format.bitcoin(0.123456789) === '0.12345679')
    assert(Format.bitcoin(1) === '1.00000000')
    assert(Format.bitcoin(null) === '')
  })
  it('format.addPlusSign', async () => {
    assert(Format.addPlusSign('100') === '+100')
    assert(Format.addPlusSign('-100') === '-100')
  })
})
