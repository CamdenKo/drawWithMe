import reducer, { load, LOAD, loadFinished, LOAD_FINISHED, criticalLoad, CRITICAL_LOAD, criticalLoadFinished, CRITICAL_LOAD_FINISHED, defaultState } from './loading'

describe('loading actions', () => {
  it('should create action with LOAD', () => {
    expect(load()).toEqual({ type: LOAD })
  })
  it('should create action with LOAD_FINISHED', () => {
    expect(loadFinished()).toEqual({ type: LOAD_FINISHED })
  })
  it('should create action with CRITICAL_LOAD', () => {
    expect(criticalLoad()).toEqual({ type: CRITICAL_LOAD })
  })
  it('should create action with CRITICAL_LOAD_FINISHED', () => {
    expect(criticalLoadFinished()).toEqual({ type: CRITICAL_LOAD_FINISHED })
  })
})

describe('loading reducer', () => {
  const loadingState = {
    loading: true,
    criticalLoading: true,
  }
  it('should return state by default', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })
  it('should set loading to true with LOAD', () => {
    expect(reducer(undefined, {
      type: LOAD,
    })).toEqual({ ...defaultState, loading: true })
  })
  it('should set loading to false with LOAD_FINISHED', () => {
    expect(reducer(loadingState, {
      type: LOAD_FINISHED,
    })).toEqual({ ...loadingState, loading: false })
  })
  it('should set criticalLoading to true with CRITICAL_LOAD', () => {
    expect(reducer(undefined, {
      type: CRITICAL_LOAD,
    })).toEqual({ ...defaultState, criticalLoading: true })
  })
  it('should set criticalLoading to false with CRITICAL_LOAD_FINISHED', () => {
    expect(reducer(loadingState, {
      type: CRITICAL_LOAD_FINISHED,
    })).toEqual({ ...loadingState, criticalLoading: false })
  })
})
