import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// The port 5244 is the default HTTP port for our ASP.NET Core API.
// Change this to match your backend port if needed (e.g., https://localhost:7198 for HTTPS)
const API_BASE_URL = 'https://localhost:44382/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a user session exists when the app initializes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      // Attach the token to all future Axios requests globally:
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log(username,password);
      console.log(`${API_BASE_URL}/staff-login`);
      // Sends a request to our ASP.NET Core Staff Login endpoint
      const response = await axios.post(`${API_BASE_URL}/staff-login`, { 
        username, 
        password 
      });
      
      // Extract the JWT token and user profile returned by the backend
      const { token, user: userProfile } = response.data;
      
      // Save details in browser local storage to maintain session on refresh
      localStorage.setItem('user', JSON.stringify(userProfile));
      localStorage.setItem('token', token);
      
      // Set default authorization header for all subsequent Axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update local React state
      setUser(userProfile);
      
      return { success: true, message: "Logged in successfully!!" };
    } catch (error) {
      // Return server-side error message if authentication fails
      return { 
        success: false, 
        message: error.response?.data?.message || 'Invalid Username or Password.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook for easier access across your app
export const useAuth = () => useContext(AuthContext);