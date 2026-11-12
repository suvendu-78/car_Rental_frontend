import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  MapPin,
  CalendarDays,
  Clock3,
  Users,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShieldCheck,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";

import { tourPackages } from "./tourData.jsx";

const TourBooking = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const tour = tourPackages.find((item) => item.id === tourId);

  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [expanded, setExpanded] = useState(0);
  const [request, setRequest] = useState("");

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [formError, setFormError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    let active = true;

    const checkLogin = async () => {
      try {
        setCheckingAuth(true);

        const response = await fetch(`${API_URL}/api/v1/users/Get_users`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        console.log("AUTH STATUS:", response.status);
        console.log("USER API RESPONSE:", data);

        if (!response.ok) {
          if (active) setUser(null);
          return;
        }

        const rawUser =
          data.user ||
          data.userData ||
          data.data?.user ||
          data.data?.userData ||
          data.data ||
          null;

        const loggedInUser = Array.isArray(rawUser) ? rawUser[0] : rawUser;

        if (!loggedInUser || typeof loggedInUser !== "object") {
          if (active) setUser(null);
          return;
        }

        const normalizedUser = {
          ...loggedInUser,
          name:
            loggedInUser.name ||
            loggedInUser.Name ||
            loggedInUser.fullName ||
            loggedInUser.username ||
            "",
          email: loggedInUser.email || loggedInUser.Email || "",
          phone:
            loggedInUser.mobile ||
            loggedInUser.phone ||
            loggedInUser.Phone ||
            loggedInUser.number ||
            loggedInUser.phoneNumber ||
            "",
        };

        console.log("NORMALIZED USER:", normalizedUser);

        if (active) {
          setUser(normalizedUser.email ? normalizedUser : null);
        }
      } catch (error) {
        console.error("AUTH ERROR:", error);

        if (active) setUser(null);
      } finally {
        if (active) {
          setCheckingAuth(false);
        }
      }
    };

    checkLogin();

    return () => {
      active = false;
    };
  }, [API_URL]);

  if (!tour) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F7F5] p-5 text-center">
        <h1 className="text-3xl font-bold text-[#123B2D]">Tour Not Found</h1>

        <p className="mt-3 text-slate-500">
          This tour package is not available.
        </p>

        <button
          onClick={() => navigate("/tours")}
          className="mt-6 rounded-xl bg-[#123B2D] px-6 py-3 text-white"
        >
          Browse All Tours
        </button>
      </div>
    );
  }

  const childPrice = Math.round(tour.price * 0.6);
  const total = adults * tour.price + children * childPrice;

  const money = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (checkingAuth) {
      setFormError("Please wait while we verify your login.");
      return;
    }

    if (!user) {
      navigate("/login", {
        state: {
          from: `/TourBooking/${tourId}`,
        },
      });
      return;
    }

    if (!date) {
      setFormError("Please select your travel date.");
      return;
    }

    if (adults < 1 || adults + children > 10) {
      setFormError("Please select a valid group size.");
      return;
    }

    try {
      setSubmitting(true);

      const bookingDetails = {
        tourId: tour.id,
        tourName: tour.name,
        date,
        adults,
        children,
        total,
        specialRequest: request,
        customer: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      };

      console.log("TOUR BOOKING DETAILS:", bookingDetails);

      const response = await fetch(`${API_URL}/api/v1/users/Booking_Data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();

      console.log("BOOKING RESPONSE:", data);

      if (response.status === 401) {
        setUser(null);
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit booking.");
      }

      setBookingReference(data.booking?.id ? `MMS-${data.booking.id}` : "");

      setBookingSuccess(true);
    } catch (error) {
      console.error("BOOKING ERROR:", error);

      setFormError(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackHome = () => {
    setBookingSuccess(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#123B2D]">
      <main className="mx-auto max-w-[1350px] px-5 py-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate("/")}>Home</button>
          <span>/</span>
          <button onClick={() => navigate("/tours")}>Tours</button>
          <span>/</span>
          <span className="font-semibold text-[#123B2D]">{tour.name}</span>
        </div>

        <div className="relative h-[300px] overflow-hidden rounded-[25px] md:h-[440px]">
          <img
            src={tour.image}
            alt={tour.name}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          <div className="absolute bottom-8 left-7 text-white md:bottom-12 md:left-12">
            <span className="rounded-full bg-[#D96B43] px-4 py-2 text-xs font-bold">
              {tour.category} EXPERIENCE
            </span>

            <h1 className="mt-5 text-3xl font-bold md:text-5xl">{tour.name}</h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
              <MapPin size={17} />
              {tour.location}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-[#E9E2D8] bg-white p-5 md:grid-cols-4">
          {[
            [Clock3, tour.duration, "Duration"],
            [MapPin, tour.location, "Destination"],
            [Star, `${tour.rating} / 5`, "Guest Rating"],
            [Users, "Up to 10", "Group Size"],
          ].map(([Icon, value, label]) => (
            <div key={label} className="flex items-center gap-3">
              <div className="rounded-xl bg-[#F8EEE8] p-3 text-[#D96B43]">
                <Icon size={21} />
              </div>

              <div>
                <p className="text-sm font-bold">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-10">
            <section>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#D96B43]">
                Discover your destination
              </p>

              <h2 className="mt-3 text-3xl font-bold">About This Tour</h2>

              <p className="mt-4 text-sm leading-8 text-slate-600">
                {tour.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Tour Highlights</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {tour.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-[#E9E2D8] bg-white p-4"
                  >
                    <Check className="text-[#D96B43]" size={19} />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#D96B43]">
                Your travel schedule
              </p>

              <h2 className="mt-3 text-3xl font-bold">Tour Itinerary</h2>

              <div className="mt-6 space-y-4">
                {tour.itinerary.map((day, index) => (
                  <div
                    key={day.day}
                    className="overflow-hidden rounded-2xl border border-[#E9E2D8] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(expanded === index ? -1 : index)
                      }
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#123B2D] text-sm font-bold text-white">
                          {index + 1}
                        </div>

                        <div>
                          <p className="text-xs font-bold text-[#D96B43]">
                            {day.day}
                          </p>

                          <h3 className="mt-1 font-bold">{day.title}</h3>
                        </div>
                      </div>

                      {expanded === index ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {expanded === index && (
                      <div className="space-y-4 border-t border-slate-100 px-5 py-5">
                        {day.activities.map((activity) => (
                          <p
                            key={activity}
                            className="flex items-center gap-3 text-sm text-slate-600"
                          >
                            <Check size={17} className="text-[#D96B43]" />
                            {activity}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-[24px] border border-[#E9E2D8] bg-white shadow-lg"
            >
              <div className="bg-[#123B2D] p-6 text-white">
                <p className="text-xs uppercase tracking-[2px] text-[#F4A17F]">
                  Reserve your experience
                </p>

                <h2 className="mt-2 text-2xl font-bold">Book This Tour</h2>
              </div>

              <div className="space-y-6 p-6">
                {checkingAuth ? (
                  <div className="rounded-xl bg-[#F7F7F5] p-4 text-center text-sm text-slate-500">
                    Checking your login...
                  </div>
                ) : user ? (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={20} className="text-green-700" />

                      <p className="text-sm font-bold text-green-800">
                        Logged in successfully
                      </p>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-[#123B2D]">
                      {user.name || "Customer"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">{user.email}</p>

                    <p className="mt-1 text-xs text-slate-500">
                      {user.phone || "Phone number not added"}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                    <p className="text-sm font-semibold text-[#123B2D]">
                      Please login to continue booking.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="mt-2 text-sm font-bold text-[#D96B43] underline"
                    >
                      Login to your account
                    </button>
                  </div>
                )}

                {formError && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-red-600"
                    />

                    <p className="text-sm text-red-700">{formError}</p>
                  </div>
                )}

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold">
                    <CalendarDays size={18} className="text-[#D96B43]" />
                    Travel Date
                  </label>

                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-[#E9E2D8] bg-[#FAFAF8] p-3 text-sm outline-none focus:border-[#D96B43]"
                  />
                </div>

                {[
                  {
                    label: "Adults",
                    value: adults,
                    set: setAdults,
                    min: 1,
                    max: 10 - children,
                  },
                  {
                    label: "Children",
                    value: children,
                    set: setChildren,
                    min: 0,
                    max: 10 - adults,
                  },
                ].map((person) => (
                  <div
                    key={person.label}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-bold">{person.label}</p>

                      <p className="mt-1 text-xs text-slate-400">
                        {person.label === "Adults"
                          ? "Age 12 and above"
                          : "Age 5–11"}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        disabled={person.value <= person.min}
                        onClick={() => person.set(person.value - 1)}
                        className="rounded-full border border-slate-200 p-2 disabled:opacity-30"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="font-bold">{person.value}</span>

                      <button
                        type="button"
                        disabled={person.value >= person.max}
                        onClick={() => person.set(person.value + 1)}
                        className="rounded-full border border-slate-200 p-2 disabled:opacity-30"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                ))}

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Special Request
                  </label>

                  <textarea
                    rows="3"
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="Tell us about your requirements..."
                    className="w-full rounded-xl border border-[#E9E2D8] bg-[#FAFAF8] p-3 text-sm outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div className="rounded-2xl bg-[#F7F7F5] p-5">
                  <h3 className="mb-4 font-bold">Price Summary</h3>

                  <div className="mb-3 flex justify-between text-sm text-slate-500">
                    <span>Adults × {adults}</span>
                    <span>{money(adults * tour.price)}</span>
                  </div>

                  {children > 0 && (
                    <div className="mb-3 flex justify-between text-sm text-slate-500">
                      <span>Children × {children}</span>
                      <span>{money(children * childPrice)}</span>
                    </div>
                  )}

                  <div className="my-4 border-t border-slate-200" />

                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>

                    <span className="text-2xl font-extrabold">
                      {money(total)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Sample pricing. Final charges depend on package inclusions
                    and confirmation.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={checkingAuth || submitting}
                  className="w-full rounded-xl bg-[#D96B43] py-4 font-bold text-white transition hover:bg-[#123B2D] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {checkingAuth ? (
                    "Checking Login..."
                  ) : submitting ? (
                    "Submitting Booking..."
                  ) : !user ? (
                    <>
                      Login to Continue
                      <ArrowRight size={18} className="ml-2 inline" />
                    </>
                  ) : (
                    <>
                      Continue Booking
                      <ArrowRight size={18} className="ml-2 inline" />
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={16} />
                  Secure booking experience
                </p>
              </div>
            </form>
          </aside>
        </div>
      </main>

      {bookingSuccess && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
        >
          <div className="relative w-full max-w-md animate-[fadeIn_0.3s_ease-out] overflow-hidden rounded-[28px] bg-white p-7 text-center shadow-2xl sm:p-9">
            <button
              type="button"
              onClick={handleBackHome}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#123B2D]"
              aria-label="Close popup and go home"
            >
              <X size={20} />
            </button>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/60">
              <CheckCircle2
                size={48}
                className="text-green-600"
                strokeWidth={2}
              />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[3px] text-[#D96B43]">
              MapMySafar
            </p>

            <h2
              id="booking-success-title"
              className="mt-3 text-2xl font-extrabold text-[#123B2D] sm:text-3xl"
            >
              Booking Submitted!
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Your tour booking request has been submitted successfully. Our
              team will contact you soon with the confirmation details.
            </p>

            <div className="mt-7 rounded-2xl border border-[#E9E2D8] bg-[#F7F7F5] p-5 text-left">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">Tour Name</span>

                <span className="text-sm font-bold text-[#123B2D]">
                  {tour.name}
                </span>
              </div>

              <div className="my-3 border-t border-slate-200" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">Travel Date</span>

                <span className="text-sm font-semibold text-[#123B2D]">
                  {date}
                </span>
              </div>

              <div className="my-3 border-t border-slate-200" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">Total Amount</span>

                <span className="text-sm font-bold text-[#123B2D]">
                  {money(total)}
                </span>
              </div>

              {bookingReference && (
                <>
                  <div className="my-3 border-t border-slate-200" />

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Booking Reference
                    </span>

                    <span className="text-sm font-extrabold text-[#D96B43]">
                      {bookingReference}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={handleBackHome}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#D96B43] py-4 font-bold text-white shadow-lg shadow-orange-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#123B2D]"
            >
              Back to Home
              <ArrowRight size={19} />
            </button>

            <p className="mt-5 text-xs text-slate-400">
              Thank you for choosing MapMySafar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourBooking;
