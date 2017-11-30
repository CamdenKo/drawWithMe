const sinon = require('sinon')

const utils = require('../room.util')
const {
  randomCharFromOptions,
  generateKey,
  generateUniqueKey,
} = utils

describe('room.util', () => {
  describe('randomCharFromOptions', () => {
    const possibleOptions = 'asdfjkl'.split('')
    const randomStub = sinon.stub(Math, 'random')
    randomStub.returns(0)

    it('will return values in the range from the first to last', () => {
      randomStub.returns(0)
      expect(randomCharFromOptions(possibleOptions)).toEqual('a')
      randomStub.returns(0.999999999999)
      expect(randomCharFromOptions(possibleOptions)).toEqual('l')
    })
    it('returns a string', () => {
      expect(typeof randomCharFromOptions(possibleOptions)).toEqual('string')
    })
    it('returns string w/ length 1', () => {
      expect(randomCharFromOptions(possibleOptions).length).toEqual(1)
    })
  })
  describe('generateKey', () => {
    it('will return a string with specified length', () => {
      const len = 3
      expect(typeof generateKey(len)).toEqual('string')
      expect(generateKey(len).length).toEqual(len)
    })
  })
  describe('generateUniqueKey', () => {
    it('returns a string with length 6', () => {
      expect(generateUniqueKey().length).toEqual(6)
    })
  })
})
