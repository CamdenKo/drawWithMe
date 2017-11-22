const socketio = require('socket.io')
const chance = require('chance')()

const {
  generateUniqueKey,
  removeKey,
} = require('./room.util')

const rooms = {}
const userRoom = {}

const setupIO = (server) => {
  const io = socketio(server)

  io.on('connection', (socket) => {
    console.log(`CONNECTION ${socket.id}`)
    socket.on('requestCreateRoom', () => {
      const key = generateUniqueKey()
      socket.join(key)
      const newRoom = {
        key,
        users: {
          [socket.id]: chance.name(),
        },
      }
      rooms[key] = newRoom
      userRoom[socket.id] = Object.keys(socket.rooms)[0]
      socket.emit('successCreateRoom', rooms[key])
    })

    socket.on('requestJoinRoom', ({ key }) => {
      if (rooms[key]) {
        rooms[key].users[socket.id] = chance.name()
        socket.emit('successJoinRoom', { room: rooms[key] })
        socket.broadcast.emit('updateRoom', { room: rooms[key] })
      } else {
        socket.emit('errorJoinRoom', { err: 'Room doesn\'t exist' })
      }
    })

    socket.on('requestSetName', ({ key }) => {

    })

    socket.on('disconnect', () => {
      const key = userRoom[socket.id]
      delete userRoom[socket.id]
      if (rooms[key]) {
        delete rooms[key].users[socket.id]
        if (!Object.keys(rooms[key].users).length) {
          removeKey(key)
        }
      }
      socket.broadcast.emit('updateRoom', { room: rooms[key] })
    })
  })
}

module.exports = setupIO
