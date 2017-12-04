import db, {
  defaultRoom,
} from '../db'
import possibleWords from './allWords'

const approvedCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890'

export const pickOneRandomChar = str =>
  str[Math.floor(Math.random() * str.length)]

export const generateOneCode = len =>
  new Array(len).fill(undefined).map(() => pickOneRandomChar(approvedCharacters)).join('')

export const generateRoomCode = async () => {
  const length = 6
  const ref = await db.ref().once('value')
  const code = generateOneCode(length)
  return Object.keys(ref.val()).includes(code) ?
    generateRoomCode() :
    code
}

export const createRoom = async () => {
  const code = await generateRoomCode()
  await db.ref().update({
    [code]: defaultRoom,
  })
  return code
}

export const getWords = async (code) => {
  const ref = await db.ref(`${code}`).once('value')
  return Array.isArray(ref.val()) ?
    ref.val() :
    Object.values(ref.val())
}

export const generateWord = async (code, usedWords) => {
  const word = pickOneRandomChar(possibleWords)
  const wordsToAvoid = usedWords || await getWords(code)
  return wordsToAvoid.includes(word) ?
    generateWord(code, wordsToAvoid) :
    word
}

export const deleteRoom = async code =>
  db.ref(`${code}`).set(null)

