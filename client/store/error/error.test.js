import reducer, { defaultState, errorRoom, ERROR_ROOM, successRoom, SUCCESS_ROOM, errorChangeName, ERROR_CHANGE_NAME, successChangeName, SUCCESS_CHANGE_NAME } from './error'

describe('error actions', () => {
  it('should create action with ERROR_ROOM', () => {
    expect(errorRoom()).toEqual({
      type: ERROR_ROOM,
    })
  })
  it('should create action with SUCCESS_ROOM', () => {
    expect(successRoom()).toEqual({
      type: SUCCESS_ROOM,
    })
  })
  it('should create action with ERROR_CHANGE_NAME', () => {
    expect(errorChangeName()).toEqual({
      type: ERROR_CHANGE_NAME,
    })
  })
  it('should create action with SUCCESS_CHANGE_NAME', () => {
    expect(successChangeName()).toEqual({
      type: SUCCESS_CHANGE_NAME,
    })
  })
})

describe('error reducer', () => {
  const errorState = {
    ...defaultState,
    roomError: true,
    changeNameError: true,
  }
  it('should return defaultState by default', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })
  it('should set roomError to true with ERROR_ROOM', () => {
    expect(reducer(undefined, {
      type: ERROR_ROOM,
    })).toEqual({ ...defaultState, roomError: true })
  })
  it('should set roomError to false with SUCCESS_ROOM', () => {
    expect(reducer(errorState, {
      type: SUCCESS_ROOM,
    })).toEqual({ ...errorState, roomError: false })
  })
})
