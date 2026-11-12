import { useState, useEffect } from "react";
import {
  CalendarDays,
  CarFront,
  ArrowRight,
  Search,
  SlidersHorizontal,
  MapPin,
  Clock3,
  ReceiptText,
} from "lucide-react";

const filters = ["All", "Upcoming", "Completed", "Cancelled"];

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatus = (booking) => {
  const status = String(
    booking.status || booking.booking_status || "Pending",
  ).toLowerCase();

  if (["cancelled", "canceled"].includes(status)) {
    return "Cancelled";
  }

  if (status === "completed") {
    return "Completed";
  }

  if (
    ["upcoming", "confirmed", "pending", "booked", "approved"].includes(status)
  ) {
    return "Upcoming";
  }

  return booking.status || booking.booking_status || "Pending";
};

const formatAmount = (amount) => {
  if (amount === undefined || amount === null || amount === "") {
    return "—";
  }

  const number = Number(amount);

  if (!Number.isFinite(number)) {
    return String(amount);
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL = (
          import.meta.env.VITE_API_URL || "http://localhost:8000"
        ).replace(/\/+$/, "");

        const response = await fetch(`${API_URL}/api/v1/users/bookingdata`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          const responseText = await response.text();

          console.error("Request URL:", response.url);
          console.error("Unexpected HTML response:", responseText);

          throw new Error(
            "Backend returned HTML instead of JSON. Check VITE_API_URL and your backend route.",
          );
        }

        const result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Failed to fetch booking data");
        }

        console.log("Bookings API response:", result);

        setBookings(Array.isArray(result.bookings) ? result.bookings : []);
      } catch (err) {
        console.error("Booking fetch error:", err);
        setError(err.message || "Unable to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const status = getStatus(booking);
    const matchesFilter = filter === "All" || status === filter;
    const query = search.trim().toLowerCase();

    const searchableValues = [
      booking.vehicle_name,
      booking.vehicle_id,
      booking.id,
      booking.booking_id,
      booking.category,
      booking.vehicle_type,
      booking.destination,
      booking.drop_location,
    ];

    const matchesSearch = searchableValues.some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(query),
    );

    return matchesFilter && matchesSearch;
  });

  const counts = {
    All: bookings.length,
    Upcoming: bookings.filter((booking) => getStatus(booking) === "Upcoming")
      .length,
    Completed: bookings.filter((booking) => getStatus(booking) === "Completed")
      .length,
    Cancelled: bookings.filter((booking) => getStatus(booking) === "Cancelled")
      .length,
  };

  return (
    <div className="min-w-0 space-y-7 bg-white text-black">
      {/* Page heading */}
      <section className="border-b border-gray-200 pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
          Your journeys
        </p>

        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              My Bookings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              View and manage your vehicle reservations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ReceiptText size={17} />
            <span>{bookings.length} reservations</span>
          </div>
        </div>
      </section>

      {/* Booking summary */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-lg border p-4 text-left transition-colors ${
              filter === item
                ? "border-black bg-gray-50"
                : "border-gray-200 bg-white hover:border-gray-400"
            }`}
          >
            <p className="text-sm text-gray-600">{item}</p>

            <p className="mt-3 text-2xl font-normal text-black">
              {counts[item]}
            </p>
          </button>
        ))}
      </section>

      {/* Search */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-gray-300 px-3.5 py-3 focus-within:border-black">
            <Search size={18} className="shrink-0 text-gray-500" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vehicle, booking ID or destination..."
              aria-label="Search bookings"
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <SlidersHorizontal size={17} />
            <span>{filteredBookings.length} results</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                filter === item
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Reservation history */}
      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
          <h2 className="text-base font-medium">Reservation History</h2>

          <span className="text-xs text-gray-500">
            {filteredBookings.length} bookings
          </span>
        </div>

        {loading ? (
          <div className="space-y-4 p-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-lg bg-gray-100"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
            >
              Try again
            </button>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredBookings.map((booking, index) => {
              const status = getStatus(booking);

              const bookingId =
                booking.booking_id ??
                booking.id ??
                booking.vehicle_id ??
                index + 1;

              const startDate =
                booking.start_date ??
                booking.booking_start_date ??
                booking.from_date;

              const endDate =
                booking.end_date ?? booking.booking_end_date ?? booking.to_date;

              const dateText =
                startDate && endDate
                  ? `${formatDate(startDate)} – ${formatDate(endDate)}`
                  : formatDate(
                      startDate ?? booking.booking_date ?? booking.created_at,
                    ) || "Dates not available";

              const amount =
                booking.total_amount ??
                booking.total_price ??
                booking.amount ??
                booking.daily_rate;

              const destination = booking.destination ?? booking.drop_location;

              const duration = booking.duration ?? booking.rental_duration;

              return (
                <article
                  key={bookingId}
                  className="p-4 transition-colors hover:bg-gray-50/70 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Vehicle details */}
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                        {booking.vehicle_image ? (
                          <img
                            src={booking.vehicle_image}
                            alt={booking.vehicle_name || "Booked vehicle"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <CarFront size={27} strokeWidth={1.5} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-medium text-black sm:text-base">
                          {booking.vehicle_name || "Vehicle"}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {booking.vehicle_type ||
                            booking.category ||
                            "Self-drive"}
                        </p>

                        <p className="mt-1.5 text-xs text-gray-500">
                          Booking ID: {bookingId}
                        </p>
                      </div>
                    </div>

                    {/* Trip details */}
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="flex items-center gap-2 text-sm text-gray-700">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-gray-500"
                        />
                        <span>{dateText}</span>
                      </p>

                      {destination && (
                        <p className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin
                            size={15}
                            className="shrink-0 text-gray-500"
                          />
                          <span className="truncate">
                            Destination: {destination}
                          </span>
                        </p>
                      )}

                      {duration && (
                        <p className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock3 size={14} />
                          {duration}
                        </p>
                      )}
                    </div>

                    {/* Price and status */}
                    <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-3 sm:min-w-[150px] sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-normal text-black">
                          {formatAmount(amount)}
                        </p>

                        <span className="mt-2 inline-block rounded-md border border-gray-300 px-2.5 py-1 text-xs font-normal text-gray-600">
                          {status}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          console.log("Selected booking:", booking);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-xs font-medium text-black transition hover:bg-gray-100"
                      >
                        Details
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center px-5 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200">
              <CalendarDays size={22} strokeWidth={1.5} />
            </div>

            <h3 className="mt-4 text-base font-medium">
              {bookings.length === 0 ? "No bookings yet" : "No bookings found"}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              {bookings.length === 0
                ? "Your vehicle reservations will appear here."
                : "Try another search or choose a different booking status."}
            </p>

            {(search || filter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Bookings;
