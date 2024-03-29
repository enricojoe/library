import { Router } from "express";
import books_router from "./books.router.js"
import members_router from "./members.router.js"

const router = Router()
router.use("/books", books_router)
router.use("/members", members_router)

export default router