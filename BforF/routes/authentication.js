const express=require('express')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

const userRouter=express.Router()

const {User}=require('../database')
const your_secret_key="khdcbkjasbkhasbk";

userRouter.post("/register", async (req,res)=>{
try{
const user=req.body
user.password=await bcrypt.hash(user.password,10)
const find=await User.findOne({username:user.username})
if(find){
    return res.status(400).json({message:"user already exists!!!"})
}
const newUser=new User(user)
await newUser.save()
  const token = jwt.sign(
    { id: find._id, username: find.username },  // payload
    "your_secret_key",                           // secret
    { expiresIn: "1d" }                          // expires in 1 day
  )
res.status(201).json({ message: "User registered!", token }) 
}
catch(err){
    console.log(err)
    res.status(500).json({message:err.message})
}
})


userRouter.post("/login", async (req, res) => {
  try {
    const user = req.body

    const find = await User.findOne({ username: user.username })
    if (!find) {
      return res.status(404).json({ message: "User not found!" })
    }

    const isMatch = await bcrypt.compare(user.password, find.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password!" })
    }

    // generate token
    const token = jwt.sign(
      { id: find._id, username: find.username },  // payload
      "your_secret_key",                           // secret
      { expiresIn: "1d" }                          // expires in 1 day
    )

    res.status(200).json({ message: "Login successful!", token })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})


const protect = (req, res, next) => {
  try {
    // get token from header
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "No token, access denied!" })
    }

    // verify token
    const decoded = jwt.verify(token, "your_secret_key")
    req.user = decoded   // attach user to request
    next()               // move to next

  } catch (err) {
    res.status(401).json({ message: "Invalid token!" })
  }
}

module.exports = {userRouter ,protect}
