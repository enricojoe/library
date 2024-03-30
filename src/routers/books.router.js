/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *     summary: Lists all the books and its quantities
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of available books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - code
 *         - title
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book
 *         code:
 *           type: string
 *           description: Self-made code for the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The book author
 *         stock:
 *           type: number
 *           description: The book stock's left
 *         borrowed_by:
 *           type: array
 *           items: 
 *             type: string
 *           description: Member code whom borrowed the book
 *       example:
 *         _id: 6607000e4043510ddcdb9450
 *         code: HOB-83
 *         title: The Hobbit, or There and Back Again
 *         author: J.R.R. Tolkien
 *         stock: 1
 *         borrowed_by: [M001]
 */

const express = require('express');
const Router = express.Router;
const bookHandler = require('../handlers/book.handler.js');
const getBooks = bookHandler.getBooks;

const books_router = Router();

books_router.get('/', getBooks);

module.exports = books_router;