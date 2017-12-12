import assert from 'assert'
import Format from './../../src/Format'

describe('Testing formatter', () => {
  it('format.money', async () => {
    assert(Format.money(1000) === '1,000')
    assert(Format.money(null) === '')
  })
  it('format.percent', async () => {
    assert(Format.bitcoin(99.01) === '99.01')
    assert(Format.bitcoin(1) === '1.00')
    assert(Format.bitcoin(0.001) === '0.00')
    assert(Format.bitcoin(null) === '')
  })
  it('format.bitcoin', async () => {
    assert(Format.bitcoin(1000.01) === '1000.01')
    assert(Format.bitcoin(1000) === '1000.00')
    assert(Format.bitcoin(null) === '')
  })
  it('format.addPlusSign', async () => {
    assert(Format.addPlusSign('100') === '+100')
    assert(Format.addPlusSign('-100') === '-100')
  })
})