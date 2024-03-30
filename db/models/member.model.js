const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MemberSchema = new Schema({
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
    book: { type: String },
    return_date: { type: Date }
  }]
});

const Member = model("Member", MemberSchema);

module.exports = Member;