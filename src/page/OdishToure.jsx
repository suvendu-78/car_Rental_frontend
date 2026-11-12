import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeftRight,
  CalendarDays,
  CarFront,
  Check,
  Clock3,
  MapPin,
  MapPinned,
  Search,
  ShieldCheck,
  Users,
  Fuel,
  Gauge,
} from "lucide-react";

const vehicles = [
  {
    id: "car-1",
    name: "Maruti Swift",
    type: "Hatchback",
    image: "/images/swift.jpeg",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    dailyRate: 1800,
    hourlyRate: 100,
    modes: ["Self Drive", "With Driver"],
  },
  {
    id: "car-2",
    name: "Hyundai i20",
    type: "Hatchback",
    image: "/images/i20.jpeg",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    dailyRate: 2200,
    hourlyRate: 120,
    modes: ["Self Drive", "With Driver"],
  },
  {
    id: "car-3",
    name: "Honda City",
    type: "Sedan",
    image: "/images/honda-city.jpeg",
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    dailyRate: 3000,
    hourlyRate: 160,
    modes: ["Self Drive", "With Driver"],
  },
  {
    id: "car-4",
    name: "Hyundai Creta",
    type: "SUV",
    image: "/images/creta.jpeg",
    seats: 5,
    fuel: "Diesel",
    transmission: "Manual",
    dailyRate: 3500,
    hourlyRate: 180,
    modes: ["Self Drive", "With Driver"],
  },
  {
    id: "car-5",
    name: "Mahindra Scorpio",
    type: "SUV",
    image: "/images/scorpio.jpeg",
    seats: 7,
    fuel: "Diesel",
    transmission: "Manual",
    dailyRate: 4200,
    hourlyRate: 220,
    modes: ["Self Drive", "With Driver"],
  },
  {
    id: "car-6",
    name: "Force Traveller",
    type: "Traveller",
    image: "/images/traveller.jpeg",
    seats: 12,
    fuel: "Diesel",
    transmission: "Manual",
    dailyRate: 5500,
    hourlyRate: 300,
    modes: ["With Driver"],
  },
];

const vehicleCategories = [
  { name: "All Cars", icon: "🚘" },
  { name: "Hatchback", icon: "🚗" },
  { name: "Sedan", icon: "🚙" },
  { name: "SUV", icon: "🚙" },
  { name: "Traveller", icon: "🚐" },
];

