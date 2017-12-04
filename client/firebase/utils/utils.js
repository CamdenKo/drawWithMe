import db, {
  defaultRoom,
} from '../db'

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

export const deleteRoom = async code =>
  db.ref(`${code}`).set(null)

