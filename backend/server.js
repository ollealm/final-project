import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from "bcrypt-nodejs"

import User from './models/users'
import Item from './models/items'

import foodData from './data/livsmedel_mini.json'
let items = foodData.LivsmedelDataset.LivsmedelsLista.Livsmedel

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/mutrientsAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise
mongoose.set('useCreateIndex', true)

const port = process.env.PORT || 8090
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


///// RESET DATABASE /////

if (process.env.RESET_DB) {
  console.log("Database reset")
  console.time("Reset")

  const seedDatabase = async () => {
    await Item.deleteMany({})

    console.log("Documents deleted")
    console.timeLog("Reset")

    const convertArrayToObject = (array, key) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
    };
    // Change 'Varde' from ie 5 000,0 to 5000.0
    items = items.map((item) => {
      item.Naringsvarden.Naringsvarde = item.Naringsvarden.Naringsvarde.map(item => {
        item.Varde = item.Varde.replace(/(?<=\d),(?=\d)/gm, '.')
        item.Varde = item.Varde.replace(/(?<=\d)\s(?=\d)/gm, '')
        item.Forkortning = item.Forkortning.replace(/\:/g, '_')
        item.Forkortning = item.Forkortning.replace("\-", '_')
        item.Forkortning = item.Forkortning.replace("\/", '_')
        return item
      })
      item.Naringsvarden.Naringsvarde = convertArrayToObject(item.Naringsvarden.Naringsvarde, "Forkortning")
      return item
    })

    console.log("Pre-processing")
    console.timeLog("Reset")

    await items.forEach((item, index) => {
      new Item({
        number: item.Nummer,
        name: item.Namn,
        group: item.Huvudgrupp,
        nutrients: item.Naringsvarden.Naringsvarde,
      }).save()
      if (index % 100 === 0) {
        console.log(`Item: ${index}`)
        console.timeLog("Reset")
      }
    })
    console.log("Database re-seeded")
    console.timeEnd("Reset")

    // userSchema.pre('save', function (next) {
    //   this.screenname = this.get('_id'); // considering _id is input by client
    //   next();
    // });

  }
  seedDatabase()
}



///// AUTHENTICATOR MIDDLEWARE /////

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


///// ROUTS /////

//ROOT
app.get('/', (req, res) => {
  res.send('Hello world')
  // Display routes
})


///// Aggregate /////
app.get('/nutrients', async (req, res) => {
  const { name, group, sort, nutrient, nut, ratio, page = 1, limit = Infinity } = req.query
  let items = []

  if (name) {
    items = await Item.aggregate([{ $match: { name: name } }])
  }
  if (group) {
    items = await Item.aggregate([
      { $group: { _id: "$group", numberOfItems: { $sum: 1 } } },
    ])
  }
  if (nut) {
    items = await Item.aggregate([
      {
        $project: {
          item: 1,
          name: "$name",
          nutrients: { $objectToArray: "$nutrients" }
        }
      },
      { $unwind: "$nutrients" },
      {
        $project: {
          name: "$name",
          nutrients: "$nutrients.k"
        }
      },
      {
        $group:
        {
          _id: "$nutrients",
          numberOfItems: { $sum: 1 },
          Items: { $addToSet: "$name" }
        }
      },
      // {
      //   $group:
      //   {
      //     _id: "$name",
      //     numberOfItems: { $sum: 1 },
      //     Nutrients: { $addToSet: "$nutrients" }
      //   }
      // },
      // { $project: { A: 1, B: 1, inBOnly: { $setDifference: [ "$B", "$A" ] }, _id: 0 } }
      // { $group: { _id: "$dimensions.k", numberOfItems: { $sum: 1 } } },

      // { $group: { _id: "$name", mergedSales: { $mergeObjects: "$nutrients" } } }

      // { $mergeObjects: ["$nutrients"] }
      // {
      //   $project: {
      //     _id: "$name",
      //     nutrient: {
      //       $filter: { input: "$nutrients", as: "nutrient", cond: { $or: [{ $eq: ["$$nutrient.Forkortning", "I"] }, { $eq: ["$$nutrient.Forkortning", "Mfet"] }] } }
      //     }
      //   }
      // },
      // { $unwind: "$nutrient" },
    ])
      // .limit(20)
      .sort({ numberOfItems: 1 })
  }

  console.log("starting aggregate")

  if (ratio) {
    items = Item.aggregate([
      //filter out nutrient 0 $match
      { $match: { [`nutrients.${nutrient}.Varde`]: { $ne: 0 } } },
      {
        $project: {
          _id: "$name",
          ratio: {
            // $divide: [`$nutrients.${nutrient}.Varde`, `$nutrients.${ratio}.Varde`]
            $cond: [{ $eq: [`$nutrients.${ratio}.Varde`, 0] }, `Infinite`, { $round: [{ $divide: [`$nutrients.${nutrient}.Varde`, `$nutrients.${ratio}.Varde`] }, 4] }]
          },
          unit_ratio: { $concat: [`$nutrients.${nutrient}.Enhet`, "/", `$nutrients.${ratio}.Enhet`] },
          nutrient: `$nutrients.${nutrient}.Forkortning`,
          nutrient_value: `$nutrients.${nutrient}.Varde`,
          nutrient_unit: `$nutrients.${nutrient}.Enhet`,
          denominator: `$nutrients.${ratio}.Forkortning`,
          denominator_value: `$nutrients.${ratio}.Varde`,
          denominator_unit: `$nutrients.${ratio}.Enhet`,
        },
      },
      {
        $sort: { ratio: -1, nutrient_value: -1, denominator_value: 1 }
      },
    ]).limit(200)
  }
  console.log("finished aggregate")

  const results = await items

  res.json(results)

  //   .then((items) => {
  //     res.json(items);
  //   });
})



