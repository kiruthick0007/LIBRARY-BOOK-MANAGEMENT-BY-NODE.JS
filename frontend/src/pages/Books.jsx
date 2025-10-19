import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { FaSearch, FaFilter, FaBookOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, [search, selectedCategory, selectedLanguage, availableOnly, currentPage]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        ...(search && { search }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedLanguage && { language: selectedLanguage }),
        ...(availableOnly && { available: 'true' })
      };

      const { data } = await API.get('/books', { params });
      setBooks(data.books);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setCurrentPage(1);
  };

  const handleAvailableChange = (e) => {
    setAvailableOnly(e.target.checked);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedLanguage('');
    setAvailableOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
        <div>
          <h1 className="text-4xl font-bold text-shadow mb-2">📚 Browse Our Collection</h1>
          <p className="text-indigo-100">Discover your next favorite book from our extensive library</p>
        </div>
        {isAdmin && (
          <Link to="/admin/books/add" className="btn bg-white text-indigo-600 hover:bg-opacity-90 shadow-lg">
            <span className="text-xl mr-2">+</span> Add New Book
          </Link>
        )}
      </div>

      {/* Search and Filter Section */}
      <div className="card bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-100">
        <div className="flex items-center mb-4">
          <FaFilter className="text-2xl text-indigo-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-800">Search & Filter</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="label">
              <FaSearch className="inline mr-2" />
              Search Books
            </label>
            <input
              type="text"
              className="input"
              placeholder="Search by title, author, or ISBN..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="label">
              <FaFilter className="inline mr-2" />
              Category
            </label>
            <select
              className="input"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="label">Language</label>
            <select
              className="input"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="">All Languages</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>

          {/* Available Only */}
          <div className="flex flex-col justify-end">
            <label className="flex items-center space-x-2 cursor-pointer bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={handleAvailableChange}
                className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <span className="text-sm font-semibold text-green-800">Available Only</span>
            </label>
            <button
              onClick={resetFilters}
              className="mt-2 text-sm text-indigo-600 hover:text-purple-600 font-semibold transition-colors duration-300 hover:underline"
            >
              ✨ Reset All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <Loading message="Loading books..." />
      ) : books.length === 0 ? (
        <div className="card text-center py-16">
          <FaBookOpen className="mx-auto text-8xl text-gray-300 mb-6" />
          <p className="text-2xl text-gray-500 font-semibold mb-2">No books found</p>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          <button onClick={resetFilters} className="btn btn-primary mt-6">
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                className="card hover-lift group relative overflow-hidden border-2 border-transparent hover:border-indigo-200"
              >
                <div className="absolute top-2 right-2 z-10">
                  <span className={`badge ${book.availableCopies > 0 ? 'badge-success' : 'badge-danger'}`}>
                    {book.availableCopies > 0 ? '✓ Available' : '✘ Out of Stock'}
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-xl mb-4 group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2 flex items-center">
                  <span className="mr-2">🖊️</span> {book.author}
                </p>
                <div className="flex items-center justify-between">
                  <span className="badge badge-primary text-xs">
                    {book.category?.name || 'Uncategorized'}
                  </span>
                  <span className="text-xs text-gray-500">ISBN: {book.isbn.slice(-4)}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">📚 Copies:</span>
                    <span className="font-bold text-indigo-600">{book.availableCopies} / {book.totalCopies}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-outline disabled:opacity-50"
              >
                <FaChevronLeft className="mr-2" />
                Previous
              </button>

              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn btn-outline disabled:opacity-50"
              >
                Next
                <FaChevronRight className="ml-2" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Books;
