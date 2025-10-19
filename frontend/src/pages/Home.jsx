import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaSearch, FaUserPlus, FaChartLine } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-4 text-shadow animate-slideIn">
            Welcome to Library Management System
          </h1>
          <p className="text-2xl mb-8 animate-slideIn" style={{animationDelay: '0.2s'}}>
            {isAuthenticated 
              ? `Hello, ${user.name}! Discover and borrow your favorite books.`
              : 'Your gateway to knowledge and learning'}
          </p>
          <div className="flex justify-center space-x-4 animate-slideIn" style={{animationDelay: '0.4s'}}>
            <Link to="/books" className="btn bg-white text-indigo-600 hover:bg-opacity-90 px-8 py-4 text-lg font-bold shadow-xl">
              📚 Browse Books
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg font-bold">
                🚀 Join Now
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="card text-center hover-lift bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-100">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 box-glow">
            <FaBook className="text-4xl text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3 gradient-text">Vast Collection</h3>
          <p className="text-gray-600 leading-relaxed">
            Access thousands of books across multiple categories
          </p>
        </div>

        <div className="card text-center hover-lift bg-gradient-to-br from-white to-green-50 border-2 border-green-100">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 box-glow">
            <FaSearch className="text-4xl text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3 gradient-text">Easy Search</h3>
          <p className="text-gray-600 leading-relaxed">
            Find books quickly with our advanced search and filter options
          </p>
        </div>

        <div className="card text-center hover-lift bg-gradient-to-br from-white to-purple-50 border-2 border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 box-glow">
            <FaUserPlus className="text-4xl text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3 gradient-text">Simple Borrowing</h3>
          <p className="text-gray-600 leading-relaxed">
            Borrow books easily and track your reading history
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Library Statistics</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-primary">5000+</div>
            <div className="text-gray-600 mt-2">Books Available</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-secondary">1200+</div>
            <div className="text-gray-600 mt-2">Active Members</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600 mt-2">Categories</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500">98%</div>
            <div className="text-gray-600 mt-2">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-primary text-white rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Reading?</h2>
          <p className="text-lg mb-6">Join our community and get access to our entire collection</p>
          <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">
            Create Free Account
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;
