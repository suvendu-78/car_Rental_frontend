import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  LoaderCircle,
  X,
  AlertCircle,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  // Read input values using useRef
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Store the validated email for OTP navigation
  const verifiedEmailRef = useRef("");

  const openErrorPopup = (message) => {
    setPopupMessage(message);
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setPopupMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowErrorModal(false);
    setPopupMessage("");

    const loginEmail = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";

    // Validate fields
    if (!loginEmail || !password) {
      openErrorPopup("Please enter your email and password.");
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      openErrorPopup("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: controller.signal,
        body: JSON.stringify({
          Email: loginEmail,
          Password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      console.log("Login status:", response.status);
      console.log("Login response:", data);

      if (!response.ok || data.success === false) {
        const message =
          data.message ||
          data.error ||
          (response.status === 404
            ? "User not found. Please check your email."
            : response.status === 401
              ? "Incorrect email or password. Please try again."
              : `Login failed. Status: ${response.status}`);

        openErrorPopup(message);
        return;
      }

      // Save email for the next step
      verifiedEmailRef.current = loginEmail;

      // Credentials accepted; OTP verification is still pending
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Login error:", err);

      if (err.name === "AbortError") {
        openErrorPopup(
          "The login request timed out. Please check your backend server.",
        );
      } else {
        openErrorPopup(
          "Unable to connect to the server. Make sure your backend is running on port 8000.",
        );
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  // Navigate to OTP page and pass the email
  const continueToOTP = () => {
    const email = verifiedEmailRef.current;

    setShowSuccessModal(false);

    if (!email) {
      openErrorPopup("Email not found. Please log in again.");
      return;
    }

    navigate("/verifyOTP", {
      state: { email },
    });
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-[#1E3A2B]">
            Explore
            <span className="text-[#D96B43]"> Odisha</span>
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
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#1E3A2B] mb-1.5"
              >
                Email Address
              </label>

              <div className="relative rounded-lg border border-[#1E3A2B]/10 bg-[#F8F5F1] focus-within:border-[#D96B43]">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  autoComplete="username"
                  disabled={isSubmitting}
                  placeholder="Enter your email"
                  className="w-full h-11 pl-10 pr-3 rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-[#D96B43]/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#1E3A2B]"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/ForgotPassword")}
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
                  ref={passwordRef}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  placeholder="Enter your password"
                  className="w-full h-11 pl-10 pr-10 rounded-lg bg-[#F8F5F1] border border-[#1E3A2B]/10 outline-none focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/10 transition disabled:opacity-60"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A2B]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[#D96B43] hover:bg-[#C55A35] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Checking Credentials...
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

      {/* Error Popup */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#10251B]/60 backdrop-blur-sm px-4 py-6">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="login-error-title"
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 sm:p-8 text-center"
          >
            <button
              type="button"
              onClick={closeErrorModal}
              aria-label="Close error message"
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 transition"
            >
              <X size={19} />
            </button>

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500">
                <AlertCircle size={32} className="text-white" />
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-2">
              Authentication Error
            </p>

            <h2
              id="login-error-title"
              className="text-2xl font-bold text-[#1E3A2B]"
            >
              Login Failed
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {popupMessage}
            </p>

            <button
              type="button"
              onClick={closeErrorModal}
              className="mt-7 w-full h-12 rounded-xl bg-[#D96B43] hover:bg-[#C55A35] text-white font-semibold shadow-md transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Credentials Accepted Popup */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#10251B]/60 backdrop-blur-sm px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-success-title"
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 sm:p-8 text-center"
          >
            <button
              type="button"
              onClick={continueToOTP}
              aria-label="Continue to OTP verification"
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 transition"
            >
              <X size={19} />
            </button>

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F3EA]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E3A2B]">
                <CheckCircle size={34} className="text-white" />
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D96B43] mb-2">
              One More Step
            </p>

            <h2
              id="login-success-title"
              className="text-2xl font-bold text-[#1E3A2B]"
            >
              Credentials Verified!
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Your credentials have been accepted. Continue to email OTP
              verification to complete your login.
            </p>

            <button
              type="button"
              onClick={continueToOTP}
              className="mt-7 w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#D96B43] hover:bg-[#C55A35] text-white font-semibold shadow-md transition"
            >
              Continue to OTP
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
