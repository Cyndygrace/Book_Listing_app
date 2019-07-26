const mongoose = require('mongoose');
const Schema = mongoose.Schema


const authorSchema = new Schema({
  name: String,
  age : Number
})

module.exports = mongoose.model('AUTHOR', authorSchema)
// we use our author model to interact with our author collection on mongo db
