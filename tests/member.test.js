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

describe("GET /members/", () => {
  it("should return all member", async () => {
    const res = await request(app).get("/members/");
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(3);
  });
});

// first borrow
describe("PATCH /members/borrowBook", () => {
  it("should add book to member's borrowed book property", async () => {
    const payload = {
      member_code: "M001",
      book_code: "HOB-83"
    }
    const res = await request(app).patch("/members/borrowBook")
                                  .send(payload)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json');
    
    var expected_date = new Date();
    expected_date.setHours(0,0,0,0);
    expected_date.setDate(expected_date.getDate() + 7);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Angga");
    expect(res.body.data.borrowed_book.length).toBe(1);
    expect(res.body.data.borrowed_book[0].return_date).toBe(expected_date.toISOString());
    expect(res.body.message).toBe("Book borrowed")
  });
});

// second borrow
describe("PATCH /members/borrowBook", () => {
  it("should add second book to member's borrowed book property", async () => {
    const payload = {
      member_code: "M001",
      book_code: "NRN-7"
    }
    const res = await request(app).patch("/members/borrowBook")
                                  .send(payload)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json');
    
    var expected_date = new Date();
    expected_date.setHours(0,0,0,0);
    expected_date.setDate(expected_date.getDate() + 7);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Angga");
    expect(res.body.data.borrowed_book.length).toBe(2);
    expect(res.body.data.borrowed_book[1].return_date).toBe(expected_date.toISOString());
  });
});

// third borrow
describe("PATCH /members/borrowBook", () => {
  it("should add third book to member's borrowed book property", async () => {
    const payload = {
      member_code: "M001",
      book_code: "TW-11"
    }
    const res = await request(app).patch("/members/borrowBook")
                                  .send(payload)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json');

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("You can't borrow book more than 2");
  });
});

// other member try to borrow book that have been lent
describe("PATCH /members/borrowBook", () => {
  it("should try borrow book that have been lent", async () => {
    const payload = {
      member_code: "M002",
      book_code: "NRN-7"
    }
    const res = await request(app).patch("/members/borrowBook")
                                  .send(payload)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json');
    
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Book stock is 0");
  });
});

// try to borrow with wrong member code
describe("PATCH /members/borrowBook", () => {
  it("should try to borrow with wrong member code", async () => {
    const payload = {
      member_code: "A002",
      book_code: "SHR-1"
    }
    const res = await request(app).patch("/members/borrowBook")
                                  .send(payload)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json');
    
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Member not found");
  });
});

// try to borrow with wrong book code
describe("PATCH /members/borrowBook", () => {
  it("should try to borrow with wrong book code", async () => {
    const payload = {
      member_code: "M002",
      book_code: "SSS-1"
    }
    const res = await request(app).patch("/members/borrowBook")
                                  .send(payload)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json');
    
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Book not found");
  });
});

// return first book
describe("PATCH /members/returnBook", () => {
  it("should remove book to member's borrowed book property", async () => {
    const payload = {
      member_code: "M001",
      book_code: "HOB-83"
    }
    const res = await request(app).patch("/members/returnBook")
                                  .send(payload)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json');
    
    var expected_date = new Date();
    expected_date.setHours(0,0,0,0);
    expected_date.setDate(expected_date.getDate() + 7);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Angga");
    expect(res.body.data.borrowed_book.length).toBe(1);
  });
});

// return second book
describe("PATCH /members/returnBook", () => {
  it("should remove second book to member's borrowed book property", async () => {
    const payload = {
      member_code: "M001",
      book_code: "NRN-7"
    }
    const res = await request(app).patch("/members/returnBook")
                                  .send(payload)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json');
    
    var expected_date = new Date();
    expected_date.setHours(0,0,0,0);
    expected_date.setDate(expected_date.getDate() + 7);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Angga");
    expect(res.body.data.borrowed_book.length).toBe(0);
  });
});