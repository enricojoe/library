const express = require('express');
const Router = express.Router;
const books_router = require('./books.router.js');
const members_router = require('./members.router.js');

const router = Router()
router.use("/books", books_router)
router.use("/members", members_router)

module.exports = router;