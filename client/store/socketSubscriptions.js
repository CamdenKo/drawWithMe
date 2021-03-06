import io from 'socket.io-client'
import { readSocket, readRoom, errorRoom, updateRoom, deleteRoom, changeName, changeNameError } from './index'
const sock = io()

export default ({ dispatch }) => {
  dispatch(readSocket(sock))
  sock.on('successJoinRoom', ({ room }) => {
    dispatch(readRoom(room))
  })
  sock.on('errorJoinRoom', ({ err }) => {
    dispatch(errorRoom(err))
  })
  sock.on('successCreateRoom', (room) => {
    dispatch(readRoom(room))
  })
  sock.on('updateRoom', ({ room }) => {
    dispatch(updateRoom(room))
  })
  sock.on('deleteRoom', () => {
    dispatch(deleteRoom())
  })
  sock.on('successChangeName', () => {
    dispatch(changeName())
  })
  sock.on('errorChangeName', () => {
    dispatch(changeNameError())
  })
}
