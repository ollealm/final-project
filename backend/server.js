import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import bcrypt from "bcrypt-nodejs"

import User from './models/users'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise
mongoose.set('useCreateIndex', true)

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8090
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())



const authenticator = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header("Authorization")
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401)
        .json({ loggedOut: true, message: "Try logging in again" })
    }
  } catch (err) {
    res.status(403)
      .json({ message: "Access token missing or wrong", errors: err.errors })
  }
}




///// Routes /////
app.get('/', (req, res) => {
  res.send('Hello world')
})


///// Create User /////

app.post("/users", async (req, res) => {
  try {
    const { name, password } = req.body
    const user = new User({ name, password: bcrypt.hashSync(password) }) // stores password encrypted
    const saved = await user.save()
    res.status(201).json({ userId: saved._id, accessToken: saved.accessToken });
    // res.status(201).json(saved) // don't return password
  } catch (err) {
    res.status(400).json({ message: "could not save user", errors: err })
  }
})


///// Login /////

app.post("/sessions", async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken }) //response to frontend
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(400).json({ message: "Could not log in", error: err.errors })
  }
})


///// Secure endpoint after log in /////

app.get("/users/:id", authenticator)
app.get("/users/:id", (req, res) => {
  res.status(201).json({ name: req.user.name, userId: req.user._id }); //response to frontend
})




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
