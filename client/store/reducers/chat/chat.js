import db from '../../../firebase/db'

const READ_CHATS = 'READ_CHATS'
const READ_MESSAGE = 'READ_MESSAGE'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const CLEAR_CHAT = 'CLEAR_CHAT'
const DISABLE_CHAT = 'DISABLE_CHAT'
const ENABLE_CHAT = 'ENABLE_CHAT'
const SUBSCRIBE_CHAT = 'SUBSCRIBE_CHAT'

export const readChats = chat => ({ type: READ_CHATS, chat })
export const readMessage = message => ({ type: READ_MESSAGE, message })
export const errorMessage = err => ({ type: ERROR_MESSAGE, err })
export const clearChat = () => ({ type: CLEAR_CHAT })
export const enableChat = () => ({ type: ENABLE_CHAT })
export const disableChat = () => ({ type: DISABLE_CHAT })
export const rightGuessMessage = playerName => readMessage({ message: `${playerName} guessed the word correctly!` })
export const subscribeChat = ref => ({ type: SUBSCRIBE_CHAT, ref })

const timeoutPromisifed = (time, cb) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb())
    }, time)
  })

const countdownMessage = time => ({
  message: `${time} remains`,
  color: 'red',
})

export const countdownChats = seconds =>
  async (dispatch) => {
    for (let time = seconds; time > 0; time -= 1) {
      // eslint-disable-next-line no-await-in-loop
      await timeoutPromisifed(1000, () => dispatch(readMessage(countdownMessage(time))))
    }
  }

export const subscribeToMessages = () =>
  (dispatch, getState) => {
    const state = getState()
    if (state.chat.subscribed) return
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/messages`)
    ref.on('value', (snapshot) => {
      const messages = snapshot.val()
      console.log(messages)
      if (Array.isArray(messages)) {
        dispatch(readChats(messages))
      } else {
        dispatch(readChats(Object.values(messages)))
      }
      dispatch(subscribeChat(ref))
    })
  }

const writeMessage = (author, content, color = 'black') => ({
  author,
  content,
  color,
  time: Date.now(),
})

export const sendMessage = content =>
  async (dispatch, getState) => {
    const state = getState()
    const author = state.user.user.name
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/messages`)
    const message = writeMessage(author, content)
    await ref.push(message)
  }

const defaultState = {
  disabled: false,
  subscribed: null,
  chat: [],
  err: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_CHATS:
      return { ...state, chat: action.chat }
    case READ_MESSAGE:
      return { ...state, chat: [...state.chat, action.message] }
    case ERROR_MESSAGE:
      return { ...state, err: action.err }
    case CLEAR_CHAT:
      return { ...state, ...defaultState }
    case DISABLE_CHAT:
      return { ...state, disabled: true }
    case ENABLE_CHAT:
      return { ...state, disabled: false }
    case SUBSCRIBE_CHAT:
      return { ...state, subscribed: action.ref }
    default:
      return state
  }
}
