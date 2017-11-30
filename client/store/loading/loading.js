export const CRITICAL_LOAD = 'CRITICAL_LOAD'
export const CRITICAL_LOAD_FINISHED = 'CRITICAL_LOAD_FINISHED'
export const LOAD = 'LOAD'
export const LOAD_FINISHED = 'LOAD_FINISHED'

export const criticalLoad = () => ({ type: CRITICAL_LOAD })
export const criticalLoadFinished = () => ({ type: CRITICAL_LOAD_FINISHED })
export const load = () => ({ type: LOAD })
export const loadFinished = () => ({ type: LOAD_FINISHED })

export const defaultState = {
  criticalLoading: false,
  loading: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CRITICAL_LOAD:
      return { ...state, criticalLoading: true }
    case CRITICAL_LOAD_FINISHED:
      return { ...state, criticalLoading: false }
    case LOAD:
      return { ...state, loading: true }
    case LOAD_FINISHED:
      return { ...state, loading: false }
    default:
      return state
  }
}
