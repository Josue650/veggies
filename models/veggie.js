const mongoose = require('mongoose')

// Make a schema
const veggieSchema = new mongoose.Schema({
    name: { type: String, required: true},
    color: { type: String, required: true},
    readyToEat: Boolean
})


// Make a model from the schema
const Veggie = mongoose.model('Veggie', veggieSchema)

// Export the Model for use in the App

module.exports = Veggie
