import mongoose from "mongoose";
import { BookSchema } from "./book.model.js";
const { Schema, model } = mongoose;

export const MemberSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  penalize_date: {
    type: Date
  },
  borrowed_book: [{
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book"
    },
    return_date: {
      type: Date
    }
  }]
});

const Member = model("Member", MemberSchema);

export default Member;