const socketio = require('socket.io')

const setupIO = (server) => {
  const io = socketio(server)

  io.on('connection', (socket) => {
    console.log('connected', socket.id)
  })
}

module.exports = setupIO
