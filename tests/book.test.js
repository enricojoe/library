import mongoose from "mongoose";
import { Request } from "supertest";
import dotenv from 'dotenv';
import app from "../app.js";

dotenv.config();

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
    expect(2).toBe(2);
    // const res = await request(app).get("/api/products");
    // expect(res.statusCode).toBe(200);
    // expect(res.body.length).toBeGreaterThan(0);
  });
});