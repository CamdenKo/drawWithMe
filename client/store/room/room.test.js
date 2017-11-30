import reducer, { readRoom, READ_ROOM, updateRoom, UPDATE_ROOM, deleteRoom, DELETE_ROOM, defaultState } from './room'

describe('room actions', () => {
  const fakeRoom = {
    id: 3,
  }
  it('should create action with READ_ROOM', () => {
    expect(readRoom(fakeRoom)).toEqual({ type: READ_ROOM, room: fakeRoom })
  })
  it('should create action with UPDATE_ROOM', () => {
    expect(updateRoom(fakeRoom)).toEqual({ type: UPDATE_ROOM, room: fakeRoom })
  })
  it('should create action with DELETE_ROOM', () => {
    expect(deleteRoom()).toEqual({ type: DELETE_ROOM })
  })
})

describe('room reducer', () => {
  const fakeRoom1 = {
    id: 4,
    users: [
      'sd',
      'sdf',
    ],
    a: 3,
  }
  const fakeRoom2 = {
    id: 4,
    users: [
      'as',
      'sd',
      'sdf',
    ],
  }

  it('should return state by default', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })
  it('should return room with READ_ROOM', () => {
    expect(reducer(undefined, {
      type: READ_ROOM,
      room: fakeRoom1,
    })).toEqual(fakeRoom1)
  })
  it('should combine state when called with UPDATE_ROOM', () => {
    expect(reducer(fakeRoom1, {
      type: UPDATE_ROOM,
      room: fakeRoom2,
    })).toEqual({ ...fakeRoom1, ...fakeRoom2 })
  })
  it('should return default state when called with DELETE_ROOM', () => {
    expect(reducer(fakeRoom1, {
      type: DELETE_ROOM,
    })).toEqual(defaultState)
  })
})
