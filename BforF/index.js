const express = require('express')
const db=require('./database')
const {userRouter,protect}=require('./routes/authentication')
const router=require('./routes/books')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000




app.use(userRouter)

app.use(protect)
app.use('/books',router)



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})