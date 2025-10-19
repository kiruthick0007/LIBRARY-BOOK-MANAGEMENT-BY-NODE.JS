import Borrowing from '../models/Borrowing.js';
import Book from '../models/Book.js';
import User from '../models/User.js';

// @desc    Create new borrowing record
// @route   POST /api/borrowings
// @access  Private
export const createBorrowing = async (req, res) => {
  // Start a session for transaction
  const session = await Borrowing.startSession();
  session.startTransaction();
  
  try {
    const { bookId, dueDate, notes } = req.body;

    // Check if book exists and is available (with lock)
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availableCopies <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        message: 'Book is not available. All copies are currently borrowed.',
        availableCopies: book.availableCopies,
        totalCopies: book.totalCopies
      });
    }

    // Check if user already has this book borrowed
    const existingBorrowing = await Borrowing.findOne({
      book: bookId,
      user: req.user._id,
      status: { $in: ['borrowed', 'overdue'] }
    }).session(session);

    if (existingBorrowing) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        message: 'You have already borrowed this book. Please return it first.',
        existingBorrowing: {
          borrowDate: existingBorrowing.borrowDate,
          dueDate: existingBorrowing.dueDate,
          status: existingBorrowing.status
        }
      });
    }

    // Create borrowing record
    const borrowing = await Borrowing.create([{
      book: bookId,
      user: req.user._id,
      dueDate,
      notes
    }], { session });

    // Decrease available copies atomically
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { 
        $inc: { availableCopies: -1 },
        $set: { version: book.version + 1 }
      },
      { 
        new: true,
        session,
        runValidators: true
      }
    );

    // Verify the update was successful
    if (!updatedBook || updatedBook.availableCopies < 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ 
        message: 'Conflict: Book was borrowed by another user. Please try again.',
        conflict: true
      });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    const populatedBorrowing = await Borrowing.findById(borrowing[0]._id)
      .populate('book', 'title author isbn coverImage')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      borrowing: populatedBorrowing,
      bookStatus: {
        availableCopies: updatedBook.availableCopies,
        totalCopies: updatedBook.totalCopies
      }
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    // Handle version conflict
    if (error.name === 'VersionError') {
      return res.status(409).json({ 
        message: 'Conflict: This book was modified by another user. Please refresh and try again.',
        conflict: true
      });
    }
    
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : {}
    });
  }
};

// @desc    Get all borrowings
// @route   GET /api/borrowings
// @access  Private/Admin
export const getAllBorrowings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by user (for admin)
    if (req.query.userId) {
      query.user = req.query.userId;
    }

    const total = await Borrowing.countDocuments(query);
    const borrowings = await Borrowing.find(query)
      .populate('book', 'title author isbn coverImage')
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      borrowings,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's borrowings
// @route   GET /api/borrowings/my
// @access  Private
export const getMyBorrowings = async (req, res) => {
  try {
    const borrowings = await Borrowing.find({ user: req.user._id })
      .populate('book', 'title author isbn coverImage')
      .sort({ createdAt: -1 });

    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Return a book
// @route   PUT /api/borrowings/:id/return
// @access  Private
export const returnBook = async (req, res) => {
  const session = await Borrowing.startSession();
  session.startTransaction();
  
  try {
    const borrowing = await Borrowing.findById(req.params.id).session(session);

    if (!borrowing) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Borrowing record not found' });
    }

    // Check if user owns this borrowing or is admin
    if (borrowing.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: 'Not authorized to return this book' });
    }

    if (borrowing.status === 'returned') {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        message: 'Book has already been returned',
        returnDate: borrowing.returnDate
      });
    }

    // Calculate fine if overdue
    borrowing.calculateFine();
    borrowing.returnDate = Date.now();
    borrowing.status = 'returned';

    await borrowing.save({ session });

    // Increase available copies atomically
    const book = await Book.findById(borrowing.book).session(session);
    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Book not found' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      borrowing.book,
      { 
        $inc: { availableCopies: 1 },
        $set: { version: book.version + 1 }
      },
      { 
        new: true,
        session,
        runValidators: true
      }
    );

    // Verify available copies doesn't exceed total
    if (updatedBook.availableCopies > updatedBook.totalCopies) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ 
        message: 'Conflict: Invalid book state detected. Please contact administrator.',
        conflict: true
      });
    }

    await session.commitTransaction();
    session.endSession();

    const populatedBorrowing = await Borrowing.findById(borrowing._id)
      .populate('book', 'title author isbn coverImage')
      .populate('user', 'name email');

    res.json({
      success: true,
      message: borrowing.fine > 0 
        ? `Book returned successfully. Fine amount: $${borrowing.fine}` 
        : 'Book returned successfully',
      borrowing: populatedBorrowing,
      fine: borrowing.fine,
      bookStatus: {
        availableCopies: updatedBook.availableCopies,
        totalCopies: updatedBook.totalCopies
      }
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    if (error.name === 'VersionError') {
      return res.status(409).json({ 
        message: 'Conflict: Book state changed. Please refresh and try again.',
        conflict: true
      });
    }
    
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : {}
    });
  }
};

// @desc    Get borrowing statistics
// @route   GET /api/borrowings/stats/overview
// @access  Private/Admin
export const getBorrowingStats = async (req, res) => {
  try {
    const totalBorrowings = await Borrowing.countDocuments();
    const activeBorrowings = await Borrowing.countDocuments({ status: { $in: ['borrowed', 'overdue'] } });
    const overdueBorrowings = await Borrowing.countDocuments({ status: 'overdue' });
    
    const totalFines = await Borrowing.aggregate([
      { $group: { _id: null, total: { $sum: '$fine' } } }
    ]);

    res.json({
      totalBorrowings,
      activeBorrowings,
      overdueBorrowings,
      totalFines: totalFines[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
