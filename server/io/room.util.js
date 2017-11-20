const possibleKeyOptions = '1234567890qwertyuiopasdfghjklzxcvbnm'.toUpperCase().split('')

const usedKeys = new Set()

const randomCharFromOptions = arrOfChars =>
  arrOfChars[Math.floor((Math.random() * arrOfChars.length))]

const generateKey = size =>
  [...Array(size)].map(() => randomCharFromOptions(possibleKeyOptions)).join('')

const generateUniqueKey = () => {
  const possibleKey = generateKey()
  if (usedKeys.has(possibleKey)) {
    return generateUniqueKey()
  }
  usedKeys.add(possibleKey)
  return possibleKey
}

module.exports = {
  randomCharFromOptions,
  generateKey,
  generateUniqueKey,
}
