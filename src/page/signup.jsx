import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
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

const Signup = () => {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const countryOptions = [
    { code: "+91", label: "🇮🇳 +91", digits: 10 },
    { code: "+1", label: "🇺🇸 +1", digits: 10 },
    { code: "+44", label: "🇬🇧 +44", digits: 10 },
    { code: "+61", label: "🇦🇺 +61", digits: 9 },
    { code: "+971", label: "🇦🇪 +971", digits: 9 },
    { code: "+65", label: "🇸🇬 +65", digits: 8 },
    { code: "+81", label: "🇯🇵 +81", digits: null },
    { code: "+49", label: "🇩🇪 +49", digits: null },
  ];

  const selectedCountry = countryOptions.find(
    (country) => country.code === countryCode,
  );

  const validateField = (field, value) => {
    let message = "";

    if (field === "name") {
      if (!value.trim()) {
        message = "Please enter your full name.";
      }
    }

    if (field === "email") {
      if (!value.trim()) {
        message = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        message = "Please enter a valid email address.";
      }
    }

    if (field === "mobile") {
      const digits = value.replace(/\D/g, "");

      if (!digits) {
        message = "Please enter your mobile number.";
      } else if (
        digits.length < 7 ||
        digits.length > 15 ||
        (selectedCountry?.digits && digits.length !== selectedCountry.digits)
      ) {
        message = selectedCountry?.digits
          ? `Please enter a valid ${selectedCountry.digits}-digit mobile number.`
          : "Please enter a valid mobile number (7–15 digits).";
      }
    }

    if (field === "password") {
      if (!value) {
        message = "Please enter a password.";
      } else if (value.length < 6) {
        message = "Password must contain at least 6 characters.";
      }
    }

    if (field === "confirmPassword") {
      if (!value) {
        message = "Please confirm your password.";
      } else if (value !== password) {
        message = "Passwords do not match.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: message,
      ...(field === "password" && confirmPassword
        ? {
            confirmPassword:
              value === confirmPassword ? "" : "Passwords do not match.",
          }
        : {}),
    }));

    return !message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = {
      name,
      email,
      mobile,
      password,
      confirmPassword,
    };

    const newErrors = {};

    Object.entries(fields).forEach(([field, value]) => {
      if (field === "confirmPassword") {
        if (!value) {
          newErrors[field] = "Please confirm your password.";
        } else if (value !== password) {
          newErrors[field] = "Passwords do not match.";
        }
      } else if (field === "mobile") {
        const digits = value.replace(/\D/g, "");

        if (
          !digits ||
          digits.length < 7 ||
          digits.length > 15 ||
          (selectedCountry?.digits && digits.length !== selectedCountry.digits)
        ) {
          newErrors[field] = selectedCountry?.digits
            ? `Please enter a valid ${selectedCountry.digits}-digit mobile number.`
            : "Please enter a valid mobile number (7–15 digits).";
        }
      } else if (field === "name") {
        if (!value.trim()) {
          newErrors[field] = "Please enter your full name.";
        }
      } else if (field === "email") {
        if (!value.trim()) {
          newErrors[field] = "Please enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          newErrors[field] = "Please enter a valid email address.";
        }
      } else if (field === "password") {
        if (!value) {
          newErrors[field] = "Please enter a password.";
        } else if (value.length < 6) {
          newErrors[field] = "Password must contain at least 6 characters.";
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const info = {
      Name: name.trim(),
      Email: email.trim(),
      Mobile: `${countryCode}${mobile}`,
      Password: password,
      confirmPassword,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:8000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        setErrors((prev) => ({
          ...prev,
          submit:
            data.message || data.error || "Signup failed. Please try again.",
        }));
      }
    } catch (error) {
      console.error("Signup error:", error);

      setErrors((prev) => ({
        ...prev,
        submit: "Unable to connect to the server. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToLogin = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  const inputClass = (field) =>
    `w-full h-11 pl-10 pr-3 rounded-lg bg-[#F8F5F1] border outline-none transition focus:ring-2 focus:ring-[#D96B43]/10 ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-[#1E3A2B]/10 focus:border-[#D96B43]"
    }`;

  return (
    <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-[#1E3A2B]">
            Explore<span className="text-[#D96B43]">Odisha</span>
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Create your account and start your journey
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#1E3A2B]/10 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1E3A2B]">
              Create Account
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Join us to explore and book your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={nameRef}
                  type="text"
                  value={name}
                  autoComplete="name"
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateField("name", e.target.value);
                  }}
                  className={inputClass("name")}
                />
              </div>

              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  className={inputClass("email")}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Mobile with Country Code */}
            <div>
              <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
                Mobile Number
              </label>

              <div
                className={`flex h-11 rounded-lg bg-[#F8F5F1] border transition ${
                  errors.mobile
                    ? "border-red-400"
                    : "border-[#1E3A2B]/10 focus-within:border-[#D96B43]"
                }`}
              >
                <Phone
                  size={18}
                  className="ml-3 shrink-0 self-center text-gray-400"
                />

                <select
                  value={countryCode}
                  disabled={isSubmitting}
                  aria-label="Country calling code"
                  onChange={(e) => {
                    setCountryCode(e.target.value);

                    const country = countryOptions.find(
                      (item) => item.code === e.target.value,
                    );

                    const digits = mobile.replace(/\D/g, "");

                    let message = "";

                    if (digits.length < 7 || digits.length > 15) {
                      message = "Please enter a valid mobile number.";
                    } else if (
                      country?.digits &&
                      digits.length !== country.digits
                    ) {
                      message = `Please enter a valid ${country.digits}-digit mobile number.`;
                    }

                    setErrors((prev) => ({
                      ...prev,
                      mobile: message,
                    }));
                  }}
                  className="w-[94px] shrink-0 bg-transparent pl-2 pr-1 outline-none text-sm text-[#1E3A2B]"
                >
                  {countryOptions.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.label}
                    </option>
                  ))}
                </select>

                <div className="w-px bg-[#1E3A2B]/10 my-2" />

                <input
                  ref={mobileRef}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={mobile}
                  maxLength={15}
                  placeholder="Mobile number"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setMobile(value);
                    validateField("mobile", value);
                  }}
                  className="min-w-0 flex-1 rounded-r-lg bg-transparent px-3 outline-none"
                />
              </div>

              {errors.mobile && (
                <p className="mt-1.5 text-sm text-red-600">{errors.mobile}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateField("password", e.target.value);
                  }}
                  className={`${inputClass("password")} pr-10`}
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

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={confirmPasswordRef}
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateField("confirmPassword", e.target.value);
                  }}
                  className={`${inputClass("confirmPassword")} pr-10`}
                />

                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A2B]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* API Error */}
            {errors.submit && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2.5"
              >
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[#D96B43] hover:bg-[#C55A35] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="font-semibold text-[#D96B43] hover:underline"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Explore Odisha • Travel • Ride • Discover
        </p>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10251B]/60 backdrop-blur-sm px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-success-title"
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 sm:p-8 text-center"
          >
            <button
              type="button"
              onClick={goToLogin}
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
              Welcome to Explore Odisha
            </p>

            <h2
              id="signup-success-title"
              className="text-2xl font-bold text-[#1E3A2B]"
            >
              Account Created!
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Your account has been created successfully. You're all set to
              discover Odisha and plan your next journey.
            </p>

            <button
              type="button"
              onClick={goToLogin}
              className="mt-7 w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#D96B43] hover:bg-[#C55A35] text-white font-semibold shadow-md transition"
            >
              Continue to Login
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

export default Signup;
