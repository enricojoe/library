import { Router } from "express";
import { getBooks } from '../handlers/book.handler.js';

const books_router = Router();

books_router.get('/', getBooks);

export default books_router;