import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from "bcrypt-nodejs"

import foodData from './data/livsmedel_mini.json'
const items = foodData.LivsmedelDataset.LivsmedelsLista.Livsmedel

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
      accessToken: req.header("nameization")
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




// ITEMS
app.get('/items', (req, res) => {
  const { name, group, language, minpages = 0, maxpages = Infinity, rating, sort, nutrient, ratio, page, test, limit = 20 } = req.query

  console.log(nutrient)

  const filterItems = (array, filter) => {
    return array.toString().toLowerCase().includes(filter)
  }

  let filteredItems = items;

  //Filter
  if (name) {
    filteredItems = filteredItems.filter(item => filterItems(item.Namn, name))
  }
  if (group) {
    filteredItems = filteredItems.filter(item => filterItems(item.Huvudgrupp, group))
  }
  if (test) {
    filteredItems = filteredItems.filter(item => item.Naringsvarden.Naringsvarde.length < test)
  }
  // if (language) {
  //   filteredItems = filteredItems.filter(item => filterItems(item.language_code, language))
  // }
  // if (maxpages || minpages) {
  //   filteredItems = filteredItems.filter(item => item.num_pages < +maxpages && item.num_pages > +minpages)
  // }
  // if (rating) {
  //   filteredItems = filteredItems.filter(item => Math.round(item.average_rating) === +rating)
  // }

  //Sort
  //sorting on name and group was a lot more complicated that I assumed 
  if (sort) {
    if (sort === 'name') {
      filteredItems = filteredItems.sort((a, b) => {
        const nameA = a.Namn.toLowerCase()
        const nameB = b.Namn.toLowerCase()
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else if (sort === 'group') {
      filteredItems = filteredItems.sort((a, b) => {
        const groupA = a.Huvudgrupp.toLowerCase()
        const groupB = b.Huvudgrupp.toLowerCase()
        if (groupA < groupB) return -1;
        if (groupA > groupB) return 1;
        return 0;
      });
    } else if (sort === 'nutrient') {
      filteredItems = filteredItems.sort((a, b) => {
        const valueA = parseFloat(a.Naringsvarden.Naringsvarde[nutrient].Varde.replace(',', '.'))
        const valueB = parseFloat(b.Naringsvarden.Naringsvarde[nutrient].Varde.replace(',', '.'))
        return valueB - valueA
        // if (valueA < valueB) return 1;
        // if (valueA > valueB) return -1;
        // return 0;
      })
    } else if (sort === 'ratio') {
      filteredItems = filteredItems.sort((a, b) => {
        const nutrientA = parseFloat(a.Naringsvarden.Naringsvarde[nutrient].Varde.replace(',', '.'))
        const denominatorA = parseFloat(a.Naringsvarden.Naringsvarde[ratio].Varde.replace(',', '.'))
        const nutrientB = parseFloat(b.Naringsvarden.Naringsvarde[nutrient].Varde.replace(',', '.'))
        const denominatorB = parseFloat(b.Naringsvarden.Naringsvarde[ratio].Varde.replace(',', '.'))
        const ratioA = nutrientA / denominatorA || 0
        const ratioB = nutrientB / denominatorB || 0
        return ratioB - ratioA
        if (ratioA < ratioB) return 1;
        if (ratioA > ratioB) return -1;
        return 0;
      })
      /*
            filteredItems = filteredItems.map(item => {
              // console.log(item.Naringsvarden.Naringsvarde[nutrient].Varde)
              const nutrientValue = parseFloat(item.Naringsvarden.Naringsvarde[nutrient].Varde.replace(',', '.'))
              const denominatorValue = parseFloat(item.Naringsvarden.Naringsvarde[ratio].Varde.replace(',', '.'))
              const ratioValue = nutrientValue / denominatorValue
              return ratioValue
            })
      */
    }
  }
  let results = filteredItems.length
  let pages = Math.ceil(results / limit)
  //Pagination
  if (page) {
    filteredItems = filteredItems.slice((page - 1) * limit, limit * page)
  }
  //Returning results 
  console.log("filtered return " + filteredItems.length)
  if (filteredItems.length > 0) res.json({ results, pages, filteredItems })
  else res.status(404).json({ message: 'No Items found' })
})




// ITEM ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params
  const itemFromId = items.find(item => item.Nummer === id)

  if (itemFromId) res.json(itemFromId)
  else res.status(404).json({ message: `Item id ${id} not found` })
})






///// USER ROUTES /////

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
