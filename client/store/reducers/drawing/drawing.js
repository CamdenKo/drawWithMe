import db from '../../../firebase/db'

const READ_DRAWING = 'READ_DRAWING'
const READ_LINE = 'READ_LINE'
const CLEAR_DRAWING = 'CLEAR_DRAWING'
const SUBSCRIBE_DRAWING = 'SUBSCRIBE_DRAWING'

export const readDrawing = drawing => ({ type: READ_DRAWING, drawing })
export const readLine = line => ({ type: READ_LINE, line })
export const clearDrawing = () => ({ type: CLEAR_DRAWING })
export const subscribeDrawing = ref => ({ type: SUBSCRIBE_DRAWING, ref })

const defaultState = {
  drawing: [],
  subscribed: null,
}

export const postLine = line =>
  async (dispatch, getState) => {
    const state = getState()
    const code = state.roomCode.roomCode || 'test'
    await db.ref(`${code}/drawing`).push(line)
  }

export const subscribeToDrawing = () =>
  (dispatch, getState) => {
    const state = getState()
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/drawing`)
    ref.on('value', (snapshot) => {
      const lines = snapshot.val()
      if (lines) {
        dispatch(readDrawing(Object.values(lines)))
      }
    })
    dispatch(subscribeDrawing(ref))
  }

export const deleteDrawing = () =>
  async (dispatch, getState) => {
    const state = getState()
    const code = state.roomCode.roomCode
    await db.ref(`${code}/drawing`).set(null)
    dispatch(clearDrawing())
  }

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_DRAWING:
      return { ...state, drawing: action.drawing }
    case READ_LINE:
      return { ...state, drawing: [...state.drawing, action.line] }
    case CLEAR_DRAWING:
      return { ...state, drawing: [] }
    case SUBSCRIBE_DRAWING:
      return { ...state, subscribed: action.ref }
    default:
      return state
  }
}
