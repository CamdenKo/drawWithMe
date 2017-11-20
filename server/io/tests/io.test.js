const sinon = require('sinon')
const io = require('socket.io-client')

const app = require('../../index')
const setupIO = require('../index')

const socketURL = 'http://localhost:8081'
const options = {
  // transports: ['websocket'],
  // 'force new connection': true,
}

describe('io', () => {

  const server = app.listen('8081')
  setupIO(server)

  afterAll(() => {
    server.close()
  })

  test('successfulCreateRoom will be fired after a request with a truthy key', (done) => {
    const client1 = io.connect(socketURL, options)
    client1.on('connect', () => {
      client1.emit('requestCreateRoom')
    })
    client1.on('successfulCreateRoom', ({ key }) => {
      expect(key).toBeTruthy()
      done()
    })
  })
})
