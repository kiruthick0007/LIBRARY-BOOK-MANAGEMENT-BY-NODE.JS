import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import { FaBook, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 animate-fadeIn">
        <Breadcrumb />
        {children}
      </main>
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-12 border-t-4 border-indigo-500">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                  <FaBook className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold">Library System</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A modern, comprehensive library management solution designed for efficient book tracking, user management, and seamless borrowing operations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-indigo-400">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Home</a></li>
                <li><a href="/books" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Browse Books</a></li>
                <li><a href="/login" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Login</a></li>
                <li><a href="/register" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Register</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-indigo-400">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-indigo-400">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2 text-gray-400">
                  <FaEnvelope className="text-indigo-400" />
                  <span>support@library.com</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <FaPhone className="text-indigo-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <FaMapMarkerAlt className="text-indigo-400" />
                  <span>123 Library Street, NY</span>
                </li>
              </ul>
              {/* Social Links */}
              <div className="flex space-x-4 mt-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-all duration-300 transform hover:scale-110">
                  <FaGithub className="text-lg" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-all duration-300 transform hover:scale-110">
                  <FaTwitter className="text-lg" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-all duration-300 transform hover:scale-110">
                  <FaLinkedin className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Library Management System. All rights reserved. | Built with MERN Stack
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
