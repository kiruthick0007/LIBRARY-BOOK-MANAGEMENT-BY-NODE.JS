import Book from '../models/Book.js';
import Category from '../models/Category.js';

// @desc    Get all books with search, filter, and pagination
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Search by title, author, or ISBN
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { author: { $regex: req.query.search, $options: 'i' } },
        { isbn: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by availability
    if (req.query.available === 'true') {
      query.availableCopies = { $gt: 0 };
    }

    // Filter by language
    if (req.query.language) {
      query.language = req.query.language;
    }

    // Only show active books
    query.isActive = true;

    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
      .populate('category', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      books,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category', 'name description');

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      publisher,
      publishedDate,
      pages,
      language,
      description,
      coverImage,
      totalCopies,
      shelfLocation
    } = req.body;

    // Check if ISBN already exists
    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      publisher,
      publishedDate,
      pages,
      language,
      description,
      coverImage,
      totalCopies,
      availableCopies: totalCopies,
      shelfLocation
    });

    const createdBook = await Book.findById(book._id).populate('category', 'name');
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req, res) => {
  const session = await Book.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(req.params.id).session(session);

    if (!book) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Book not found' });
    }

    // Store the current version for conflict detection
    const currentVersion = book.__v;

    // Update fields
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.isbn = req.body.isbn || book.isbn;
    book.category = req.body.category || book.category;
    book.publisher = req.body.publisher || book.publisher;
    book.publishedDate = req.body.publishedDate || book.publishedDate;
    book.pages = req.body.pages || book.pages;
    book.language = req.body.language || book.language;
    book.description = req.body.description || book.description;
    book.coverImage = req.body.coverImage || book.coverImage;
    book.shelfLocation = req.body.shelfLocation || book.shelfLocation;

    // Handle total copies update carefully to maintain data integrity
    if (req.body.totalCopies !== undefined) {
      const currentBorrowed = book.totalCopies - book.availableCopies;
      
      if (req.body.totalCopies < currentBorrowed) {
        await session.abortTransaction();
        return res.status(400).json({ 
          message: `Cannot reduce total copies below ${currentBorrowed} (currently borrowed)`,
          conflict: true
        });
      }
      
      const difference = req.body.totalCopies - book.totalCopies;
      book.totalCopies = req.body.totalCopies;
      book.availableCopies += difference;
    }

    // Save with version check
    const updatedBook = await book.save({ session });
    
    // Commit the transaction
    await session.commitTransaction();
    
    const populatedBook = await Book.findById(updatedBook._id).populate('category', 'name');
    res.json(populatedBook);
  } catch (error) {
    await session.abortTransaction();
    
    // Handle version conflicts (optimistic locking)
    if (error.name === 'VersionError' || error.message.includes('version')) {
      return res.status(409).json({ 
        message: 'Conflict: This book was modified by another user. Please refresh and try again.',
        conflict: true
      });
    }
    
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      // Soft delete - just mark as inactive
      book.isActive = false;
      await book.save();
      res.json({ message: 'Book removed' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get book statistics
// @route   GET /api/books/stats/overview
// @access  Private/Admin
export const getBookStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({ isActive: true });
    const totalCopies = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: '$totalCopies' } } }
    ]);
    const availableCopies = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: '$availableCopies' } } }
    ]);

    const booksByCategory = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { name: '$category.name', count: 1 } }
    ]);

    res.json({
      totalBooks,
      totalCopies: totalCopies[0]?.total || 0,
      availableCopies: availableCopies[0]?.total || 0,
      borrowedCopies: (totalCopies[0]?.total || 0) - (availableCopies[0]?.total || 0),
      booksByCategory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
