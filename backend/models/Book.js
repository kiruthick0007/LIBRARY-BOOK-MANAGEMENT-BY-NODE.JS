import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a book title'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Please provide author name'],
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'Please provide ISBN'],
    unique: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide a category']
  },
  publisher: {
    type: String,
    trim: true
  },
  publishedDate: {
    type: Date
  },
  pages: {
    type: Number
  },
  language: {
    type: String,
    default: 'English'
  },
  description: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=No+Cover'
  },
  totalCopies: {
    type: Number,
    required: [true, 'Please provide total copies'],
    min: 0,
    default: 1
  },
  availableCopies: {
    type: Number,
    required: [true, 'Please provide available copies'],
    min: 0,
    default: 1
  },
  shelfLocation: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  version: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  optimisticConcurrency: true
});

// Index for search functionality
bookSchema.index({ title: 'text', author: 'text', isbn: 'text' });

const Book = mongoose.model('Book', bookSchema);

export default Book;
