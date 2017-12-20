import db from '../../../firebase/db'

import {
  validName,
} from '../../../firebase/utils/utils'

const READ_USER = 'READ_USER'
const UPDATE_USER = 'UPDATE_USER'
const ERROR_USER = 'ERROR_USER'
const SUBSCRIBE_USER = 'SUBSCRIBE_USER'

export const readUser = user => ({ type: READ_USER, user })
export const updateUser = user => ({ type: UPDATE_USER, user })
export const errorUser = err => ({ type: ERROR_USER, err })
export const subscribeUser = ref => ({ type: SUBSCRIBE_USER, ref })

const generateUserObj = name => ({
  drawer: false,
  name,
  points: 0,
})

const subscribeToUser = userKey =>
  (dispatch, getState) => {
    const state = getState()
    const code = state.roomCode.roomCode
    console.log('user key ', userKey)
    const ref = db.ref(`${code}/players/${userKey}`)
    ref.on('value', (snapshot) => {
      const user = snapshot.val()
      dispatch(readUser(user))
    })
    dispatch(subscribeUser(ref))
  }

export const setName = name =>
  async (dispatch, getState) => {
    try {
      const state = getState()
      const code = state.roomCode.roomCode
      if (await validName(code, name)) {
        const ref = db.ref(`${state.roomCode.roomCode}/players`)
        const userObj = generateUserObj(name)
        await ref.push(userObj)
        const numLoadingRef = await db.ref(`${code}/numLoading`).once('value')
        await db.ref(`${code}/numLoading`).set(numLoadingRef.val() - 1)

        const playersRef = db.ref(`${code}/players`)
        const players = (await playersRef.once('value')).val()
        const playerIndex = Object.keys(players)
          .findIndex(playerKey => players[playerKey].name === name)
        dispatch(subscribeToUser(Object.keys(players)[playerIndex]))
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
  subscribed: null,
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
