const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const BookSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  borrowed_by: [{ type: String }]
});

const Book = model("Book", BookSchema);

module.exports = Book;