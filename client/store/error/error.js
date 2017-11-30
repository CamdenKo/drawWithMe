export const ERROR_ROOM = 'ERROR_ROOM'
export const SUCCESS_ROOM = 'SUCCESS_ROOM'
export const ERROR_CHANGE_NAME = 'ERROR_CHANGE_NAME'
export const SUCCESS_CHANGE_NAME = 'SUCCESS_CHANGE_NAME'

export const errorRoom = () => ({ type: ERROR_ROOM })
export const successRoom = () => ({ type: SUCCESS_ROOM })
export const errorChangeName = () => ({ type: ERROR_CHANGE_NAME })
export const successChangeName = () => ({ type: SUCCESS_CHANGE_NAME })

export const defaultState = {
  roomError: false,
  changeNameError: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ERROR_ROOM:
      return { ...state, roomError: true }
    case SUCCESS_ROOM:
      return { ...state, roomError: false }
    case ERROR_CHANGE_NAME:
      return { ...state, changeNameError: true }
    case SUCCESS_CHANGE_NAME:
      return { ...state, changeNameError: false }
    default:
      return state
  }
}
