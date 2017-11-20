const gen = require('generate-key')

const usedKeys = new Set()

const generateUniqueKey = () => {
  const possibleKey = gen.generateKey(5)
  if (usedKeys.has(possibleKey)) {
    return generateUniqueKey()
  }
  usedKeys.add(possibleKey)
  return possibleKey
}

module.exports = {
  generateUniqueKey,
}
