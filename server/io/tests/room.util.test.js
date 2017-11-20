const sinon = require('sinon')

const {
  randomCharFromOptions,
} = require('../room.util')

describe('room.util', () => {
  describe('randomCharFromOptions', () => {
    const possibleOptions = 'asdfjkl'.split('')
    const randomStub = sinon.stub(Math, 'random')
    randomStub.onFirstCall().returns(0)
    randomStub.onSecondCall().returns(0.999999999999)
    randomStub.returns(0)

    it('will return values in the range from the first to last', () => {
      expect(randomCharFromOptions(possibleOptions)).toEqual('a')
      expect(randomCharFromOptions(possibleOptions)).toEqual('l')
    })
    it('returns a string', () => {
      expect(typeof randomCharFromOptions(possibleOptions)).toEqual('string')
    })
    it('returns string w/ length 1', () => {
      expect(randomCharFromOptions(possibleOptions).length).toEqual(1)
    })
  })
})
