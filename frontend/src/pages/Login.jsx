import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 relative z-10 hover-lift">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 box-glow">
            <FaBook className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold gradient-text mb-2">
            Library System
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Sign in to access your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-slideIn">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div className="animate-slideIn">
              <label htmlFor="email" className="label text-gray-700 font-semibold">
                <FaEnvelope className="inline mr-2 text-indigo-600" />
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="animate-slideIn" style={{animationDelay: '0.1s'}}>
              <label htmlFor="password" className="label text-gray-700 font-semibold">
                <FaLock className="inline mr-2 text-indigo-600" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </span>
            </button>
          </div>

          <div className="text-center text-sm mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-purple-600 font-bold transition-colors duration-300 hover:underline">
                Sign up now
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
            <p className="text-xs text-gray-600 text-center font-semibold mb-2">🎯 Demo Credentials</p>
            <div className="space-y-1 text-xs text-gray-700">
              <p className="flex items-center justify-between">
                <span className="font-medium">Admin:</span>
                <span className="bg-white px-2 py-1 rounded">admin@library.com / admin123</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-medium">User:</span>
                <span className="bg-white px-2 py-1 rounded">john@example.com / password123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
