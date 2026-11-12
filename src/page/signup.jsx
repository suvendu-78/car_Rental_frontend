// import { useRef, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Phone,
//   Lock,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   ArrowRight,
//   LoaderCircle,
//   X,
// } from "lucide-react";

// const Signup = () => {
//   const navigate = useNavigate();

//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const mobileRef = useRef(null);
//   const passwordRef = useRef(null);
//   const confirmPasswordRef = useRef(null);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [countryCode, setCountryCode] = useState("+91");

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const countryOptions = [
//     { code: "+91", label: "🇮🇳 +91", digits: 10 },
//     { code: "+1", label: "🇺🇸 +1", digits: 10 },
//     { code: "+44", label: "🇬🇧 +44", digits: 10 },
//     { code: "+61", label: "🇦🇺 +61", digits: 9 },
//     { code: "+971", label: "🇦🇪 +971", digits: 9 },
//     { code: "+65", label: "🇸🇬 +65", digits: 8 },
//     { code: "+81", label: "🇯🇵 +81", digits: null },
//     { code: "+49", label: "🇩🇪 +49", digits: null },
//   ];

//   const selectedCountry = countryOptions.find(
//     (country) => country.code === countryCode,
//   );

//   const validateField = (field, value) => {
//     let message = "";

//     if (field === "name") {
//       if (!value.trim()) {
//         message = "Please enter your full name.";
//       }
//     }

//     if (field === "email") {
//       if (!value.trim()) {
//         message = "Please enter your email address.";
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
//         message = "Please enter a valid email address.";
//       }
//     }

//     if (field === "mobile") {
//       const digits = value.replace(/\D/g, "");

//       if (!digits) {
//         message = "Please enter your mobile number.";
//       } else if (
//         digits.length < 7 ||
//         digits.length > 15 ||
//         (selectedCountry?.digits && digits.length !== selectedCountry.digits)
//       ) {
//         message = selectedCountry?.digits
//           ? `Please enter a valid ${selectedCountry.digits}-digit mobile number.`
//           : "Please enter a valid mobile number (7–15 digits).";
//       }
//     }

//     if (field === "password") {
//       if (!value) {
//         message = "Please enter a password.";
//       } else if (value.length < 6) {
//         message = "Password must contain at least 6 characters.";
//       }
//     }

//     if (field === "confirmPassword") {
//       if (!value) {
//         message = "Please confirm your password.";
//       } else if (value !== password) {
//         message = "Passwords do not match.";
//       }
//     }

//     setErrors((prev) => ({
//       ...prev,
//       [field]: message,
//       ...(field === "password" && confirmPassword
//         ? {
//             confirmPassword:
//               value === confirmPassword ? "" : "Passwords do not match.",
//           }
//         : {}),
//     }));

//     return !message;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fields = {
//       name,
//       email,
//       mobile,
//       password,
//       confirmPassword,
//     };

//     const newErrors = {};

//     Object.entries(fields).forEach(([field, value]) => {
//       if (field === "confirmPassword") {
//         if (!value) {
//           newErrors[field] = "Please confirm your password.";
//         } else if (value !== password) {
//           newErrors[field] = "Passwords do not match.";
//         }
//       } else if (field === "mobile") {
//         const digits = value.replace(/\D/g, "");

//         if (
//           !digits ||
//           digits.length < 7 ||
//           digits.length > 15 ||
//           (selectedCountry?.digits && digits.length !== selectedCountry.digits)
//         ) {
//           newErrors[field] = selectedCountry?.digits
//             ? `Please enter a valid ${selectedCountry.digits}-digit mobile number.`
//             : "Please enter a valid mobile number (7–15 digits).";
//         }
//       } else if (field === "name") {
//         if (!value.trim()) {
//           newErrors[field] = "Please enter your full name.";
//         }
//       } else if (field === "email") {
//         if (!value.trim()) {
//           newErrors[field] = "Please enter your email address.";
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
//           newErrors[field] = "Please enter a valid email address.";
//         }
//       } else if (field === "password") {
//         if (!value) {
//           newErrors[field] = "Please enter a password.";
//         } else if (value.length < 6) {
//           newErrors[field] = "Password must contain at least 6 characters.";
//         }
//       }
//     });

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }

//     const info = {
//       Name: name.trim(),
//       Email: email.trim(),
//       Mobile: `${countryCode}${mobile}`,
//       Password: password,
//       confirmPassword,
//     };

//     try {
//       setIsSubmitting(true);

