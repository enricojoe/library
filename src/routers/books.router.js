import { Router } from "express";
import { helloWorld } from '../handlers/books.js';

const books_router = Router();

books_router.get('/', helloWorld);

export default books_router;