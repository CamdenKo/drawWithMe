const socketio = require('socket.io')
const chance = require('chance')

const {
  generateUniqueKey,
  removeKey,
} = require('./room.util')

const rooms = {}

const setupIO = (server) => {
  const io = socketio(server)

  io.on('connection', (socket) => {
    console.log(`CONNECTION ${socket.id}`)
    socket.on('requestCreateRoom', () => {
      const key = generateUniqueKey()
      socket.join(key)
      if (!rooms[key]) {
        rooms[key] = {}
      }
      rooms[key][socket.id] = {}
      socket.emit('successfulCreateRoom', {
        key,
        users: {
          [socket.id]: chance.name(),
        },
      })
    })

    socket.on('requestJoinRoom', ({ key }) => {
      if (rooms[key]) {
        rooms[key][socket.id] = {}
        socket.emit('successJoinRoom', { msg: 'success', room: {} })
      } else {
        socket.emit('errorJoinRoom', { err: 'Room doesn\'t exist' })
      }
    })

    socket.on('requestSetName', ({ key }) => {

    })

    socket.on('disconnect', ({ key }) => { // TODO: key isn't passed in
      if (rooms[key]) {
        delete rooms[key][socket.id]
        if (!Object.keys(rooms[key]).length) {
          removeKey(key)
        }
      }
    })
  })
}

module.exports = setupIO
