const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the book

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorID: String
});

//  the model creates a collection called book which will contain objects with bookSchema structure
module.exports = mongoose.model('BOOK', bookSchema)

// we use our book model to intract with our book collection on mongodb