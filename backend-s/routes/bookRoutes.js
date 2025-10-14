import express from "express";
import { getBooks, addBook, updateBook, deleteBook } from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);  // Protect all book routes

router.get("/", getBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;