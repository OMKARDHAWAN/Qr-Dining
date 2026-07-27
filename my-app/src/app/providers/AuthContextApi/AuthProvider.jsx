import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_BASE_URL = "https://localhost:44382/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  // ====================================================
  // STAFF LOGIN (Existing)
  // ====================================================

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/staff-login`, {
        username,
        password,
      });

      const { token, user: userProfile } = response.data;

      localStorage.setItem("user", JSON.stringify(userProfile));
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userProfile);

      return {
        success: true,
        message: "Logged in successfully!",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Invalid Username or Password.",
      };
    }
  };

  // ====================================================
  // CUSTOMER STEP 1
  // Check Mobile & Send OTP
  // ====================================================

  const checkCustomerMobile = async (mobileNumber) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customer-login`, {
        MobileNumber: mobileNumber,
        Otp: "",
      });

      // Backend returns:
      // {
      //   isRegistered,
      //   otpSent,
      //   message
      // }

      return response.data;
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Unable to process request.",
      };
    }
  };

  // ====================================================
  // CUSTOMER STEP 2
  // Verify OTP
  // ====================================================

  const verifyCustomerOtp = async (mobileNumber, otp) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customer-login`, {
        MobileNumber: mobileNumber,
        Otp: otp,
      });

      const data = response.data;

      // Login successful
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;

        setUser(data.user);
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "OTP verification failed.",
      };
    }
  };

  // ====================================================
  // CUSTOMER STEP 3
  // Register
  // ====================================================

  const registerCustomer = async ({ mobileNumber, name, email }) => {
    try {
      console.log("Registering customer:", mobileNumber, name, email);
      const response = await axios.post(`${API_BASE_URL}/customer-login`, {
        MobileNumber: mobileNumber,
        Username: name, // Maps React name -> Backend Username
        Email: email
      });

      const data = response.data;

      // Automatically store token on success
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;

        setUser(data.user);
        
        return { success: true, data };
      }

      return { success: false, message: data.message || "Registration failed." };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed.",
      };
    }
  };

  // ====================================================
  // LOGOUT
  // ====================================================

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        checkCustomerMobile,
        verifyCustomerOtp,
        registerCustomer,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);