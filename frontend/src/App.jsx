import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';

// User Pages
import Profile from './pages/Profile';
import MyBorrowings from './pages/MyBorrowings';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/books" element={<Layout><Books /></Layout>} />
        <Route path="/books/:id" element={<Layout><BookDetails /></Layout>} />

        {/* Protected User Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout><Profile /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/my-borrowings"
          element={
            <PrivateRoute>
              <Layout><MyBorrowings /></Layout>
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout><AdminDashboard /></Layout>
            </AdminRoute>
          }
        />

        {/* 404 Page */}
        <Route path="/404" element={<NotFound />} />
        
        {/* Catch all - redirect to 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="rounded-xl shadow-2xl"
        bodyClassName="text-sm font-medium"
      />
    </ErrorBoundary>
  );
}

export default App;
