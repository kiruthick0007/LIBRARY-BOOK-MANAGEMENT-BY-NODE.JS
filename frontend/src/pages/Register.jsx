import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);

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
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 relative z-10 hover-lift">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 box-glow">
            <FaBook className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold gradient-text mb-2">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Join our library community and start exploring
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-slideIn">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="animate-slideIn">
              <label htmlFor="name" className="label text-gray-700 font-semibold">
                <FaUser className="inline mr-2 text-indigo-600" />Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="animate-slideIn" style={{animationDelay: '0.1s'}}>
              <label htmlFor="email" className="label text-gray-700 font-semibold">
                <FaEnvelope className="inline mr-2 text-indigo-600" />Email Address
              </label>
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

            <div className="animate-slideIn" style={{animationDelay: '0.2s'}}>
              <label htmlFor="phone" className="label text-gray-700 font-semibold">
                <FaPhone className="inline mr-2 text-indigo-600" />Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="input"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="animate-slideIn" style={{animationDelay: '0.3s'}}>
              <label htmlFor="address" className="label text-gray-700 font-semibold">
                <FaMapMarkerAlt className="inline mr-2 text-indigo-600" />Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="input"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="animate-slideIn" style={{animationDelay: '0.4s'}}>
              <label htmlFor="password" className="label text-gray-700 font-semibold">
                <FaLock className="inline mr-2 text-indigo-600" />Password
              </label>
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

            <div className="animate-slideIn" style={{animationDelay: '0.5s'}}>
              <label htmlFor="confirmPassword" className="label text-gray-700 font-semibold">
                <FaLock className="inline mr-2 text-indigo-600" />Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center text-sm mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-purple-600 font-bold transition-colors duration-300 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
