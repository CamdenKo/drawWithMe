export const isUppercase = char =>
  char === char.toUpperCase() && char !== char.toLowerCase()

export const uppify = str =>
  str
    .split('')
    .map(letter => isUppercase(letter) ?
      `_${letter}` :
      letter.toUpperCase(),
    )
    .join('')

export const actionCreatorNamer = (actionName, functionName) =>
  `${actionName}${functionName[0].toUpperCase()}${functionName.slice(1)}`

export const defaultState = {
  loading: false,
  error: null,
}

/**
 * changeName
 * => requestChangeName
 * <= errorChangeName dispatch(ERROR)
 * <= successChangeName dispatch(DONE_LOADING)
 * @param {function} ajaxFunc
 * @param {String} funcName
 * @returns {Object}
 */

const createAjaxReducer = (ajaxFunc, funcName) => {
  const uppName = uppify(funcName)
  const LOADING = `LOADING_${uppName}`
  const DONE_LOADING = `DONE_LOADING_${uppName}`
  const ERROR = `ERROR_${uppName}`
  const REMOVE_ERROR = `REMOVE_ERROR_${uppName}`

  return {
    actionCreators: {
      [actionCreatorNamer('loading', funcName)]: () => ({ type: LOADING }),
      [actionCreatorNamer('doneLoading', funcName)]: () => ({ type: DONE_LOADING }),
      [actionCreatorNamer('error', funcName)]: err => ({ type: ERROR, err }),
      [actionCreatorNamer('removeError', funcName)]: () => ({ type: REMOVE_ERROR }),
    },
    reducer: (state = defaultState, action) => {
      switch (action.type) {
        case LOADING:
          return { ...state, loading: true }
        case DONE_LOADING:
          return { ...state, loading: false }
        case ERROR:
          return { ...state, error: action.err }
        case REMOVE_ERROR:
          return { ...state, error: null }
        default:
          return state
      }
    },
  }
}

export default createAjaxReducer
