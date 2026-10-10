// import { useRef, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const navigate = useNavigate();

//   const emailRef = useRef();
//   const passwordRef = useRef();

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const email = emailRef.current.value.trim();
//     const password = passwordRef.current.value;

//     if (!email || !password) {
//       setError("Please enter email and password.");
//       return;
//     }

//     const loginData = {
//       email,
//       password,
//     };

//     console.log("Login Data:", loginData);

//     const response = await fetch("http://localhost:8000/api/v1/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify(loginData),
//     });

//     if (response.ok) {
//       console.log("login successfully");
//       navigate("/");
//     }

//     console.log("login failed");
//     // API call will come here later
//     // Example:
//     // axios.post("/api/login", loginData)
//   };

//   return (
//     <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md">
//         {/* Brand */}
//         <div className="text-center mb-7">
//           <h1 className="text-3xl font-bold text-[#1E3A2B]">
//             Odisha<span className="text-[#D96B43]">Drive</span>
//           </h1>

//           <p className="text-sm text-gray-500 mt-2">
//             Welcome back! Continue your journey.
//           </p>
//         </div>

//         {/* Login Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-[#1E3A2B]/10 p-6 sm:p-8">
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-[#1E3A2B]">Welcome Back</h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Login to manage your bookings and explore Odisha.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
//                 Email Address
//               </label>

//               <div className="relative">
//                 <Mail
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <input
//                   ref={emailRef}
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full h-11 pl-10 pr-3 rounded-lg bg-[#F8F5F1] border border-[#1E3A2B]/10 outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/10 transition"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <div className="flex items-center justify-between mb-1.5">
//                 <label className="text-sm font-semibold text-[#1E3A2B]">
//                   Password
//                 </label>

//                 <button
//                   type="button"
//                   className="text-xs font-medium text-[#D96B43] hover:underline"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               <div className="relative">
//                 <Lock
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <input
//                   ref={passwordRef}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="w-full h-11 pl-10 pr-10 rounded-lg bg-[#F8F5F1] border border-[#1E3A2B]/10 outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/10 transition"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A2B]"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2.5">
//                 {error}
//               </div>
//             )}

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full h-11 bg-[#D96B43] hover:bg-[#C55A35] text-white font-semibold rounded-lg transition shadow-sm"
//             >
//               Login
//             </button>
//           </form>

//           {/* Signup */}
//           <div className="text-center mt-6">
//             <p className="text-sm text-gray-500">
//               Don't have an account?{" "}
//               <NavLink
//                 to="/signup"
//                 className="font-semibold text-[#D96B43] hover:underline"
//               >
//                 Create Account
//               </NavLink>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-xs text-gray-400 mt-5">
//           OdishaDrive • Self Drive • Explore Odisha
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  LoaderCircle,
  X,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isEmail = identifier.includes("@");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loginIdentifier = identifier.trim();

    if (!loginIdentifier || !password) {
      setError("Please enter your email/mobile number and password.");
      return;
    }

    if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      const loginData = {
        email: loginIdentifier,
        password,
      };

      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        setError(
          data.message ||
            data.error ||
            "Invalid email/mobile number or password.",
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const continueToHome = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-[#1E3A2B]">
            Explore<span className="text-[#D96B43]">Odisha</span>
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Welcome back! Continue your journey.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#1E3A2B]/10 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1E3A2B]">Welcome Back</h2>

            <p className="text-sm text-gray-500 mt-1">
              Login to manage your bookings and explore Odisha.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email or Mobile */}
            <div>
              <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
                Email or Mobile Number
              </label>

              <div
                className={`relative rounded-lg ${
                  error
                    ? "border-red-400"
                    : "border-[#1E3A2B]/10 focus-within:border-[#D96B43]"
                } border bg-[#F8F5F1] transition`}
              >
                {isEmail ? (
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                ) : (
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                )}

                <input
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter email or mobile number"
                  className="w-full h-11 pl-10 pr-3 rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-[#D96B43]/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-[#1E3A2B]">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs font-medium text-[#D96B43] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className={`w-full h-11 pl-10 pr-10 rounded-lg bg-[#F8F5F1] border outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/10 transition disabled:opacity-60 ${
                    error ? "border-red-300" : "border-[#1E3A2B]/10"
                  }`}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A2B]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2.5"
              >
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[#D96B43] hover:bg-[#C55A35] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Signup */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="font-semibold text-[#D96B43] hover:underline"
              >
                Create Account
              </NavLink>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Explore Odisha • Travel • Ride • Discover
        </p>
      </div>

      {/* Login Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10251B]/60 backdrop-blur-sm px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-success-title"
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 sm:p-8 text-center"
          >
            <button
              type="button"
              onClick={continueToHome}
              aria-label="Close success message"
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-[#1E3A2B] transition"
            >
              <X size={19} />
            </button>

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F3EA]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E3A2B]">
                <CheckCircle size={34} className="text-white" />
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D96B43] mb-2">
              Welcome Back
            </p>

            <h2
              id="login-success-title"
              className="text-2xl font-bold text-[#1E3A2B]"
            >
              Login Successful!
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              You're successfully logged in. Get ready to explore Odisha and
              plan your next journey.
            </p>

            <button
              type="button"
              onClick={continueToHome}
              className="mt-7 w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#D96B43] hover:bg-[#C55A35] text-white font-semibold shadow-md transition"
            >
              Continue to Explore
              <ArrowRight size={18} />
            </button>

            <p className="mt-4 text-xs text-gray-400">
              Your next adventure starts here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
