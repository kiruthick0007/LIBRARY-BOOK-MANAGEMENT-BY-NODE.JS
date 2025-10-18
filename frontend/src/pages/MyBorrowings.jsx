import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { FaBook, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import ConflictModal from '../components/ConflictModal';

const MyBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictData, setConflictData] = useState({ message: '', details: null, borrowingId: null });

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = async () => {
    try {
      const { data } = await API.get('/borrowings/my');
      setBorrowings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching borrowings:', error);
      setLoading(false);
    }
  };

  const handleReturn = async (borrowingId) => {
    if (!window.confirm('Are you sure you want to return this book?')) {
      return;
    }

    try {
      await API.put(`/borrowings/${borrowingId}/return`);
      alert('Book returned successfully!');
      fetchBorrowings();
    } catch (error) {
      // Handle conflict (409 status)
      if (error.response?.status === 409 || error.response?.data?.conflict) {
        const borrowing = borrowings.find(b => b._id === borrowingId);
        setConflictData({
          message: error.response?.data?.message || 'Another user has modified this borrowing. Please try again.',
          details: {
            'Book': borrowing?.book?.title || 'Unknown',
            'Action': 'Return Book',
            'Status': borrowing?.status || 'Unknown'
          },
          borrowingId
        });
        setShowConflictModal(true);
      } else {
        alert(error.response?.data?.message || 'Failed to return book');
      }
    }
  };

  const handleRetryReturn = async () => {
    setShowConflictModal(false);
    // Refresh borrowings data first
    await fetchBorrowings();
    // Wait a bit for state to update, then retry
    setTimeout(() => {
      if (conflictData.borrowingId) {
        handleReturn(conflictData.borrowingId);
      }
    }, 500);
  };

  const handleCloseConflictModal = () => {
    setShowConflictModal(false);
    // Refresh borrowings data to show current state
    fetchBorrowings();
  };

  const getStatusBadge = (status) => {
    const badges = {
      borrowed: 'bg-blue-100 text-blue-800',
      returned: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {/* Conflict Modal */}
      <ConflictModal
        isOpen={showConflictModal}
        onClose={handleCloseConflictModal}
        onRetry={handleRetryReturn}
        conflictMessage={conflictData.message}
        details={conflictData.details}
      />

    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Borrowed Books</h1>

      {borrowings.length === 0 ? (
        <div className="card text-center py-12">
          <FaBook className="mx-auto text-6xl text-gray-300 mb-4" />
          <p className="text-xl text-gray-500 mb-4">You haven't borrowed any books yet</p>
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {borrowings.map((borrowing) => (
            <div key={borrowing._id} className="card hover:shadow-xl transition">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Book Image */}
                <div className="md:col-span-1">
                  <img
                    src={borrowing.book.coverImage}
                    alt={borrowing.book.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Book Details */}
                <div className="md:col-span-2 space-y-3">
                  <Link
                    to={`/books/${borrowing.book._id}`}
                    className="text-2xl font-bold text-gray-800 hover:text-primary"
                  >
                    {borrowing.book.title}
                  </Link>
                  <p className="text-gray-600">by {borrowing.book.author}</p>
                  <p className="text-sm text-gray-500">ISBN: {borrowing.book.isbn}</p>

                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(borrowing.status)}`}>
                      {borrowing.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">
                        <strong>Borrowed:</strong> {new Date(borrowing.borrowDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        <strong>Due Date:</strong> {new Date(borrowing.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      {borrowing.returnDate && (
                        <p className="text-gray-600">
                          <strong>Returned:</strong> {new Date(borrowing.returnDate).toLocaleDateString()}
                        </p>
                      )}
                      {borrowing.fine > 0 && (
                        <p className="text-red-600 font-semibold">
                          <strong>Fine:</strong> ${borrowing.fine}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex flex-col justify-center space-y-3">
                  {borrowing.status !== 'returned' && (
                    <button
                      onClick={() => handleReturn(borrowing._id)}
                      className="btn btn-secondary"
                    >
                      <FaCheckCircle className="mr-2" />
                      Return Book
                    </button>
                  )}

                  {borrowing.status === 'overdue' && (
                    <div className="flex items-center text-red-600 text-sm">
                      <FaExclamationCircle className="mr-2" />
                      Overdue
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default MyBorrowings;
