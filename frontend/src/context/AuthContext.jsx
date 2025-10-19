import { createContext, useState, useEffect, useContext } from 'react';
import API from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    // Check localStorage for existing user session
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    // Prevent concurrent login attempts
    if (isAuthenticating) {
      return { success: false, message: 'Authentication in progress' };
    }

    try {
      setIsAuthenticating(true);
      const { data } = await API.post('/auth/login', { email, password });
      
      // Atomic update: set both user and localStorage together
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const register = async (userData) => {
    // Prevent concurrent registration attempts
    if (isAuthenticating) {
      return { success: false, message: 'Authentication in progress' };
    }

    try {
      setIsAuthenticating(true);
      const { data } = await API.post('/auth/register', userData);
      
      // Atomic update
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    // Atomic logout: clear all auth state at once
    try {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Clear API default headers to prevent stale token usage
      delete API.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Logout error:', error);
      // Force clear even on error
      localStorage.clear();
    }
  };

  const updateUserProfile = async (profileData) => {
    // Prevent concurrent updates
    if (isAuthenticating) {
      return { success: false, message: 'Update in progress' };
    }

    try {
      setIsAuthenticating(true);
      const { data } = await API.put('/auth/profile', profileData);
      
      // Atomic update
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed'
      };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUserProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    isAuthenticating // Expose to prevent concurrent auth operations
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
