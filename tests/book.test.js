const mongoose = require('mongoose');
const request = require("supertest");
const app = require("../app.js");
require("dotenv").config();

beforeEach(async () => {
  const mongoString = process.env.DATABASE_URL;
  await mongoose.connect(mongoString);
  mongoose.connection.on('error', (error) => {
    console.log(error)
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /books/", () => {
  it("should return all book", async () => {
    const res = await request(app).get("/books/");
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(5);
  });
});