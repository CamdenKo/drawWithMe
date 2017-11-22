const socketio = require('socket.io')

const {
  generateUniqueKey,
  removeKey,
} = require('./room.util')

const rooms = {}
const userKey = {}
const parentKey = {}

const setupIO = (server) => {
  const io = socketio(server)

  io.on('connection', (socket) => {
    console.log(`CONNECTION ${socket.id}`)
    socket.on('requestCreateRoom', () => {
      const key = generateUniqueKey()
      socket.join(key)
      const newRoom = {
        key,
        parent: socket.id,
        users: {},
      }
      rooms[key] = newRoom
      parentKey[socket.id] = key
      console.log('connect', rooms[key])
      socket.emit('successCreateRoom', rooms[key])
    })

    socket.on('requestJoinRoom', ({ key }) => {
      if (rooms[key]) {
        rooms[key].users[socket.id] = 'Getting ready...'
        userKey[socket.id] = key
        socket.emit('successJoinRoom', { room: rooms[key] })
        socket.broadcast.emit('updateRoom', { room: rooms[key] })
      } else {
        socket.emit('errorJoinRoom', { err: 'Room doesn\'t exist' })
      }
    })

    socket.on('requestSetName', ({ key }) => {
    })

    socket.on('requestChangeName', ({ name }) => {
      const key = userKey[socket.id]
      const nameExists = Object.values(rooms[key].users)
        .some(existingName => existingName === name)
      if (nameExists) {
        socket.emit('errorChangeName')
      } else {
        rooms[key].users[socket.id] = name
        io.in(userKey[socket.id]).emit('updateRoom', { room: rooms[key] })
        socket.emit('successChangeName')
      }
    })

    socket.on('disconnect', () => {
      const key = userKey[socket.id]
      const innerKey = parentKey[socket.id]
      if (key) {
        delete userKey[socket.id]
        if (rooms[key]) {
          delete rooms[key].users[socket.id]
        }
        socket.broadcast.emit('updateRoom', { room: rooms[key] })
      } else if (innerKey) {
        Object.keys(rooms[innerKey].users).forEach((user) => {
          delete userKey[user]
        })
        removeKey(key)
        socket.broadcast.emit('deleteRoom')
      }
    })
  })
}

module.exports = setupIO
