const morgan = require('morgan')
const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express()
module.exports = app

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

const createApp = () => {
  app.listen(PORT, () => console.log(`Skrttt skrttt trapping out on port${PORT}`))
}

createApp()
