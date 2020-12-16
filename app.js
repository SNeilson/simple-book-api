const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

const db = mongoose.connect(
  process.env.ENV === 'Test'
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
)

const port = process.env.PORT
const Book = require('./models/bookModel')
const bookRouter = require('./routes/bookRouter')(Book)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/books', bookRouter)

app.get('/', (req, res) => {
  res.send('Welcome to my node.js book API!')
})

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

module.exports = app