//       const response = await fetch(
//         "http://localhost:8000/api/v1/users/signup",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(info),
//         },
//       );

//       const data = await response.json().catch(() => ({}));

//       if (response.ok) {
//         setShowSuccessModal(true);
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           submit:
//             data.message || data.error || "Signup failed. Please try again.",
//         }));
//       }
//     } catch (error) {
//       console.error("Signup error:", error);

//       setErrors((prev) => ({
//         ...prev,
//         submit: "Unable to connect to the server. Please try again.",
//       }));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const goToLogin = () => {
//     setShowSuccessModal(false);
//     navigate("/login");
//   };

//   const inputClass = (field) =>
//     `w-full h-11 pl-10 pr-3 rounded-lg bg-[#F8F5F1] border outline-none transition focus:ring-2 focus:ring-[#D96B43]/10 ${
//       errors[field]
//         ? "border-red-400 focus:border-red-500"
//         : "border-[#1E3A2B]/10 focus:border-[#D96B43]"
//     }`;

//   return (
//     <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md">
//         {/* Brand */}
//         <div className="text-center mb-7">
//           <h1 className="text-3xl font-bold text-[#1E3A2B]">
//             Explore<span className="text-[#D96B43]">Odisha</span>
//           </h1>

//           <p className="text-sm text-gray-500 mt-2">
//             Create your account and start your journey
//           </p>
//         </div>

//         {/* Signup Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-[#1E3A2B]/10 p-6 sm:p-8">
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-[#1E3A2B]">
//               Create Account
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Join us to explore and book your journey
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} noValidate className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
//                 Full Name
//               </label>

//               <div className="relative">
//                 <User
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <input
//                   ref={nameRef}
//                   type="text"
//                   value={name}
//                   autoComplete="name"
//                   placeholder="Enter your full name"
//                   disabled={isSubmitting}
//                   onChange={(e) => {
//                     setName(e.target.value);
//                     validateField("name", e.target.value);
//                   }}
//                   className={inputClass("name")}
//                 />
//               </div>

//               {errors.name && (
//                 <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
//               )}
//             </div>

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
//                   value={email}
//                   autoComplete="email"
//                   placeholder="Enter your email"
//                   disabled={isSubmitting}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     validateField("email", e.target.value);
//                   }}
//                   className={inputClass("email")}
//                 />
//               </div>

//               {errors.email && (
//                 <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Mobile with Country Code */}
//             <div>
//               <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
//                 Mobile Number
//               </label>

//               <div
//                 className={`flex h-11 rounded-lg bg-[#F8F5F1] border transition ${
//                   errors.mobile
//                     ? "border-red-400"
//                     : "border-[#1E3A2B]/10 focus-within:border-[#D96B43]"
//                 }`}
//               >
//                 <Phone
//                   size={18}
//                   className="ml-3 shrink-0 self-center text-gray-400"
//                 />

//                 <select
//                   value={countryCode}
//                   disabled={isSubmitting}
//                   aria-label="Country calling code"
//                   onChange={(e) => {
//                     setCountryCode(e.target.value);

//                     const country = countryOptions.find(
//                       (item) => item.code === e.target.value,
//                     );

//                     const digits = mobile.replace(/\D/g, "");

//                     let message = "";

//                     if (digits.length < 7 || digits.length > 15) {
//                       message = "Please enter a valid mobile number.";
//                     } else if (
//                       country?.digits &&
//                       digits.length !== country.digits
//                     ) {
//                       message = `Please enter a valid ${country.digits}-digit mobile number.`;
//                     }

//                     setErrors((prev) => ({
//                       ...prev,
//                       mobile: message,
//                     }));
//                   }}
//                   className="w-[94px] shrink-0 bg-transparent pl-2 pr-1 outline-none text-sm text-[#1E3A2B]"
//                 >
//                   {countryOptions.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.label}
//                     </option>
//                   ))}
//                 </select>

//                 <div className="w-px bg-[#1E3A2B]/10 my-2" />

//                 <input
//                   ref={mobileRef}
//                   type="tel"
//                   inputMode="numeric"
//                   autoComplete="tel-national"
//                   value={mobile}
//                   maxLength={15}
//                   placeholder="Mobile number"
//                   disabled={isSubmitting}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, "");
//                     setMobile(value);
//                     validateField("mobile", value);
//                   }}
//                   className="min-w-0 flex-1 rounded-r-lg bg-transparent px-3 outline-none"
//                 />
//               </div>

