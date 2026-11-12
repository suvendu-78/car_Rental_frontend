import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Clock,
  ArrowRight,
  ArrowLeft,
  CarFront,
  MapPinned,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef([]);
  const popupTimer = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // Show success and error popup
  const showPopup = (type, message) => {
    clearTimeout(popupTimer.current);

    setPopup({ type, message });

    popupTimer.current = setTimeout(() => {
      setPopup(null);
    }, 3500);
  };

  // Generate and send OTP
  const sendOTP = async () => {
    if (!email) {
      showPopup("error", "Email is missing. Please login again.");
      return false;
    }

    const response = await fetch("http://localhost:8000/api/v1/users/OTP_Gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    return true;
  };

  // Send OTP when page loads
  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
      return;
    }

    const generateOTP = async () => {
      try {
        await sendOTP();
      } catch (error) {
        showPopup("error", error.message || "Failed to send OTP");
      }
    };

    generateOTP();

    return () => {
      clearTimeout(popupTimer.current);
    };
    // Initial OTP request only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Update one OTP digit
  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((prev) => {
      const updated = [...prev];
      updated[index] = digit;
      return updated;
    });

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Paste complete OTP
  const handlePaste = (e) => {
    e.preventDefault();

    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!digits) return;

    setOtp([...digits.split(""), ...Array(6 - digits.length).fill("")]);

    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const formatTime = (seconds) => `00:${String(seconds).padStart(2, "0")}`;

  // Verify OTP using backend
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.some((digit) => !digit)) {
      showPopup("error", "Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/OTP_Verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            otp: otp.join(""),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired OTP");
      }

      showPopup("success", "OTP verified successfully!");

      // Change this route to your actual next signup step.
      setTimeout(() => {
        navigate("/account/dashboard");
      }, 1000);
    } catch (error) {
      showPopup("error", error.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP after countdown finishes
  const handleResend = async () => {
    if (timeLeft > 0 || resending) return;

    setResending(true);

    try {
      await sendOTP();

      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60);

      showPopup("success", "A new OTP has been sent.");

      inputRefs.current[0]?.focus();
    } catch (error) {
      showPopup("error", error.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e9] text-[#193b2c]">
      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-7 px-5 py-7 lg:grid-cols-[1.15fr_1fr] lg:px-10 lg:py-9">
        {/* Left banner */}
        <section className="relative flex min-h-[480px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#183c2c] via-[#547360] to-[#d8b79a] p-7 text-white shadow-lg sm:p-10 lg:min-h-[650px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#102e22]/85 via-[#173b2b]/45 to-transparent" />

          <div className="relative z-10 pt-5">
            <p className="mb-5 text-sm font-bold tracking-[3px] text-[#ff784c]">
              EXPLORE ODISHA
            </p>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Your journey
              <br />
              starts <span className="text-[#ed764a]">here</span>
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-white/90 sm:text-xl">
              Verify your email to continue your OdishaDrive experience.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/15 p-3">
                <CarFront size={25} />
              </span>
              <div>
                <p className="font-bold">Self Drive</p>
                <p className="text-sm text-white/75">Flexible & Easy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/15 p-3">
                <MapPinned size={25} />
              </span>
              <div>
                <p className="font-bold">Explore Odisha</p>
                <p className="text-sm text-white/75">Hidden Gems Await</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/15 p-3">
                <ShieldCheck size={25} />
              </span>
              <div>
                <p className="font-bold">Safe & Trusted</p>
                <p className="text-sm text-white/75">Verified Vehicles</p>
              </div>
            </div>
          </div>
        </section>

        {/* OTP card */}
        <section className="flex items-center justify-center py-2">
          <div className="w-full max-w-2xl rounded-3xl bg-white px-5 py-10 shadow-[0_12px_45px_rgba(37,53,41,0.10)] sm:px-9 lg:px-10">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-[#eaf6ee] p-5 text-[#1e5639]">
                <ShieldCheck size={42} strokeWidth={1.8} />
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900">
                Verify your email
              </h2>

              <p className="mt-3 leading-7 text-gray-500">
                Enter the 6-digit verification code sent to your email address.
              </p>

              <div className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#fff1eb] px-4 py-3">
                <Mail className="shrink-0 text-[#e56b40]" size={23} />
                <span className="break-all font-semibold text-gray-900">
                  {email}
                </span>
              </div>

              <form onSubmit={handleVerify} className="mt-8 w-full">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      maxLength={1}
                      value={digit}
                      disabled={loading}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      aria-label={`OTP digit ${index + 1}`}
                      className="h-14 w-10 rounded-xl border-2 border-gray-300 text-center text-xl font-bold text-gray-900 outline-none transition focus:border-[#e56b40] focus:ring-2 focus:ring-orange-100 sm:h-[68px] sm:w-[60px]"
                    />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <Clock size={21} className="text-gray-500" />
                  <span className="text-gray-700">Code expires in</span>
                  <span
                    className={`font-bold ${
                      timeLeft === 0 ? "text-red-600" : "text-[#e56b40]"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {timeLeft > 0
                    ? `Request a new code in ${timeLeft} seconds`
                    : "You can request a new code now."}
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#e56b40] px-5 py-4 text-lg font-bold text-white transition hover:bg-[#d85c32] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                  {!loading && <ArrowRight size={23} />}
                </button>
              </form>

              <div className="my-7 flex w-full items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm text-gray-500">
                  Didn't receive the code?
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0 || resending}
                className="font-semibold text-[#1c4934] transition hover:text-[#e56b40] disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {resending
                  ? "Sending..."
                  : timeLeft > 0
                    ? `Resend OTP (${timeLeft}s)`
                    : "Resend OTP"}
              </button>

              <Link
                to="/login"
                className="mt-8 inline-flex items-center gap-2 font-medium text-[#1c4934] hover:text-[#e56b40]"
              >
                <ArrowLeft size={19} />
                Back to Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Success / error popup */}
      {popup && (
        <div
          role="alert"
          aria-live="polite"
          className={`fixed right-4 top-24 z-50 flex w-[calc(100%-2rem)] max-w-md items-center gap-3 rounded-xl border p-4 shadow-xl sm:right-6 ${
            popup.type === "success"
              ? "border-green-200 bg-[#f0fff6] text-[#174d31]"
              : "border-red-200 bg-[#fff3f2] text-red-800"
          }`}
        >
          {popup.type === "success" ? (
            <CheckCircle2 className="shrink-0 text-green-600" size={28} />
          ) : (
            <XCircle className="shrink-0 text-red-600" size={28} />
          )}

          <p className="flex-1 font-semibold">{popup.message}</p>

          <button
            type="button"
            onClick={() => setPopup(null)}
            aria-label="Close popup"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyOTP;
