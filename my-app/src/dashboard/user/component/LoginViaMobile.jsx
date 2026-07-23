import React, { useState, useEffect } from "react";
import {
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Info, // Added Info icon to show the OTP banner
} from "lucide-react";

import { useAuth } from "../../../app/providers/AuthContextApi/AuthProvider";

export default function LoginViaMobile({
  onLoginSuccess,
  onNewUser,
  onBack,
}) {
  const {
    checkCustomerMobile,
    verifyCustomerOtp,
  } = useAuth();

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");

  // 1 = Mobile Number, 2 = OTP
  const [step, setStep] = useState(1);

  const [error, setError] = useState("");
  const [infoMsg, setInfoMsg] = useState(""); // Holds server response message
  const [mockOtp, setMockOtp] = useState(""); // Holds extracted 6-digit code for screen display
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(30);

  // ===============================
  // OTP Countdown Timer
  // ===============================
  useEffect(() => {
    let interval;

    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // ===============================
  // STEP 1: Check Mobile Number
  // ===============================
  const handleGetOTP = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMsg("");
    setMockOtp("");

    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setError("Please enter valid 10 digit mobile number.");
      return;
    }

    setLoading(true);
    const result = await checkCustomerMobile(mobileNumber);
    setLoading(false);

    if (result.isRegistered) {
      // Existing customer
      setStep(2);
      setResendTimer(30);

      // Capture and extract OTP code from server message
      if (result.message) {
        setInfoMsg(result.message);
        
        // Regex searches for any sequence of exactly 6 digits in the string
        const match = result.message.match(/\b\d{6}\b/);
        if (match) {
          setMockOtp(match[0]); // Save the matched 6-digit code
        }
      }
    } else {
      // New customer
      if (onNewUser) {
        onNewUser(mobileNumber);
      }
    }
  };

  // ===============================
  // STEP 2: Verify OTP
  // ===============================
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[0-9]{4,6}$/.test(otp)) {
      setError("Please enter valid OTP.");
      return;
    }

    setLoading(true);
    const result = await verifyCustomerOtp(mobileNumber, otp);
    setLoading(false);

    if (result.success || result.token) {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      setError(result.message || "Invalid OTP.");
    }
  };

  // ===============================
  // Change Mobile Number
  // ===============================
  const handleGoBack = () => {
    setStep(1);
    setOtp("");
    setError("");
    setInfoMsg("");
    setMockOtp("");
  };

  return (
    <div className="w-full font-['Outfit',sans-serif]">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-[#2D2F2F]">
          Login via Mobile
        </h2>
        <p className="text-[11px] font-semibold text-gray-400 mt-1">
          {step === 1
            ? "Enter your mobile number to continue"
            : `OTP sent to ${mobileNumber}`}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex gap-2 text-[11px] font-bold text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Mobile Number Step */}
      {step === 1 ? (
        <form onSubmit={handleGetOTP} className="space-y-4">
          <div className="relative">
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="w-full pl-10 py-3 text-xs rounded-xl bg-[#F3F4F6] outline-none"
            />
            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>

          <button
            disabled={loading || mobileNumber.length !== 10}
            className="w-full py-3 rounded-full bg-[#B41B00] text-white font-bold text-xs disabled:opacity-50"
          >
            {loading ? "Checking..." : "Continue"}
            <ArrowRight className="inline ml-2 w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full text-xs text-gray-400"
          >
            Back to Cart
          </button>
        </form>
      ) : (
        // OTP Step
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          
          {/* ================================================== */}
          {/* Test Verification OTP Display Banner */}
          {/* ================================================== */}
          {mockOtp && (
            <div className="mb-4 p-3 bg-[#EBF5FF] border border-blue-100 rounded-xl flex items-center justify-between text-[11px] font-bold text-blue-700">
              <div className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-500" />
                <span>Test Code:</span>
              </div>
              <span className="text-xs bg-white px-2 py-1 rounded-lg border border-blue-200 tracking-widest text-blue-900 font-extrabold shadow-sm">
                {mockOtp}
              </span>
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full pl-10 py-3 text-center tracking-widest rounded-xl bg-[#F3F4F6] text-xs font-semibold"
            />
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>

          <button
            disabled={loading || otp.length < 4}
            className="w-full py-3 rounded-full bg-[#B41B00] text-white font-bold text-xs disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
            <ShieldCheck className="inline ml-2 w-4 h-4" />
          </button>

          {resendTimer > 0 ? (
            <span className="block text-center text-xs text-gray-400">
              Resend OTP in {resendTimer}s
            </span>
          ) : (
            <button
              type="button"
              onClick={() => {
                setResendTimer(30);
                handleGetOTP({ preventDefault: () => {} });
              }}
              className="block mx-auto text-xs text-[#B41B00] font-bold"
            >
              Resend OTP
            </button>
          )}

          <button
            type="button"
            onClick={handleGoBack}
            className="block mx-auto text-xs text-gray-500 hover:text-gray-800 underline"
          >
            Change Number
          </button>
        </form>
      )}
    </div>
  );
}