import mongoose from "mongoose";
import Member from "../models/member.model.js";
import dotenv from 'dotenv'

dotenv.config()

const members = [
  {
      code: "M001",
      name: "Angga",
  },
  {
      code: "M002",
      name: "Ferry",
  },
  {
      code: "M003",
      name: "Putri",
  },
];

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
});

Promise.all(members.map(async (row) => {
  var data = new Member({
    code: row['code'],
    name: row['name']
  });

  await data.save();
})).then(() => {
  console.log("Berhasil");
  mongoose.disconnect();
}).catch((err) => console.log(err))