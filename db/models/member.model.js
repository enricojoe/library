import mongoose from "mongoose";
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
  }
});

const Member = model("Member", MemberSchema);

export default Member;