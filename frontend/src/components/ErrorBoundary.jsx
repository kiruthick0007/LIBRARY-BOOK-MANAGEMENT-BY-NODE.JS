import React from 'react';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 px-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="mx-auto h-24 w-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <FaExclamationTriangle className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              We're sorry for the inconvenience. Our team has been notified and is working to fix the issue.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-gray-100 rounded-xl p-6 mb-6 text-left">
                <h3 className="font-bold text-red-600 mb-2">Error Details:</h3>
                <pre className="text-sm text-gray-800 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="btn btn-primary px-8 py-3 flex items-center space-x-2"
              >
                <FaHome />
                <span>Go to Homepage</span>
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="btn btn-outline px-8 py-3"
              >
                Try Again
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-8">
              Error ID: {Date.now().toString(36).toUpperCase()}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
