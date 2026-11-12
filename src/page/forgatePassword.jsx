import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LockKeyholeOpen,
  Mail,
  Send,
  ArrowLeft,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/v1/users/Forget_Password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send reset link.");
      }

      setMessage(result.message);
      setEmail("");
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09291f] px-4 py-10">
      <img
        src="/images/explore_odisha_offer.jpeg"
        alt="Explore Odisha"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-[690px]">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/images/Logo.jpeg"
            alt="MapMySafar Logo"
            className="h-20 w-20 rounded-xl object-contain"
          />

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#173b2b]">
            MapMy<span className="text-[#e96d43]">Safar</span>
          </h1>

          <p className="mt-1 text-sm font-medium text-white">
            Self-Drive & With-Driver Car Rental
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-white/95 shadow-2xl backdrop-blur-xl">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#e9eee5]/80" />

          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#ffe2d4]/80" />

          <div className="relative px-6 py-9 sm:px-12 sm:py-12">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[30px] bg-[#ffdfcf] text-[#e96d43]">
              <LockKeyholeOpen size={65} strokeWidth={2.2} />
            </div>

            <div className="mt-5 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#173b2b] sm:text-[42px]">
                Forgot Password?
              </h2>

              <p className="mx-auto mt-4 max-w-[490px] text-base leading-7 text-gray-600 sm:text-lg">
                No worries! Enter your registered email address and we'll send
                you a password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#173b2b]"
              >
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-4 transition focus-within:border-[#e96d43] focus-within:ring-2 focus-within:ring-[#e96d43]/20">
                <Mail size={23} className="shrink-0 text-[#173b2b]" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="w-full bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>

              {error && (
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {message && (
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <p>{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#e96d43] px-5 py-4 text-lg font-bold text-white shadow-lg shadow-orange-900/10 transition hover:bg-[#d85b32] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={22} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={21} />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-3 text-lg font-semibold text-[#173b2b] transition hover:text-[#e96d43]"
              >
                <ArrowLeft size={21} />
                Back to Login
              </Link>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Great journeys don't have to wait.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