//               {errors.mobile && (
//                 <p className="mt-1.5 text-sm text-red-600">{errors.mobile}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
//                 Password
//               </label>

//               <div className="relative">
//                 <Lock
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <input
//                   ref={passwordRef}
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   autoComplete="new-password"
//                   placeholder="Create a password"
//                   disabled={isSubmitting}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     validateField("password", e.target.value);
//                   }}
//                   className={`${inputClass("password")} pr-10`}
//                 />

//                 <button
//                   type="button"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A2B]"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>

//               {errors.password && (
//                 <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-semibold text-[#1E3A2B] mb-1.5">
//                 Confirm Password
//               </label>

//               <div className="relative">
//                 <Lock
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <input
//                   ref={confirmPasswordRef}
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={confirmPassword}
//                   autoComplete="new-password"
//                   placeholder="Confirm your password"
//                   disabled={isSubmitting}
//                   onChange={(e) => {
//                     setConfirmPassword(e.target.value);
//                     validateField("confirmPassword", e.target.value);
//                   }}
//                   className={`${inputClass("confirmPassword")} pr-10`}
//                 />

//                 <button
//                   type="button"
//                   aria-label={
//                     showConfirmPassword
//                       ? "Hide confirm password"
//                       : "Show confirm password"
//                   }
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A2B]"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff size={18} />
//                   ) : (
//                     <Eye size={18} />
//                   )}
//                 </button>
//               </div>

//               {errors.confirmPassword && (
//                 <p className="mt-1.5 text-sm text-red-600">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

//             {/* API Error */}
//             {errors.submit && (
//               <div
//                 role="alert"
//                 className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2.5"
//               >
//                 {errors.submit}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full h-11 flex items-center justify-center gap-2 bg-[#D96B43] hover:bg-[#C55A35] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-sm"
//             >
//               {isSubmitting ? (
//                 <>
//                   <LoaderCircle size={19} className="animate-spin" />
//                   Creating Account...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           {/* Login */}
//           <div className="text-center mt-6">
//             <p className="text-sm text-gray-500">
//               Already have an account?{" "}
//               <NavLink
//                 to="/login"
//                 className="font-semibold text-[#D96B43] hover:underline"
//               >
//                 Login
//               </NavLink>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-xs text-gray-400 mt-5">
//           Explore Odisha • Travel • Ride • Discover
//         </p>
//       </div>

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10251B]/60 backdrop-blur-sm px-4 py-6">
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="signup-success-title"
//             className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 sm:p-8 text-center"
//           >
//             <button
//               type="button"
//               onClick={goToLogin}
//               aria-label="Close success message"
//               className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-[#1E3A2B] transition"
//             >
//               <X size={19} />
//             </button>

//             <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F3EA]">
//               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E3A2B]">
//                 <CheckCircle size={34} className="text-white" />
//               </div>
//             </div>

//             <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D96B43] mb-2">
//               Welcome to Explore Odisha
//             </p>

//             <h2
//               id="signup-success-title"
//               className="text-2xl font-bold text-[#1E3A2B]"
//             >
//               Account Created!
//             </h2>

//             <p className="mt-3 text-sm leading-6 text-gray-500">
//               Your account has been created successfully. You're all set to
//               discover Odisha and plan your next journey.
//             </p>

//             <button
//               type="button"
//               onClick={goToLogin}
//               className="mt-7 w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#D96B43] hover:bg-[#C55A35] text-white font-semibold shadow-md transition"
//             >
//               Continue to Login
//               <ArrowRight size={18} />
//             </button>

//             <p className="mt-4 text-xs text-gray-400">
//               Your next adventure starts here.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CarFront,
  Tent,
  Camera,
  CheckCircle,
  LoaderCircle,
  X,
} from "lucide-react";

const destinations = [
  {
    name: "Konark Sun Temple",
    location: "Konark, Odisha",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Puri Beach",
    location: "Puri, Odisha",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Chilika Lake",
    location: "Chilika, Odisha",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Daringbadi",
    location: "Kandhamal, Odisha",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=85",
  },
];

