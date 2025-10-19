import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchBooks = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const { data } = await API.get('/books', {
          params: { search: query, limit: 5 }
        });
        setResults(data.books || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchBooks, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search books by title, author, or ISBN..."
          className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
        />
        <FaSearch className="absolute left-4 top-4 text-gray-400" />
        
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (query.length >= 2) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
          {loading ? (
            <div className="p-4 text-center text-gray-600">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-indigo-600 border-t-transparent"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((book) => (
                <button
                  key={book._id}
                  onClick={() => handleBookClick(book._id)}
                  className="w-full p-4 hover:bg-indigo-50 border-b border-gray-100 last:border-0 text-left transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 line-clamp-1">{book.title}</h4>
                      <p className="text-sm text-gray-600">by {book.author}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                          {book.category?.name || 'Uncategorized'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          book.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {book.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-600">
              <FaSearch className="mx-auto text-4xl text-gray-300 mb-2" />
              <p className="font-medium">No books found</p>
              <p className="text-sm text-gray-500 mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
