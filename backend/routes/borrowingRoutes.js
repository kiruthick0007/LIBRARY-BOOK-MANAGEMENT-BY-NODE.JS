import express from 'express';
import {
  createBorrowing,
  getAllBorrowings,
  getMyBorrowings,
  returnBook,
  getBorrowingStats
} from '../controllers/borrowingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createBorrowing).get(protect, admin, getAllBorrowings);
router.get('/my', protect, getMyBorrowings);
router.put('/:id/return', protect, returnBook);
router.get('/stats/overview', protect, admin, getBorrowingStats);

export default router;
