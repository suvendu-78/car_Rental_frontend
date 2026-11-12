import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const inputStyle =
  "mt-2 w-full rounded-xl border border-[#E4E5DE] bg-[#FAFAF7] px-4 py-3 text-sm text-[#243B30] outline-none transition placeholder:text-[#92988F] focus:border-[#D96B43] focus:bg-white";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const vehicle = state?.vehicle;
  const formRef = useRef(null);

  const [rentalType, setRentalType] = useState("hourly");
  const [hours, setHours] = useState(4);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateRevision, setDateRevision] = useState(0);

  const vehicleName = vehicle?.name || vehicle?.title || "Selected Vehicle";
  const vehicleImage =
    vehicle?.image || vehicle?.img || vehicle?.photo || "/images/family.jpeg";
  const vehicleType = vehicle?.type || vehicle?.category || "Self-drive";

  const dailyRate = Number(
    String(vehicle?.price ?? vehicle?.dailyPrice ?? 0).replace(/[^\d.]/g, ""),
  );

  const hourlyRate = Number(
    vehicle?.hourlyPrice ?? (dailyRate > 0 ? dailyRate / 24 : 0),
  );

  const today = new Date();

  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const getDateValue = (name) =>
    formRef.current?.elements.namedItem(name)?.value || "";

  const rentalDays = useMemo(() => {
    const startDate = getDateValue("startDate");
    const endDate = getDateValue("endDate");

    if (!startDate || !endDate) return 1;

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    return Math.max(1, Math.ceil((end - start) / 86400000));
  }, [dateRevision]);

  const estimatedTotal = Math.round(
    rentalType === "hourly" ? hourlyRate * hours : dailyRate * rentalDays,
  );

  const handleDateChange = () => {
    setDateRevision((previous) => previous + 1);
    setError("");
  };

  const handlePickupDateChange = (event) => {
    const pickupDate = event.target.value;
    const returnInput = formRef.current?.elements.namedItem("endDate");

    if (returnInput) {
      returnInput.min = pickupDate || localToday;

      if (returnInput.value && pickupDate && returnInput.value < pickupDate) {
        returnInput.value = pickupDate;
      }
    }

    handleDateChange();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!vehicle) {
      setError("Please select a vehicle first.");
      return;
    }

    if (loading || !formRef.current) return;

    // Collect all form inputs.
    const formData = Object.fromEntries(
      new FormData(formRef.current).entries(),
    );

    const {
      fullName = "",
      phone = "",
      email = "",
      licenseNumber = "",
      licenseExpiry = "",
      startDate = "",
      startTime = "",
      endDate = "",
      endTime = "",
    } = formData;

    // Validate required fields.
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !licenseNumber.trim() ||
      !licenseExpiry ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (endDate < startDate) {
      setError("Return date cannot be earlier than pickup date.");
      return;
    }

    if (startDate === endDate && endTime <= startTime) {
      setError("Return time must be later than pickup time.");
      return;
    }

    const pickupDateTime = new Date(`${startDate}T${startTime}`);
    const returnDateTime = new Date(`${endDate}T${endTime}`);

    if (pickupDateTime <= new Date()) {
      setError("Please select a future pickup date and time.");
      return;
    }

    if (returnDateTime <= pickupDateTime) {
      setError("Return date and time must be after pickup.");
      return;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      new Date(`${licenseExpiry}T00:00:00`) < new Date(`${startDate}T00:00:00`)
    ) {
      setError("Your driving licence must be valid on the pickup date.");
      return;
    }

    // Build the complete booking object BEFORE the API request.
    const booking = {
      vehicle: {
        id: vehicle.id || vehicle._id || null,
        name: vehicleName,
        image: vehicleImage,
        type: vehicleType,
        dailyRate,
        hourlyRate,
      },

      rentalType,
      hours: rentalType === "hourly" ? Number(hours) : null,
      rentalDays: rentalType === "multi-day" ? rentalDays : null,

      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        licenseNumber: licenseNumber.trim(),
        licenseExpiry,
      },

      schedule: {
        startDate,
        startTime,
        endDate,
        endTime,
      },

      estimatedTotal,
      travelRegion: "Odisha only",

      documentVerification:
        "Original driving licence and accepted identity document to be checked at pickup.",
    };

    console.log("All form inputs:", formData);
    console.log("Complete booking payload:", booking);

    setLoading(true);

    try {
      const apiBase = (
        import.meta.env.VITE_API_URL || "http://localhost:8000"
      ).replace(/\/$/, "");

      // Send all booking details to the backend.
      const response = await fetch(`${apiBase}/api/v1/users/SelfDrive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await response.json().catch(() => ({}));

      console.log("Backend response:", result);

      if (!response.ok) {
        setError(
          result.message || "Unable to submit booking. Please try again.",
        );
        return;
      }

      navigate("/booking/confirm", {
        state: {
          booking: result.data || booking,
        },
      });
    } catch (bookingError) {
      console.error("Booking request failed:", bookingError);

      setError(
        "Unable to submit booking. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F6F4EF] px-4 text-[#203A2E]">
        <div className="max-w-md rounded-3xl border border-[#E5E1D9] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#E8EEE7] text-2xl">
            🚗
          </div>

          <h1 className="mt-5 text-2xl font-semibold">
            Choose your ride first
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#737A71]">
            Select a vehicle from the fleet page to start your booking.
          </p>

          <button
            type="button"
            onClick={() => navigate("/fleet")}
            className="mt-6 rounded-xl bg-[#D96B43] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#BF5936]"
          >
            Browse vehicles
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3EE] text-[#203A2E]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Booking Hero */}
        <section className="relative mb-8 overflow-hidden rounded-[28px] border border-[#E5E3D9] bg-gradient-to-br from-[#E9EFE7] via-[#F8F6F0] to-[#F5E9DF] px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#D96B43]/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-[#1E3A2B]/5 blur-2xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D96B43]/20 bg-white/75 px-3.5 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#D96B43]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B65334] sm:text-xs">
                  Self-drive booking
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-[#1E3A2B] sm:text-4xl lg:text-[52px]">
                Your next journey
                <br className="hidden sm:block" />
                starts{" "}
                <span className="relative inline-block text-[#D96B43]">
                  here.
                  <span className="absolute -bottom-1 left-0 h-[3px] w-3/4 rounded-full bg-[#D96B43]/40" />
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#68746A] sm:text-base">
                Choose your ride, set your schedule and get ready to explore
                Odisha. A few simple details are all you need to get started.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <FeatureChip icon="◷" text="Flexible rental" />
                <FeatureChip icon="✓" text="Easy booking" />
                <FeatureChip icon="⌁" text="Odisha journeys" />
              </div>
            </div>

            <div className="w-full shrink-0 rounded-2xl border border-white/90 bg-white/85 p-5 shadow-[0_12px_35px_rgba(30,58,43,0.07)] backdrop-blur-sm sm:p-6 lg:max-w-[285px]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8EFE6] text-2xl text-[#1E3A2B]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#1E3A2B]">
                    Ready for the road
                  </p>
                  <p className="mt-1 text-xs text-[#7B8179]">
                    Simple, secure booking
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-[#ECEBE4]" />

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F9E9E2] text-sm text-[#C45C3A]">
                  ✓
                </span>

                <div>
                  <p className="text-sm font-medium text-[#34473B]">
                    Documents checked at pickup
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#7B8179]">
                    Bring your original valid driving licence and an accepted
                    identity document when collecting your vehicle.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#F3F5EF] px-3 py-2.5">
                <span className="text-[#D96B43]">●</span>
                <span className="text-xs font-medium text-[#526456]">
                  No mandatory document photo upload
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Layout */}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(270px,0.72fr)_minmax(0,1.28fr)]">
            {/* Selected Vehicle */}
            <aside className="overflow-hidden rounded-[28px] bg-[#173B2D] text-white shadow-lg lg:sticky lg:top-5">
              <div className="relative min-h-[350px] overflow-hidden sm:min-h-[430px]">
                <img
                  src={vehicleImage}
                  alt={vehicleName}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/images/family.jpeg";
                  }}
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10291F] via-[#173B2D]/45 to-[#173B2D]/20" />

                <div className="relative flex min-h-[350px] flex-col justify-between p-5 sm:min-h-[430px] sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/25 bg-black/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
                      Selected ride
                    </span>

                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs">
                      {vehicleType}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFB08E]">
                      Explore Odisha
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
                      {vehicleName}
                    </h2>

                    <p className="mt-2 text-sm text-white/75">
                      Your ride. Your route. Your own pace.
                    </p>

                    <div className="mt-6 flex flex-wrap items-end gap-x-2 gap-y-1">
                      <span className="text-3xl font-semibold">
                        ₹{dailyRate.toLocaleString("en-IN")}
                      </span>
                      <span className="pb-1 text-sm text-white/70">/ day</span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-white/85">
                      <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                        ✓ Self-drive only
                      </div>
                      <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                        ✓ Odisha travel
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-4 text-center text-xs text-white/75 sm:p-5">
                <div>
                  <span className="block text-lg">◷</span>
                  Flexible hours
                </div>
                <div>
                  <span className="block text-lg">⌁</span>
                  Easy booking
                </div>
                <div>
                  <span className="block text-lg">✓</span>
                  Pickup check
                </div>
              </div>
            </aside>

            {/* Booking Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Rental Details */}
              <section className="rounded-3xl border border-[#E6E3DC] bg-white p-5 shadow-sm sm:p-6">
                <StepTitle
                  number="01"
                  title="Rental details"
                  subtitle="Choose how long you need your vehicle."
                />

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setRentalType("hourly");
                      setError("");
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      rentalType === "hourly"
                        ? "border-[#1E4936] bg-[#EDF3EC] ring-1 ring-[#1E4936]"
                        : "border-[#E4E5DE] hover:border-[#AAB7AA]"
                    }`}
                  >
                    <span className="text-xl">◷</span>
                    <span className="mt-2 block text-sm font-semibold">
                      Hourly rental
                    </span>
                    <span className="mt-1 block text-xs text-[#777F75]">
                      A few hours
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRentalType("multi-day");
                      setError("");
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      rentalType === "multi-day"
                        ? "border-[#1E4936] bg-[#EDF3EC] ring-1 ring-[#1E4936]"
                        : "border-[#E4E5DE] hover:border-[#AAB7AA]"
                    }`}
                  >
                    <span className="text-xl">▦</span>
                    <span className="mt-2 block text-sm font-semibold">
                      Multi-day rental
                    </span>
                    <span className="mt-1 block text-xs text-[#777F75]">
                      A longer trip
                    </span>
                  </button>
                </div>

                {rentalType === "hourly" && (
                  <div className="mt-4 rounded-2xl bg-[#F8F8F4] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">Rental duration</p>
                        <p className="mt-1 text-xs text-[#777F75]">
                          Estimated ₹
                          {Math.round(hourlyRate).toLocaleString("en-IN")} per
                          hour
                        </p>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl border border-[#E1E4DB] bg-white p-1">
                        <button
                          type="button"
                          aria-label="Decrease hours"
                          onClick={() =>
                            setHours((previous) => Math.max(1, previous - 1))
                          }
                          className="h-9 w-9 rounded-lg hover:bg-[#EDF3EC]"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center font-semibold">
                          {hours}
                        </span>

                        <button
                          type="button"
                          aria-label="Increase hours"
                          onClick={() =>
                            setHours((previous) => Math.min(24, previous + 1))
                          }
                          className="h-9 w-9 rounded-lg hover:bg-[#EDF3EC]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Pickup date">
                    <input
                      type="date"
                      name="startDate"
                      min={localToday}
                      onChange={handlePickupDateChange}
                      required
                      className={inputStyle}
                    />
                  </Field>

                  <Field label="Pickup time">
                    <input
                      type="time"
                      name="startTime"
                      onChange={() => setError("")}
                      required
                      className={inputStyle}
                    />
                  </Field>

                  <Field label="Return date">
                    <input
                      type="date"
                      name="endDate"
                      min={getDateValue("startDate") || localToday}
                      onChange={handleDateChange}
                      required
                      className={inputStyle}
                    />
                  </Field>

                  <Field label="Return time">
                    <input
                      type="time"
                      name="endTime"
                      onChange={() => setError("")}
                      required
                      className={inputStyle}
                    />
                  </Field>
                </div>

                {rentalType === "multi-day" && (
                  <p className="mt-3 text-xs font-medium text-[#4F6857]">
                    {rentalDays} rental day{rentalDays === 1 ? "" : "s"}{" "}
                    selected
                  </p>
                )}

                <p className="mt-4 rounded-xl bg-[#F0F4ED] p-3 text-xs leading-5 text-[#536858]">
                  This rental is for travel within Odisha only.
                </p>
              </section>

              {/* Customer Details */}
              <section className="rounded-3xl border border-[#E6E3DC] bg-white p-5 shadow-sm sm:p-6">
                <StepTitle
                  number="02"
                  title="Your information"
                  subtitle="Enter the details we can use to contact you."
                />

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      placeholder="As shown on your ID"
                      required
                      className={inputStyle}
                    />
                  </Field>

                  <Field label="Mobile number">
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      title="Enter a 10-digit mobile number"
                      required
                      className={inputStyle}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Email address">
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        className={inputStyle}
                      />
                    </Field>
                  </div>
                </div>
              </section>

              {/* Driving Licence */}
              <section className="rounded-3xl border border-[#E6E3DC] bg-white p-5 shadow-sm sm:p-6">
                <StepTitle
                  number="03"
                  title="Driving licence details"
                  subtitle="No document photo is required during online booking."
                />

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Driving licence number">
                    <input
                      type="text"
                      name="licenseNumber"
                      placeholder="Enter licence number"
                      required
                      className={inputStyle}
                    />
                  </Field>

                  <Field label="Licence expiry date">
                    <input
                      type="date"
                      name="licenseExpiry"
                      min={localToday}
                      required
                      className={inputStyle}
                    />
                  </Field>
                </div>

                <div className="mt-4 flex gap-3 rounded-2xl border border-[#DDE8DA] bg-[#F0F5EE] p-4">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <p className="text-sm font-semibold text-[#284A35]">
                      Documents checked at pickup
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#617362]">
                      Bring your original valid driving licence and an accepted
                      identity document. Our team will verify them before
                      handing over the vehicle.
                    </p>
                  </div>
                </div>
              </section>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D96B43] px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#BF5936] focus:outline-none focus:ring-2 focus:ring-[#D96B43] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting booking..." : "Review booking"}
                {!loading && <span>→</span>}
              </button>

              <p className="text-center text-xs leading-5 text-[#858A82]">
                Your booking is not confirmed until the details and vehicle
                availability are reviewed.
              </p>
            </form>
          </div>

          {/* Booking Summary */}
          <aside className="space-y-5 xl:sticky xl:top-5">
            <section className="rounded-3xl border border-[#E6E3DC] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Booking summary</h2>
                <span className="rounded-full bg-[#EDF3EC] px-3 py-1 text-xs font-medium text-[#42614A]">
                  Estimate
                </span>
              </div>

              <div className="mt-5 flex gap-3 rounded-2xl bg-[#F8F8F4] p-3">
                <img
                  src={vehicleImage}
                  alt={vehicleName}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/images/family.jpeg";
                  }}
                  className="h-20 w-24 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{vehicleName}</p>
                  <p className="mt-1 text-xs text-[#7B8179]">{vehicleType}</p>
                  <p className="mt-2 text-sm font-semibold text-[#D96B43]">
                    ₹
                    {Math.round(
                      rentalType === "hourly" ? hourlyRate : dailyRate,
                    ).toLocaleString("en-IN")}
                    <span className="font-normal text-[#7B8179]">
                      {" "}
                      / {rentalType === "hourly" ? "hour est." : "day"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4 border-b border-[#EAE7E0] pb-5">
                <SummaryRow
                  label="Rental type"
                  value={
                    rentalType === "hourly"
                      ? "Hourly rental"
                      : "Multi-day rental"
                  }
                />

                <SummaryRow
                  label="Duration"
                  value={
                    rentalType === "hourly"
                      ? `${hours} hour${hours === 1 ? "" : "s"}`
                      : `${rentalDays} day${rentalDays === 1 ? "" : "s"}`
                  }
                />

                <SummaryRow
                  label="Pickup"
                  value={
                    getDateValue("startDate")
                      ? `${getDateValue("startDate")}${
                          getDateValue("startTime")
                            ? ` · ${getDateValue("startTime")}`
                            : ""
                        }`
                      : "Not selected"
                  }
                />

                <SummaryRow
                  label="Return"
                  value={
                    getDateValue("endDate")
                      ? `${getDateValue("endDate")}${
                          getDateValue("endTime")
                            ? ` · ${getDateValue("endTime")}`
                            : ""
                        }`
                      : "Not selected"
                  }
                />
              </div>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-[#737A71]">Estimated total</p>
                  <p className="mt-1 text-xs text-[#92988F]">
                    Before any applicable extras
                  </p>
                </div>

                <p className="text-3xl font-semibold tracking-tight text-[#1E4936]">
                  ₹{estimatedTotal.toLocaleString("en-IN")}
                </p>
              </div>

              <p className="mt-4 text-xs leading-5 text-[#858A82]">
                Final price, availability, deposit and additional charges will
                be confirmed by the rental service.
              </p>
            </section>

            <section className="rounded-3xl bg-[#173B2D] p-5 text-white sm:p-6">
              <h3 className="font-semibold">Before you ride</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li>✓ Bring your valid original driving licence</li>
                <li>✓ Bring an accepted identity document</li>
                <li>✓ Complete verification and rental agreement</li>
                <li>✓ Keep travel within Odisha</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

function FeatureChip({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/75 px-3 py-2.5 text-xs font-medium text-[#385443] shadow-sm">
      <span className="text-base text-[#D96B43]">{icon}</span>
      {text}
    </div>
  );
}

function StepTitle({ number, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#173B2D] text-xs font-semibold text-white">
        {number}
      </span>
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-[#7B8179]">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-sm font-medium text-[#34473B]">
      {label}
      {children}
    </label>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-[#7B8179]">{label}</span>
      <span className="max-w-[62%] break-words text-right font-medium text-[#34473B]">
        {value}
      </span>
    </div>
  );
}

export default Booking;
