import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 animate-fadeIn">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-200 rounded-full translate-x-20 translate-y-20 opacity-50"></div>
        
        <div className="relative z-10">
          <div className="text-9xl font-extrabold gradient-text mb-4 animate-pulse">
            404
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.
          </p>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center justify-center">
              <FaSearch className="mr-2 text-indigo-600" />
              Helpful Links
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/" className="bg-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaHome className="text-3xl text-indigo-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Home</p>
              </Link>
              
              <Link to="/books" className="bg-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <FaBook className="text-3xl text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Browse Books</p>
              </Link>
              
              <Link to="/login" className="bg-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <svg className="w-8 h-8 text-pink-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <p className="font-semibold text-gray-800">Login</p>
              </Link>
            </div>
          </div>
          
          <Link to="/" className="btn btn-primary px-8 py-3 inline-flex items-center space-x-2">
            <FaHome />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