const countryOptions = [
  { code: "+91", label: "🇮🇳 +91", digits: 10 },
  { code: "+1", label: "🇺🇸 +1", digits: 10 },
  { code: "+44", label: "🇬🇧 +44", digits: 10 },
  { code: "+61", label: "🇦🇺 +61", digits: 9 },
  { code: "+971", label: "🇦🇪 +971", digits: 9 },
  { code: "+65", label: "🇸🇬 +65", digits: 8 },
];

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);

  const selectedCountry = countryOptions.find(
    (item) => item.code === countryCode,
  );

  // Automatic carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % destinations.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + destinations.length) % destinations.length,
    );
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email.";
    }

    const digits = mobile.replace(/\D/g, "");

    if (!digits) {
      newErrors.mobile = "Please enter your mobile number.";
    } else if (
      digits.length < 7 ||
      digits.length > 15 ||
      (selectedCountry?.digits && digits.length !== selectedCountry.digits)
    ) {
      newErrors.mobile = selectedCountry?.digits
        ? `Enter a valid ${selectedCountry.digits}-digit number.`
        : "Enter a valid mobile number.";
    }

    if (!password) {
      newErrors.password = "Please enter a password.";
    } else if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const bookingInfo = {
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
          body: JSON.stringify(bookingInfo),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors({
          submit:
            data.message ||
            data.error ||
            "Unable to create account. Please try again.",
        });
        return;
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Signup error:", error);

      setErrors({
        submit: "Unable to connect to server. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-[52px] w-full rounded-xl border border-[#DEDAD4] bg-[#F8F6F2] pl-12 pr-4 text-sm text-[#123B2D] outline-none transition placeholder:text-slate-400 focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/10";

  const errorText = "mt-1.5 text-xs text-red-600";

  return (
    <div className="min-h-screen bg-[#F5F1EA] p-3 sm:p-5 lg:p-7">
      <div className="mx-auto grid min-h-[calc(100vh-56px)] max-w-[1550px] overflow-hidden rounded-[30px] bg-white shadow-2xl lg:grid-cols-2">
        {/* LEFT PANEL */}
        <section className="relative flex flex-col justify-center overflow-hidden bg-[#073B2E] px-6 py-10 text-white sm:px-10 lg:px-12 xl:px-16">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#D96B43]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative z-10">
            {/* ORIGINAL LOGO */}

            {/* MAPMYSAFAR ROTATING LOGO */}
            {/* STATIC LOGO + ROTATING OUTER RING */}
            <NavLink
              to="/"
              className="mb-10 flex w-full justify-center lg:justify-start"
            >
              <div className="relative flex h-[160px] w-[160px] items-center justify-center">
                {/* Rotating outer ring */}
                <div className="absolute inset-0 rounded-full border-[4px] border-transparent border-t-[#D96B43] border-r-[#D96B43] animate-[spin_4s_linear_infinite]" />

                {/* Static logo */}
                <div className="h-[140px] w-[140px] overflow-hidden rounded-full bg-white shadow-lg">
                  <img
                    src="/images/Logo.jpeg"
                    alt="MapMySafar"
                    className="h-full w-full rounded-full object-contain p-1"
                  />
                </div>
              </div>
            </NavLink>

            {/* BRAND MESSAGE */}
            <div className="mb-7">
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[4px] text-[#F4A17F]">
                <span className="h-[2px] w-7 bg-[#D96B43]" />
                Discover Incredible Odisha
                <span className="h-[2px] w-7 bg-[#D96B43]" />
              </p>

              <h1 className="max-w-xl text-4xl font-extrabold leading-[1.15] sm:text-5xl xl:text-[58px]">
                Every Journey Has
                <span className="mt-1 block text-[#E77A50]">
                  A Beautiful Story.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Explore stunning destinations, plan memorable road trips and
                experience the rich culture, nature and heritage of Odisha with
                MapMySafar.
              </p>
            </div>

            {/* DESTINATION CAROUSEL */}
            <div className="relative mt-9">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-white/60">
                    Explore destinations
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    Find your next adventure
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous destination"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-[#D96B43]"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next destination"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-[#D96B43]"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* SLIDING CARDS */}
              <div className="mt-5 overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${activeSlide * 33.333}%)`,
                  }}
                >
                  {destinations.map((destination, index) => (
                    <div
                      key={destination.name}
                      className="w-[calc(33.333%-11px)] min-w-[calc(33.333%-11px)] overflow-hidden rounded-2xl border-[4px] border-white bg-white shadow-xl"
                    >
                      <img
                        src={destination.image}
                        alt={destination.name}
                        loading="lazy"
                        className="h-[145px] w-full object-cover sm:h-[170px]"
                      />

                      <div className="px-3 py-3 text-[#123B2D]">
                        <h3 className="truncate text-xs font-bold sm:text-sm">
                          {destination.name}
                        </h3>

                        <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin size={11} />
                          {destination.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INDICATORS */}
              <div className="mt-5 flex justify-center gap-2">
                {destinations.map((destination, index) => (
                  <button
                    key={destination.name}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show ${destination.name}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === index
                        ? "w-9 bg-[#D96B43]"
                        : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* FEATURE FOOTER */}
            <div className="mt-9 border-t border-white/20 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-2">
                  <CarFront className="text-[#F08A62]" size={25} />
                  <span className="text-xs font-medium sm:text-sm">
                    Road Trips
                  </span>
                </div>

                <div className="hidden h-8 w-px bg-white/25 sm:block" />

                <div className="flex items-center gap-2">
                  <Tent className="text-[#F08A62]" size={25} />
                  <span className="text-xs font-medium sm:text-sm">
                    Adventure
                  </span>
                </div>

                <div className="hidden h-8 w-px bg-white/25 sm:block" />

                <div className="flex items-center gap-2">
                  <Camera className="text-[#F08A62]" size={25} />
                  <span className="text-xs font-medium sm:text-sm">
                    Culture & Heritage
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-8 text-[10px] text-white/45">
            © 2026 MapMySafar. Travel. Explore. Discover.
          </p>
        </section>

        {/* RIGHT PANEL - SIGNUP FORM */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-[500px]">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#123B2D] sm:text-4xl">
                Create Account
              </h2>

              <p className="mt-3 text-sm text-slate-500 sm:text-base">
                Join MapMySafar and start your journey today.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17251F]">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    autoComplete="name"
                    value={name}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: "", submit: "" }));
                    }}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                {errors.name && <p className={errorText}>{errors.name}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17251F]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: "", submit: "" }));
                    }}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>

                {errors.email && <p className={errorText}>{errors.email}</p>}
              </div>

              {/* MOBILE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17251F]">
                  Mobile Number
                </label>

                <div
                  className={`flex h-[52px] overflow-hidden rounded-xl border bg-[#F8F6F2] focus-within:border-[#D96B43] ${
                    errors.mobile ? "border-red-400" : "border-[#DEDAD4]"
                  }`}
                >
                  <select
                    value={countryCode}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                      setErrors((prev) => ({ ...prev, mobile: "" }));
                    }}
                    aria-label="Country code"
                    className="w-[105px] shrink-0 bg-transparent px-2 text-xs font-medium text-[#123B2D] outline-none"
                  >
                    {countryOptions.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.label}
                      </option>
                    ))}
                  </select>

                  <div className="my-3 w-px bg-[#DEDAD4]" />

                  <Phone
                    size={19}
                    className="ml-3 shrink-0 self-center text-slate-500"
                  />

                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={mobile}
                    maxLength={15}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, ""));
                      setErrors((prev) => ({
                        ...prev,
                        mobile: "",
                        submit: "",
                      }));
                    }}
                    placeholder="Mobile number"
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                  />
                </div>

                {errors.mobile && <p className={errorText}>{errors.mobile}</p>}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17251F]">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        password: "",
                        confirmPassword: "",
                        submit: "",
                      }));
                    }}
                    placeholder="Create a password"
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#123B2D]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errors.password && (
                  <p className={errorText}>{errors.password}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17251F]">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "",
                        submit: "",
                      }));
                    }}
                    placeholder="Confirm your password"
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    aria-label="Toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#123B2D]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className={errorText}>{errors.confirmPassword}</p>
                )}
              </div>

              {/* SERVER ERROR */}
              {errors.submit && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {errors.submit}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-[58px] w-full items-center justify-center gap-3 rounded-xl bg-[#D96B43] text-base font-bold text-white shadow-lg shadow-[#D96B43]/20 transition hover:-translate-y-0.5 hover:bg-[#C45A35] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={21} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={21} />
                  </>
                )}
              </button>
            </form>

            {/* LOGIN */}
            <div className="mt-7 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="font-bold text-[#D96B43] hover:underline"
                >
                  Login
                </NavLink>
              </p>
            </div>

            <p className="mt-10 text-center text-[11px] text-slate-400">
              By creating an account, you agree to our Terms & Privacy Policy.
            </p>
          </div>
        </section>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => navigate("/login")}
              aria-label="Close"
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle size={48} className="text-[#16834A]" />
            </div>

            <h2 className="text-2xl font-extrabold text-[#123B2D]">
              Account Created!
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Welcome to MapMySafar. Your journey starts here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D96B43] font-bold text-white transition hover:bg-[#C45A35]"
            >
              Continue to Login
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
