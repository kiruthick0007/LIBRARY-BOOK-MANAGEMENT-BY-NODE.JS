import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { FaBook, FaUsers, FaHandHoldingUsd, FaExclamationTriangle, FaChartLine, FaPlus, FaCog } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import Loading from '../../components/Loading';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    books: {},
    users: {},
    borrowings: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [booksRes, usersRes, borrowingsRes] = await Promise.all([
        API.get('/books/stats/overview'),
        API.get('/users/stats/overview'),
        API.get('/borrowings/stats/overview')
      ]);

      setStats({
        books: booksRes.data,
        users: usersRes.data,
        borrowings: borrowingsRes.data
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading dashboard data..." />;  
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-shadow mb-2">📊 Admin Dashboard</h1>
            <p className="text-indigo-100">Welcome back! Here's your library overview</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/admin/books/add" className="btn bg-white text-indigo-600 hover:bg-opacity-90 shadow-lg flex items-center space-x-2">
              <FaPlus />
              <span>Add Book</span>
            </Link>
            <button className="btn bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm flex items-center space-x-2">
              <FaCog />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={stats.books.totalBooks || 0}
          icon={FaBook}
          color="indigo"
          trend="up"
          trendValue="12"
          subtitle="+24 this month"
        />

        <StatCard
          title="Active Users"
          value={stats.users.activeUsers || 0}
          icon={FaUsers}
          color="green"
          trend="up"
          trendValue="8"
          subtitle="+15 new members"
        />

        <StatCard
          title="Active Loans"
          value={stats.borrowings.activeBorrowings || 0}
          icon={FaChartLine}
          color="purple"
          trend="down"
          trendValue="5"
          subtitle="From last week"
        />

        <StatCard
          title="Overdue"
          value={stats.borrowings.overdueBorrowings || 0}
          icon={FaExclamationTriangle}
          color="red"
          trend={stats.borrowings.overdueBorrowings > 5 ? 'up' : 'down'}
          trendValue="3"
          subtitle="Needs attention"
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Book Statistics */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaBook className="mr-2 text-primary" />
            Book Statistics
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Total Copies</span>
              <span className="font-bold text-lg">{stats.books.totalCopies || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Available Copies</span>
              <span className="font-bold text-lg text-green-600">{stats.books.availableCopies || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Borrowed Copies</span>
              <span className="font-bold text-lg text-blue-600">{stats.books.borrowedCopies || 0}</span>
            </div>
          </div>
          <Link to="/admin/books" className="btn btn-primary w-full mt-4">
            Manage Books
          </Link>
        </div>

        {/* User Statistics */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaUsers className="mr-2 text-green-600" />
            User Statistics
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Active Users</span>
              <span className="font-bold text-lg text-green-600">{stats.users.activeUsers || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Administrators</span>
              <span className="font-bold text-lg text-purple-600">{stats.users.adminUsers || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Regular Members</span>
              <span className="font-bold text-lg text-blue-600">{stats.users.regularUsers || 0}</span>
            </div>
          </div>
          <Link to="/admin/users" className="btn btn-secondary w-full mt-4">
            Manage Users
          </Link>
        </div>
      </div>

      {/* Borrowing & Fines */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaChartLine className="mr-2 text-purple-600" />
            Borrowing Activity
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Total Borrowings</span>
              <span className="font-bold text-lg">{stats.borrowings.totalBorrowings || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Currently Borrowed</span>
              <span className="font-bold text-lg text-blue-600">{stats.borrowings.activeBorrowings || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Overdue</span>
              <span className="font-bold text-lg text-red-600">{stats.borrowings.overdueBorrowings || 0}</span>
            </div>
          </div>
          <Link to="/admin/borrowings" className="btn bg-purple-600 text-white hover:bg-purple-700 w-full mt-4">
            View All Borrowings
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaHandHoldingUsd className="mr-2 text-orange-600" />
            Financial Overview
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Total Fines Collected</span>
              <span className="font-bold text-lg text-green-600">${stats.borrowings.totalFines || 0}</span>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Fine rate is $1 per day for overdue books.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/admin/books/add" className="btn btn-primary">
            Add New Book
          </Link>
          <Link to="/admin/categories" className="btn btn-secondary">
            Manage Categories
          </Link>
          <Link to="/admin/users" className="btn bg-purple-600 text-white hover:bg-purple-700">
            View Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
