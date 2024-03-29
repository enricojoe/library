import mongoose from "mongoose";
import { MemberSchema } from "./member.model.js";
const { Schema, model } = mongoose;

export const BookSchema = new Schema({
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
  borrowed_by: [{
    type: Schema.Types.ObjectId,
    ref: "Member"
  }]
});

const Book = model("Book", BookSchema);

export default Book;