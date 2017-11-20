const morgan = require('morgan')
const express = require('express')
const path = require('path')

const setupIO = require('./io')

const PORT = process.env.PORT || 8080

const app = express()
module.exports = app

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

const startServer = () => {
  const server = app.listen(PORT, () => console.log(`Skrttt skrttt trapping out on port${PORT}`))
  setupIO(server)
}

if (require.main === module) {
  startServer()
}
