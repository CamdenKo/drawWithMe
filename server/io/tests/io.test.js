const sinon = require('sinon')
const io = require('socket.io-client')

const socketURL = 'http://localhost:8080'
const options = {
  // transports: ['websocket'],
  // 'force new connection': true,
}

describe('io', () => {
  test('requestCreateRoom', (done) => {
    const client1 = io.connect(socketURL, options)
    client1.on('connection', (data) => {
      console.log('connected')
      client1.emit('requestCreateRoom', ({ key }) => {
        expect(key).toBe(11118)
        done()
      })
    })
  })
})
