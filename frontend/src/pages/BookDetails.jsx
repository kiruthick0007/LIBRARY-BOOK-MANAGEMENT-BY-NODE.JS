import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft, FaBook, FaUser, FaCalendar, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import ConflictModal from '../components/ConflictModal';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictData, setConflictData] = useState({ message: '', details: null });

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const { data } = await API.get(`/books/${id}`);
      setBook(data);
      setLoading(false);

      // Set default due date (14 days from now)
      const defaultDueDate = new Date();
      defaultDueDate.setDate(defaultDueDate.getDate() + 14);
      setDueDate(defaultDueDate.toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error fetching book:', error);
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setBorrowing(true);
      await API.post('/borrowings', {
        bookId: book._id,
        dueDate
      });
      alert('Book borrowed successfully!');
      fetchBook(); // Refresh book data
    } catch (error) {
      // Handle conflict (409 status)
      if (error.response?.status === 409 || error.response?.data?.conflict) {
        setConflictData({
          message: error.response?.data?.message || 'Another user has modified this book. Please try again.',
          details: {
            'Book': book.title,
            'Action': 'Borrow Book',
            'Available Copies': book.availableCopies
          }
        });
        setShowConflictModal(true);
      } else {
        alert(error.response?.data?.message || 'Failed to borrow book');
      }
    } finally {
      setBorrowing(false);
    }
  };

  const handleRetryBorrow = async () => {
    setShowConflictModal(false);
    // Refresh book data first to get latest availability
    await fetchBook();
    // Wait a bit for state to update, then retry
    setTimeout(() => {
      handleBorrow();
    }, 500);
  };

  const handleCloseConflictModal = () => {
    setShowConflictModal(false);
    // Refresh book data to show current state
    fetchBook();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">Book not found</p>
        <Link to="/books" className="btn btn-primary mt-4">
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Conflict Modal */}
      <ConflictModal
        isOpen={showConflictModal}
        onClose={handleCloseConflictModal}
        onRetry={handleRetryBorrow}
        conflictMessage={conflictData.message}
        details={conflictData.details}
      />

    <div className="space-y-6">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-outline">
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Book Details */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Book Information */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 flex items-center">
              <FaUser className="mr-2" />
              by {book.author}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-primary text-white rounded-full">
              {book.category?.name || 'Uncategorized'}
            </span>
            <span className={`px-4 py-2 rounded-full ${book.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {book.availableCopies > 0 ? 'Available' : 'Not Available'}
            </span>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Book Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-2">
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Publisher:</strong> {book.publisher || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <FaCalendar className="mr-2" />
                  <strong>Published:</strong> {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">
                  <strong>Pages:</strong> {book.pages || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <FaGlobe className="mr-2" />
                  <strong>Language:</strong> {book.language}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <strong>Location:</strong> {book.shelfLocation || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {book.description || 'No description available.'}
            </p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Availability</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-primary">{book.totalCopies}</p>
                <p className="text-gray-600">Total Copies</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{book.availableCopies}</p>
                <p className="text-gray-600">Available Copies</p>
              </div>
            </div>
          </div>

          {/* Borrow Section */}
          {isAuthenticated && book.availableCopies > 0 && (
            <div className="card bg-blue-50">
              <h2 className="text-2xl font-bold mb-4">Borrow This Book</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Due Date (14 days default)</label>
                  <input
                    type="date"
                    className="input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <button
                  onClick={handleBorrow}
                  disabled={borrowing}
                  className="btn btn-primary w-full py-3 text-lg disabled:opacity-50"
                >
                  <FaBook className="mr-2" />
                  {borrowing ? 'Processing...' : 'Borrow Book'}
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="card bg-yellow-50">
              <p className="text-center text-gray-700">
                Please{' '}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  login
                </Link>{' '}
                to borrow this book.
              </p>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex space-x-4">
              <Link to={`/admin/books/edit/${book._id}`} className="btn btn-secondary flex-1">
                Edit Book
              </Link>
              <button className="btn btn-danger flex-1">
                Delete Book
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default BookDetails;
