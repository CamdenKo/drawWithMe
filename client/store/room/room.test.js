import { readRoom, READ_ROOM, updateRoom, UPDATE_ROOM, deleteRoom, DELETE_ROOM } from './room'

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
