export const READ_ROOM = 'READ_ROOM'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const DELETE_ROOM = 'DELETE_ROOM'

export const readRoom = room => ({ type: READ_ROOM, room })
export const updateRoom = room => ({ type: UPDATE_ROOM, room })
export const deleteRoom = () => ({ type: DELETE_ROOM })
