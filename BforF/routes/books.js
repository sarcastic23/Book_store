const express=require('express')
const {Book}=require('../database')

const router=express.Router()


router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body)
    await book.save()
    res.status(201).json({ message: "Book added!", book })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})




router.get('/:genere', async (req, res) => {
  try {
    const { genere } = req.params  // expects /books/

    const books = await Book.find({ genere: genere }).limit(2)
    res.status(200).json(books)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

module.exports=router