import sinon from 'sinon'

import {
  pickOneRandomChar,
  generateOneCode,
} from './utils'

describe('firebase utils', () => {
  describe('pickOneRandomChar', () => {
    it('returns one char', () => {
      expect(pickOneRandomChar('adsf').length).toEqual(1)
    })
    it('picks chars from either the front or the end', () => {
      let stub = sinon.stub(Math, 'random').callsFake(() => 0)
      expect(pickOneRandomChar('asdf')).toEqual('a')
      stub.restore()
      stub = sinon.stub(Math, 'random').callsFake(() => 0.9999999999)
      expect(pickOneRandomChar('asdf')).toEqual('f')
      stub.restore()
    })
  })
  describe('generateOneCode', () => {
    it('returns a string', () => {
      const len = 5
      expect(typeof generateOneCode(len)).toEqual('string')
    })
    it('returns a string with the proper length', () => {
      const len = 5
      expect(generateOneCode(len).length).toEqual(len)
    })
  })
})
