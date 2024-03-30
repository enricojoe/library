/**
 * @swagger
 * tags:
 *   name: Members
 *   description: The member borrowing book managing API
 * /members:
 *   get:
 *     summary: Lists all the registered member
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: The list of the registered members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 * /members/borrowBook:
 *   patch:
 *     summary: Add book to member's borrowed book property
 *     tags: [Members]
 *     operationId: borrowBook
 *     requestBody:
 *       required: true
 *       description: The book code that want to borrow and member code
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - book_code
 *               - member_code
 *             type: object
 *             properties:
 *               book_code:
 *                 type: string
 *                 example: HOB-83
 *               member_code:
 *                 type: string
 *                 example: M001
 *     responses:
 *       200:
 *         description: The borrowed book data added to members borrowed_book property
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               data:
 *                 $ref: '#/components/schemas/Member'
 *               message:
 *                 type: string
 *       404:
 *         description: The book or the member was not found
 * /members/returnBook:
 *   patch:
 *     summary: Remove borrowed book from member's borrowed book property
 *     tags: [Members]
 *     operationId: returnBook
 *     requestBody:
 *       required: true
 *       description: The book code that want to return and member code
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - book_code
 *               - member_code
 *             type: object
 *             properties:
 *               book_code:
 *                 type: string
 *                 example: HOB-83
 *               member_code:
 *                 type: string
 *                 example: M001
 *     responses:
 *       200:
 *         description: The borrowed book data removed from members borrowed_book property
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               data:
 *                 $ref: '#/components/schemas/Member'
 *               message:
 *                 type: string
 *       404:
 *         description: The book or the member was not found
 * 
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           example: 6607000e4043510ddcdb9450
 *           description: The auto-generated id of the book
 *         code:
 *           type: string
 *           example: HOB-83
 *           description: Self-made code for the member
 *         penalize_date:
 *           type: string
 *           format: date-time
 *           example: 2024-03-29T17:32:28Z
 *           description: Date and time if the member is being penalize
 *         borrowed_book:
 *           type: object
 *           properties:
 *             book:
 *               type: string
 *               description: Borrowed book code
 *             return_date:
 *               type: string
 *               format: date-time
 *               description: Datetime for return deadline
 *           description: Array of borrowed book
 *           example: [{book: HOB-83, return_date: 2024-04-07T10:32:28Z}]
 */

const express = require('express');
const Router = express.Router;

const { getMembers, borrowBook, returnBook } = require("../handlers/member.handler.js");

const members_router = Router();

members_router.get('/', getMembers);
members_router.patch('/borrowBook', borrowBook);
members_router.patch('/returnBook', returnBook);

module.exports = members_router;