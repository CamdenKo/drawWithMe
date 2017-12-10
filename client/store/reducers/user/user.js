import db from '../../../firebase/db'

import {
  validName,
} from '../../../firebase/utils/utils'

const READ_USER = 'READ_USER'
const UPDATE_USER = 'UPDATE_USER'
const ERROR_USER = 'ERROR_USER'

export const readUser = user => ({ type: READ_USER, user })
export const updateUser = user => ({ type: UPDATE_USER, user })
export const errorUser = err => ({ type: ERROR_USER, err })

const generateUserObj = name => ({
  drawer: false,
  name,
  points: 0,
})

export const setName = name =>
  async (dispatch, getState) => {
    try {
      const state = getState()
      if (await validName(state.roomCode.roomCode, name)) {
        const ref = db.ref(`${state.roomCode.roomCode}/players`)
        const userObj = generateUserObj(name)
        await ref.push(userObj)
        const numLoadingRef = await db.ref(`${state.roomCode.roomCode}/numLoading`).once('value')
        await db.ref(`${state.roomCode.roomCode}/numLoading`).set(numLoadingRef.val() - 1)
        dispatch(readUser(userObj))
      } else {
        dispatch(errorUser(`${name} is already taken. Try another one?`))
      }
    } catch (err) {
      console.error(err)
    }
  }

const defaultState = {
  nameSet: false,
  user: {},
  err: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_USER:
      return { ...state, user: action.user, nameSet: true }
    case UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.user } }
    case ERROR_USER:
      return { ...state, err: action.err }
    default:
      return state
  }
}
