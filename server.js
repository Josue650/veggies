require('dotenv').config()
// Require modules
const fs = require('fs') // this engine requires the fs module like we did Saturday
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Veggie = require('./models/veggie')
const {veggies} = require('./models/veggie')

// Create our express app
const app = express()

// Configure the app (app.set)
/*Start Config */
app.use(express.urlencoded({ extended: true }))// This code makes us have req.body
app.engine('jsx',require ( 'jsx-view-engine' ).createEngine())
app.set( 'view engine', 'jsx' ) // register the jsx view engine
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB Atlas')
})
/* END CONFIG */

// Mount our middleware (app.use)

/*Start Middleware */

app.use(methodOverride('_method'))

/* END Middleware */

// Mount Routes
/*Start Routes */

// INDEX --- READ --- GET
app.get('/veggies', (req, res) => {
    Veggie.find({}, (err, foundVeggies) => {
        if(err){
          console.error(err)
          res.status(400).send(err)
        } else {
          res.render('veggies/Index', {
            veggies: foundVeggies
          })
        }
      })
    })


// NEW (Not applicable in an api)
app.get('/veggies/new', (req, res) => {
    res.render('veggies/New')
  })
  // DELETE

  app.delete('/veggies/:id', (req, res) => {
    Veggie.findByIdAndDelete(req.params.id, (err, deletedVeggie) => {
      if(err){
      console.error(err)
      res.status(400).send(err)
      } else {
        res.redirect('/veggies')
      }
    })
  })

  // UPDATE
  app.put('/veggies/:id', (req, res) => {
    req.body.readyToEat === 'on' || req.body.readyToEat === true ?req.body.readyToEat = true :req.body.readyToEat = false
    Veggie.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedVeggies) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.redirect(`/veggies/${updatedVeggie._id}`)
      }
    })
  })

  // CREATE
  app.post('/veggies', (req, res) =>{
    // req.body which contains all of our form Data we will get from the user
    req.body.readyToEat === 'on' ? req.body.readyToEat = true : req.body.readyToEat = false
    Veggie.create(req.body, (err, createdVeggie) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.redirect('/veggies')

      }
    })
  })

  // EDIT (not applicable in an api)

  app.get('/veggies/:id/edit', (req,res) => {
    Veggie.findById(req.params.id, (err, foundVeggie) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.render('veggies/Edit', {
          veggie: foundVeggie
        })
      }
    })
  })

  // SHOW ---- READ ---- GET
  app.get('/veggies/:id', (req,res) => {
    Veggie.findById(req.params.id, (err, foundVeggie) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.render('veggies/Show', {
          veggie: foundVeggie
        })
      }
    })
  })

/* END ROUTES */


// Tell the app to listen on a port
app.listen(3003, () => {
    console.log('Listening on Port 3003')
})
