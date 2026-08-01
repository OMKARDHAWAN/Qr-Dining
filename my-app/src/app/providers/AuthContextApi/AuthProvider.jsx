import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// The port 5244 is the default HTTP port for our ASP.NET Core API.
// Change this to match your backend port if needed (e.g., https://localhost:7198 for HTTPS)
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/auth`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a user session exists when the app initializes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/staff-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Invalid Username or Password.');
      }
      
      // Extract the JWT token and user profile returned by the backend
      const { token, user: userProfile } = data;
      
      // Save details in browser local storage to maintain session on refresh
      localStorage.setItem('user', JSON.stringify(userProfile));
      localStorage.setItem('token', token);
      
      // Update local React state
      setUser(userProfile);
      
      return { success: true, message: "Logged in successfully!!" };
    } catch (error) {
      // Return server-side error message if authentication fails
      return { 
        success: false, 
        message: error.message || 'Invalid Username or Password.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
