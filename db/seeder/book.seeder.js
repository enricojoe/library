import mongoose from "mongoose";
import Book from "../models/book.model.js";
import dotenv from 'dotenv'

dotenv.config()

const books = [
  {
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 1
  },
  {
      code: "SHR-1",
      title: "A Study in Scarlet",
      author: "Arthur Conan Doyle",
      stock: 1
  },
  {
      code: "TW-11",
      title: "Twilight",
      author: "Stephenie Meyer",
      stock: 1
  },
  {
      code: "HOB-83",
      title: "The Hobbit, or There and Back Again",
      author: "J.R.R. Tolkien",
      stock: 1
  },
  {
      code: "NRN-7",
      title: "The Lion, the Witch and the Wardrobe",
      author: "C.S. Lewis",
      stock: 1
  },
];

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
});

Promise.all(books.map(async (row) => {
  var data = new Book({
    code: row['code'],
    title: row['title'],
    author: row['author'],
    stock: row['stock']
  });

  await data.save();
})).then(() => {
  console.log("Berhasil");
  mongoose.disconnect();
}).catch((err) => console.log(err))