const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost/bookAPI', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
