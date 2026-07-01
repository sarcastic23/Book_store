const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://localhost:27017/book_Store'

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.log(err))





const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genere: { type: String, required: true },
  emoji: { type: String },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  readtime: { type: String, required: true },
  topics: { type: [String], required: true },
  steps: { type: [String], required: true },
  price: { type: Number, required: true, min: 0 },
  Stored_by: { type: String, required: true },
})


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

Book = mongoose.model('Book', bookSchema)
User=mongoose.model('User',userSchema)

module.exports={Book,User}