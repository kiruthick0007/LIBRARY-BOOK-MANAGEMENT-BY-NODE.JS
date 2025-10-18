import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaUser, FaSignOutAlt, FaHome, FaBookOpen, FaUsers, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Prevent multiple logout attempts (conflict prevention)
  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent concurrent logout attempts
    
    try {
      setIsLoggingOut(true);
      await logout();
      // Small delay to prevent race conditions with navigation
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show skeleton loader during initial auth check
  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 min-h-[4rem]">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="bg-white bg-opacity-20 p-2 rounded-xl backdrop-blur-sm animate-pulse flex items-center justify-center">
                <FaBook className="text-2xl w-6 h-6" />
              </div>
              <span className="text-xl font-bold hidden sm:inline">Library System</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="h-8 w-16 sm:w-20 bg-white bg-opacity-20 rounded animate-pulse"></div>
              <div className="h-8 w-16 sm:w-20 bg-white bg-opacity-20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-[4rem]">
          <Link to="/" className="flex items-center space-x-3 text-xl font-bold transform hover:scale-105 transition-all duration-300 ease-in-out flex-shrink-0">
            <div className="bg-white bg-opacity-20 p-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 flex items-center justify-center">
              <FaBook className="text-2xl w-6 h-6" />
            </div>
            <span className="text-shadow hidden sm:inline">Library System</span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transform hover:bg-white hover:bg-opacity-20 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out group">
              <FaHome className="transition-transform duration-300 group-hover:rotate-12 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base hidden sm:inline">Home</span>
            </Link>

            <Link to="/books" className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transform hover:bg-white hover:bg-opacity-20 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out group">
              <FaBookOpen className="transition-transform duration-300 group-hover:rotate-12 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base hidden sm:inline">Books</span>
            </Link>

            {user && (
              <Link to="/my-borrowings" className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transform hover:bg-white hover:bg-opacity-20 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out group">
                <FaBook className="transition-transform duration-300 group-hover:rotate-12 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base hidden sm:inline">My Books</span>
              </Link>
            )}

            {isAdmin && (
              <Link to="/admin" className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg bg-white bg-opacity-20 transform hover:bg-opacity-30 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out backdrop-blur-sm group">
                <FaTachometerAlt className="transition-transform duration-300 group-hover:rotate-12 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base hidden md:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                <Link to="/profile" className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg bg-white bg-opacity-10 transform hover:bg-opacity-20 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out backdrop-blur-sm group">
                  <div className="bg-white bg-opacity-30 p-1.5 rounded-full transition-all duration-300 group-hover:bg-opacity-50 group-hover:rotate-12 flex items-center justify-center">
                    <FaUser className="text-sm w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="font-medium text-sm sm:text-base hidden lg:inline truncate max-w-[100px]">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg border-2 border-white border-opacity-30 transform hover:bg-white hover:bg-opacity-20 hover:scale-105 hover:shadow-lg hover:border-opacity-50 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group"
                >
                  <FaSignOutAlt className={`${isLoggingOut ? 'animate-spin' : 'transition-transform duration-300 group-hover:-rotate-12'} w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0`} />
                  <span className="font-medium text-sm sm:text-base hidden sm:inline">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-4 sm:px-6 py-2 bg-white text-indigo-600 rounded-lg font-bold transform hover:scale-110 hover:shadow-2xl transition-all duration-300 ease-in-out shadow-lg hover:brightness-95 text-sm sm:text-base whitespace-nowrap">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
