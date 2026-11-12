import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  Info,
  Loader2,
} from "lucide-react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get reset token from email link
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Check only whether both passwords match
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      // Store token and password in object
      const userData = {
        token: token,
        newPassword: password,
        email: email,
      };

      console.log("Sending reset password request:", userData);

      const response = await fetch(
        "http://localhost:8000/api/v1/users/UpdatePassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset password.");
      }

      setMessage(
        data.message || "Password reset successfully. Redirecting to login...",
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (err) {
      console.error("Reset Password Error:", err);

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* LEFT SIDE - MAPMYSAFAR IMAGE */}

      <div className="hidden lg:block lg:w-[48%] h-screen relative overflow-hidden bg-[#053F32]">
        <img
          src="/images/konarktemple.jpeg"
          alt="MapMySafar Konark Sun Temple Odisha"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* RIGHT SIDE - RESET PASSWORD */}

      <div className="w-full lg:w-[52%] min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-16 py-12">
        <div className="w-full max-w-[480px]">
          {/* MOBILE BRANDING */}

          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <h2 className="text-2xl font-bold text-[#053F32]">
              MapMy<span className="text-[#D96B43]">Safar</span>
            </h2>
          </div>

          {/* LOCK ICON */}

          <div className="w-[90px] h-[90px] mx-auto bg-[#E9F5EF] rounded-full flex items-center justify-center mb-7">
            <LockKeyhole
              size={39}
              strokeWidth={1.8}
              className="text-[#075541]"
            />
          </div>

          {/* HEADING */}

          <h1 className="text-center text-3xl sm:text-[38px] font-bold tracking-tight text-[#052D23]">
            Reset Your Password
          </h1>

          <p className="text-center text-gray-500 text-base sm:text-lg mt-3 mb-10">
            Create a new password for your account.
          </p>

          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NEW PASSWORD */}

            <div className="relative">
              <LockKeyhole
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                autoComplete="new-password"
                required
                className="w-full h-[60px] pl-12 pr-12 border border-gray-300 rounded-xl outline-none focus:border-[#075541] focus:ring-2 focus:ring-[#075541]/10 transition-all text-gray-800"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#075541]"
              >
                {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="relative">
              <LockKeyhole
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                autoComplete="new-password"
                required
                className="w-full h-[60px] pl-12 pr-12 border border-gray-300 rounded-xl outline-none focus:border-[#075541] focus:ring-2 focus:ring-[#075541]/10 transition-all text-gray-800"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#075541]"
              >
                {showConfirm ? <EyeOff size={21} /> : <Eye size={21} />}
              </button>
            </div>

            {/* PASSWORD REQUIREMENTS */}

            <div className="flex gap-3 items-start bg-[#EAF6F0] rounded-xl px-5 py-4">
              <Info size={22} className="text-[#075541] shrink-0 mt-0.5" />

              <p className="text-sm text-gray-700 leading-relaxed">
                Password must be at least 8 characters and include a number or
                special character.
              </p>
            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <p
                role="alert"
                className="text-sm text-red-600 bg-red-50 p-3 rounded-lg"
              >
                {error}
              </p>
            )}

            {/* SUCCESS MESSAGE */}

            {message && (
              <p
                role="status"
                className="text-sm text-green-700 bg-green-50 p-3 rounded-lg"
              >
                {message}
              </p>
            )}

            {/* RESET BUTTON */}

            <button
              type="submit"
              disabled={loading || Boolean(message)}
              className="w-full h-[60px] bg-[#005341] hover:bg-[#063B2D] text-white font-semibold text-lg rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* BACK TO LOGIN */}

          <Link
            to="/login"
            className="flex justify-center items-center gap-2 mt-8 text-[#075541] font-semibold hover:text-[#D96B43] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