const OdishaTours = () => {
  const navigate = useNavigate();

  const [rentalMode, setRentalMode] = useState("Self Drive");
  const [tripType, setTripType] = useState("Round Trip");
  const [pickupCity, setPickupCity] = useState("Bhubaneswar");
  const [destination, setDestination] = useState("Puri");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("18:00");
  const [activeCategory, setActiveCategory] = useState("All Cars");
  const [searchApplied, setSearchApplied] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const categoryMatches =
        activeCategory === "All Cars" || vehicle.type === activeCategory;

      const modeMatches = vehicle.modes.includes(rentalMode);

      return categoryMatches && modeMatches;
    });
  }, [activeCategory, rentalMode]);

  const handleSearch = (event) => {
    event.preventDefault();

    if (!pickupDate || !returnDate) {
      alert("Please select your pickup and return dates.");
      return;
    }

    if (returnDate < pickupDate) {
      alert("Return date cannot be before pickup date.");
      return;
    }

    if (returnDate === pickupDate && returnTime <= pickupTime) {
      alert("Return time must be after pickup time.");
      return;
    }

    setSearchApplied(true);

    document.getElementById("available-cars")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleBookNow = (vehicle) => {
    const bookingDetails = {
      vehicle,
      rentalMode,
      tripType,
      pickupCity,
      destination,
      startDate: pickupDate,
      startTime: pickupTime,
      endDate: returnDate,
      endTime: returnTime,
    };

    navigate("/Booking", {
      state: bookingDetails,
    });
  };

  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#1E3A2B]">
      {/* Hero banner — existing website header is separate */}
      <section className="relative isolate min-h-[360px] overflow-hidden bg-[#16372B] sm:min-h-[420px]">
        <img
          src="/images/Hero.jpeg"
          alt="Explore Odisha by car"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102F25]/95 via-[#102F25]/70 to-[#102F25]/15" />

        <div className="mx-auto flex min-h-[360px] max-w-[1450px] items-center px-5 py-12 sm:min-h-[420px] sm:px-8 lg:px-12">
          <div className="max-w-2xl text-white">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F07850] sm:text-sm">
              Your journey, your choice
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Rent a Car,
              <br />
              Explore <span className="text-[#F07850]">Odisha</span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 sm:text-base">
              Choose your car, select your rental type and hit the road. From
              city rides to round trips, find the right car for your journey.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs sm:text-sm">
              <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2.5">
                <Check className="mr-1 inline h-4 w-4 text-[#F07850]" />
                Self Drive
              </span>
              <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2.5">
                <Check className="mr-1 inline h-4 w-4 text-[#F07850]" />
                With Driver
              </span>
              <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-2.5">
                <Check className="mr-1 inline h-4 w-4 text-[#F07850]" />
                Round Trips
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and booking form */}
      <section className="relative z-10 mx-auto -mt-7 max-w-[1380px] px-4 sm:px-6">
        <form
          onSubmit={handleSearch}
          className="rounded-2xl border border-[#1E3A2B]/10 bg-white p-4 shadow-[0_12px_40px_rgba(30,58,43,0.10)] sm:p-6 lg:p-7"
        >
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Find Your Rental Car
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Choose your rental preferences to find available vehicles.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EDF3EC] px-3 py-2 text-xs font-medium text-[#1E3A2B]">
              <ShieldCheck className="h-4 w-4" />
              Rental across Odisha
            </div>
          </div>

          {/* Rental mode */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setRentalMode("Self Drive")}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                rentalMode === "Self Drive"
                  ? "border-[#1E3A2B] bg-[#EDF3EC] ring-1 ring-[#1E3A2B]"
                  : "border-gray-200 bg-white hover:border-[#1E3A2B]/40"
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E3A2B] text-white">
                <CarFront className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-semibold">Self Drive</span>
                <span className="mt-1 block text-xs text-gray-500">
                  Drive the car yourself
                </span>
              </span>
              <span className="ml-auto">
                {rentalMode === "Self Drive" && (
                  <Check className="h-5 w-5 text-[#D96B43]" />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRentalMode("With Driver")}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                rentalMode === "With Driver"
                  ? "border-[#1E3A2B] bg-[#EDF3EC] ring-1 ring-[#1E3A2B]"
                  : "border-gray-200 bg-white hover:border-[#1E3A2B]/40"
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D96B43] text-white">
                <Users className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-semibold">With Driver</span>
                <span className="mt-1 block text-xs text-gray-500">
                  Travel with a driver
                </span>
              </span>
              <span className="ml-auto">
                {rentalMode === "With Driver" && (
                  <Check className="h-5 w-5 text-[#D96B43]" />
                )}
              </span>
            </button>
          </div>

          {/* Trip type */}
          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold">Journey type</p>

            <div className="flex flex-wrap gap-2">
              {["Round Trip", "One Way"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTripType(type)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                    tripType === type
                      ? "border-[#1E3A2B] bg-[#1E3A2B] text-white"
                      : "border-gray-200 bg-white hover:border-[#1E3A2B]"
                  }`}
                >
                  {type === "Round Trip" ? (
                    <ArrowLeftRight className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Pickup and destination */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="pickup-city"
                className="mb-2 block text-sm font-medium"
              >
                Pickup city
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D96B43]" />
                <select
                  id="pickup-city"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAF9F6] pl-9 pr-3 text-sm outline-none focus:border-[#1E3A2B]"
                >
                  <option>Bhubaneswar</option>
                  <option>Cuttack</option>
                  <option>Puri</option>
                  <option>Rourkela</option>
                  <option>Sambalpur</option>
                  <option>Berhampur</option>
                  <option>Koraput</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="destination"
                className="mb-2 block text-sm font-medium"
              >
                Destination
              </label>
              <div className="relative">
                <MapPinned className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D96B43]" />
                <select
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAF9F6] pl-9 pr-3 text-sm outline-none focus:border-[#1E3A2B]"
                >
                  <option>Puri</option>
                  <option>Bhubaneswar</option>
                  <option>Konark</option>
                  <option>Chilika</option>
                  <option>Cuttack</option>
                  <option>Deomali</option>
                  <option>Similipal</option>
                  <option>Daringbadi</option>
                  <option>Other Odisha destination</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="pickup-date"
                className="mb-2 block text-sm font-medium"
              >
                Pickup date
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D96B43]" />
                <input
                  id="pickup-date"
                  type="date"
                  required
                  min={today}
                  value={pickupDate}
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                    if (returnDate && e.target.value > returnDate) {
                      setReturnDate(e.target.value);
                    }
                  }}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAF9F6] pl-9 pr-2 text-sm outline-none focus:border-[#1E3A2B]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pickup-time"
                className="mb-2 block text-sm font-medium"
              >
                Pickup time
              </label>
              <div className="relative">
                <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D96B43]" />
                <input
                  id="pickup-time"
                  type="time"
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAF9F6] pl-9 pr-2 text-sm outline-none focus:border-[#1E3A2B]"
                />
              </div>
            </div>
          </div>

          {/* Return date and time */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="return-date"
                className="mb-2 block text-sm font-medium"
              >
                Return date
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D96B43]" />
                <input
                  id="return-date"
                  type="date"
                  required
                  min={pickupDate || today}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAF9F6] pl-9 pr-2 text-sm outline-none focus:border-[#1E3A2B]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="return-time"
                className="mb-2 block text-sm font-medium"
              >
                Return time
              </label>
              <div className="relative">
                <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D96B43]" />
                <input
                  id="return-time"
                  type="time"
                  required
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAF9F6] pl-9 pr-2 text-sm outline-none focus:border-[#1E3A2B]"
                />
              </div>
            </div>

            <div className="flex items-end lg:col-span-2">
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D96B43] px-5 text-sm font-semibold text-white transition hover:bg-[#C55A35]"
              >
                <Search className="h-4 w-4" />
                Find Available Cars
              </button>
            </div>
          </div>

          <p className="mt-4 rounded-lg bg-[#EDF3EC] px-3 py-3 text-xs leading-5 text-[#496653]">
            <ShieldCheck className="mr-2 inline h-4 w-4" />
            Travel within Odisha. Final availability and charges are confirmed
            by the rental service.
          </p>
        </form>
      </section>

      {/* Available vehicles */}
      <section
        id="available-cars"
        className="mx-auto max-w-[1450px] scroll-mt-28 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D96B43]">
              Find your ride
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {searchApplied
                ? "Cars for Your Journey"
                : "Available Rental Cars"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {searchApplied
                ? `${pickupCity} to ${destination} · ${tripType} · ${rentalMode}`
                : "Choose the right vehicle for your next trip."}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {filteredVehicles.length} vehicles listed
          </p>
        </div>

        {/* Categories */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {vehicleCategories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => setActiveCategory(category.name)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                activeCategory === category.name
                  ? "border-[#1E3A2B] bg-[#1E3A2B] text-white"
                  : "border-gray-200 bg-white text-[#1E3A2B] hover:border-[#1E3A2B]"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Vehicle cards */}
        {filteredVehicles.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.map((vehicle) => (
              <article
                key={vehicle.id}
                className="group overflow-hidden rounded-2xl border border-[#1E3A2B]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-[#EAE9E2]">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1E3A2B] shadow-sm">
                    {vehicle.type}
                  </span>

                  <span className="absolute right-3 top-3 rounded-full bg-[#1E3A2B]/90 px-3 py-1.5 text-xs font-medium text-white">
                    {rentalMode}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{vehicle.name}</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {vehicle.type} · {vehicle.transmission}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-[#1E3A2B]">
                        ₹{vehicle.dailyRate.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-gray-500">per day</p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-gray-100 py-4">
                    <div className="text-center">
                      <Users className="mx-auto h-4 w-4 text-[#D96B43]" />
                      <p className="mt-2 text-xs font-medium">
                        {vehicle.seats} Seats
                      </p>
                    </div>
                    <div className="text-center">
                      <Fuel className="mx-auto h-4 w-4 text-[#D96B43]" />
                      <p className="mt-2 text-xs font-medium">{vehicle.fuel}</p>
                    </div>
                    <div className="text-center">
                      <Gauge className="mx-auto h-4 w-4 text-[#D96B43]" />
                      <p className="mt-2 text-xs font-medium">
                        {vehicle.transmission}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Hourly estimate</p>
                      <p className="mt-1 font-semibold">
                        ₹{vehicle.hourlyRate}/hr
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBookNow(vehicle)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#D96B43] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#C55A35]"
                    >
                      Book Now <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
            <CarFront className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-3 font-semibold">No vehicles in this category</h3>
            <p className="mt-2 text-sm text-gray-500">
              Choose another category or rental mode.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All Cars")}
              className="mt-4 rounded-lg bg-[#1E3A2B] px-4 py-2.5 text-sm font-semibold text-white"
            >
              View All Cars
            </button>
          </div>
        )}
      </section>

      {/* Why choose us */}
      <section className="border-y border-[#1E3A2B]/10 bg-white">
        <div className="mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D96B43]">
              Travel with confidence
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              A Better Way to Travel
            </h2>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Vehicles",
                text: "Vehicle details and rental conditions can be checked before booking.",
              },
              {
                icon: CarFront,
                title: "Flexible Rental",
                text: "Choose self drive or travel with a driver.",
              },
              {
                icon: Clock3,
                title: "Flexible Schedule",
                text: "Select pickup and return dates and times.",
              },
              {
                icon: MapPinned,
                title: "Explore Odisha",
                text: "Plan your journey around destinations in Odisha.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#1E3A2B]/10 bg-[#F8F7F3] p-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A2B] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#1E3A2B] p-6 text-white sm:flex-row sm:items-center sm:p-9">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready for Your Next Journey?
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Select a car, set your schedule and get your booking started.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              document.getElementById("available-cars")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#D96B43] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#C55A35]"
          >
            Browse Cars <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default OdishaTours;
