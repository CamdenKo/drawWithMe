const READ_CHATS = 'READ_CHATS'
const READ_MESSAGE = 'READ_MESSAGE'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const CLEAR_CHAT = 'CLEAR_CHAT'
const DISABLE_CHAT = 'DISABLE_CHAT'
const ENABLE_CHAT = 'ENABLE_CHAT'

export const readChats = chat => ({ type: READ_CHATS, chat })
export const readMessage = message => ({ type: READ_MESSAGE, message })
export const errorMessage = err => ({ type: ERROR_MESSAGE, err })
export const clearChat = () => ({ type: CLEAR_CHAT })
export const enableChat = () => ({ type: ENABLE_CHAT })
export const disableChat = () => ({ type: DISABLE_CHAT })
export const rightGuessMessage = playerName => readMessage({ message: `${playerName} guessed the word correctly!` })

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
    default:
      return state
  }
}
