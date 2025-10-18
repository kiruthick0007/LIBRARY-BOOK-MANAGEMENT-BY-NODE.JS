import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookStats
} from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBooks).post(protect, admin, createBook);
router.get('/stats/overview', protect, admin, getBookStats);
router.route('/:id').get(getBookById).put(protect, admin, updateBook).delete(protect, admin, deleteBook);

export default router;
