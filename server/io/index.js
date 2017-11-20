const socketio = require('socket.io')

const {
  generateUniqueKey,
  removeKey,
} = require('./room.util')

const rooms = {}

const setupIO = (server) => {
  const io = socketio(server)

  io.on('connection', (socket) => {
    console.log('connected', socket.id)

    socket.on('requestCreateRoom', () => {
      const key = generateUniqueKey()
      socket.join(key)
      if (!rooms[key]) {
        rooms[key] = {}
      }
      rooms[key][socket.id] = {}
      socket.emit('successfulCreateRoom', { key })
    })

    socket.on('requestJoinRoom', ({ key }) => {
      if (rooms[key]) {
        rooms[key][socket.id] = {}
        socket.emit('successJoinRoom')
      } else {
        socket.emit('errorJoinRoom', { error: 'Room doesn\'t exist' })
      }
    })

    socket.on('requestSetName', ({ key }) => {
      if
    })

    socket.on('disconnect', ({ key }) => {
      delete rooms[key][socket.id]
      if (!Object.keys(rooms[key]).length) {
        removeKey(key)
      }
    })
  })
}

module.exports = setupIO