// ITEMS
app.get('/items', async (req, res) => {
  const { name, group, sort, nutrient, page = 1, limit = 20 } = req.query

  console.log("Start")
  console.time("get")

  console.log(req.query)
  const nameRegex = new RegExp(`\\b${name}\\b`, 'i')
  const groupRegex = new RegExp(`\\b${group}\\b`, 'i')

  console.log("1")
  console.timeLog("get")

  let databaseQuery = Item.find();
  let databaseQueryCount = Item.find();

  if (name) {
    databaseQuery.find({
      name: nameRegex
    });
    databaseQueryCount.find({
      name: nameRegex
    });
  }
  if (group) {
    databaseQuery.find({
      group: groupRegex
    });
    databaseQueryCount.find({
      group: groupRegex
    });
  }
  const sortQuery = (sort) => {
    if (sort === 'nutrient') return { [`nutrients.${nutrient}.Varde`]: -1 }
    return { [sort]: 1 }
  }
  databaseQuery.sort(sortQuery(sort));

  console.log("2")
  console.timeLog("get")

  const items = await databaseQuery.limit(+limit).skip(+limit * (page - 1))
  const results = await databaseQueryCount.countDocuments()

  const pages = Math.ceil(results / +limit)

  console.log("Results: ", results)
  console.log("3")
  console.timeLog("get")

  if (items.length > 0) {
    res.json({ page, pages, results, items })
  } else {
    res.status(400).json({ error: "No items found" })
  }
  console.log("Completed")
  console.timeEnd("get")

})


// ITEM ID
app.get('/items/:id', async (req, res) => {
  const { id } = req.params
  const itemFromId = await Item.findOne({ "number": id });

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
  res.status(201).json({ name: req.user.name, email: req.user.email, userId: req.user._id, savedItems: req.user.savedItems }); //response to frontend
})

app.post("/users/:id", authenticator)
app.post("/users/:id", async (req, res) => {
  const { id } = req.params
  const { itemNumber, price } = req.body
  console.log(itemNumber)
  try {
    const item = await Item.findOne({ number: itemNumber })

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { savedItems: { item, itemNumber, price } } },
      { useFindAndModify: false },
    )
    // .populate('savedItems') populate items
    res.status(201)
      .json(user.savedItems) // returns before incremented, I could not fix this.
  } catch (err) {
    res.status(400).json({ message: 'Could add item', error: err })
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
