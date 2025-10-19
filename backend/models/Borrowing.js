import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Please provide a book']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user']
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date']
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'],
    default: 'borrowed'
  },
  fine: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Calculate fine for overdue books
borrowingSchema.methods.calculateFine = function() {
  if (this.status === 'borrowed' && new Date() > this.dueDate) {
    const daysOverdue = Math.ceil((new Date() - this.dueDate) / (1000 * 60 * 60 * 24));
    this.fine = daysOverdue * 1; // $1 per day
    this.status = 'overdue';
  }
  return this.fine;
};

const Borrowing = mongoose.model('Borrowing', borrowingSchema);

export default Borrowing;
