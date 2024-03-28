import mongoose from "mongoose";
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
});

const Book = model("Book", BookSchema);

export default Book;