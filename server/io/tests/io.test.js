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
  test('errorJoinRoom will be fired after a request with a nonexistant room key', (done) => {
    const client1 = io.connect(socketURL)
    client1.on('connect', () => {
      client1.emit('requestJoinRoom', { key: '123456' })
      client1.on('errorJoinRoom', ({ err }) => {
        expect(err).toBeTruthy()
        done()
      })
    })
  })
  test('successJoinRoom will be fired after a request with a successful room key', (done) => {
    const randomStub = sinon.stub(Math, 'random')
    randomStub.returns(0)
    const client1 = io.connect(socketURL)
    client1.on('connect', () => {
      client1.emit('requestCreateRoom')
      const client2 = io.connect(socketURL)
      client2.on('connect', () => {
        client2.emit('requestJoinRoom', { key: '1111' })
        client2.on('successJoinRoom', ({ msg }) => {
          expect({ msg }).toBeTruthy()
          done()
        })
      })
    })
  })
})
