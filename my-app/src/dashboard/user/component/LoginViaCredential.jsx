import React, { useState } from "react";
import { User, Mail, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthContextApi/AuthProvider";

export default function LoginViaCredential({
  mobileNumber,
  onRegisterSuccess,
  onBack,
}) {

  const { registerCustomer } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    if (name.trim().length < 2) {

      setError("Please enter a valid name.");
      return;

    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(email)) {

      setError("Please enter a valid email address.");
      return;

    }


    setLoading(true);


    const result = await registerCustomer({

      mobileNumber,
      name,
      email,

    });


    setLoading(false);



    if (result.success) {

      onRegisterSuccess();

    } 
    else {

      setError(
        result.message ||
        "Registration failed."
      );

    }

  };



  return (

    <div className="w-full font-['Outfit',sans-serif]">


      {/* Header */}

      <div className="text-center mb-6">

        <h2 className="text-lg font-bold text-[#2D2F2F] tracking-tight">
          Complete Registration
        </h2>


        <p className="text-[11px] font-semibold text-gray-400 mt-1">
          Provide your name and email to continue your order
        </p>

      </div>




      {/* Error */}

      {
        error && (

          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-[11px] font-bold text-red-600">

            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />

            <span>
              {error}
            </span>

          </div>

        )
      }





      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >


        {/* Name */}

        <div className="relative">


          <input

            type="text"

            placeholder="Full Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            disabled={loading}

            className="w-full pl-10 pr-4 py-3 text-xs font-semibold rounded-xl bg-[#F3F4F6] text-[#2D2F2F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B41B00]/20 focus:bg-white transition-all duration-300 border border-transparent"

          />


          <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />


        </div>





        {/* Email */}

        <div className="relative">


          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            disabled={loading}

            className="w-full pl-10 pr-4 py-3 text-xs font-semibold rounded-xl bg-[#F3F4F6] text-[#2D2F2F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B41B00]/20 focus:bg-white transition-all duration-300 border border-transparent"

          />


          <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />


        </div>





        {/* Submit Button */}

        <button

          type="submit"

          disabled={loading}

          className="w-full py-3 bg-gradient-to-r from-[#B41B00] to-[#FF775D] text-white text-xs font-extrabold uppercase tracking-wider rounded-full shadow-[0_4px_12px_rgba(180,27,0,0.2)] hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"

        >

          {
            loading
            ? "Registering..."
            : "Register & Checkout"
          }


          {
            !loading &&
            <ShieldCheck className="w-4 h-4" />
          }


        </button>





        {/* Back Button */}

        <button

          type="button"

          onClick={onBack}

          disabled={loading}

          className="w-full text-center text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors pt-2"

        >

          Go Back

        </button>


      </form>


    </div>

  );

}