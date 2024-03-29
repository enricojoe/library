import { Router } from "express";
import { getMembers, borrowBook, returnBook } from "../handlers/member.handler.js";

const members_router = Router();

members_router.get('/', getMembers);
members_router.patch('/borrowBook', borrowBook);
members_router.patch('/returnBook', returnBook);

export default members_router;