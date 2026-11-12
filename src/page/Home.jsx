import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  CarFront,
  Bike,
  BusFront,
  Hotel,
  Utensils,
  Hospital,
  Wrench,
  ShieldCheck,
  IndianRupee,
  Headset,
  Leaf,
  Mountain,
  Clock,
} from "lucide-react";

// HERO SLIDES
const heroSlides = [
  {
    image: "/images/Hero.jpeg",
    heading: "Discover Odisha.",
    accent: "Drive Your Own Story.",
    description:
      "Find the perfect ride, discover beautiful destinations and explore Odisha at your own pace.",
    label: "EXPLORE THE SOUL OF ODISHA",
  },
  {
    image: "/images/Hero_solo.jpeg",
    heading: "Take the Scenic",
    accent: "Road Less Travelled.",
    description:
      "Enjoy the freedom of the open road and create unforgettable memories.",
    label: "YOUR JOURNEY YOUR RULES",
  },
  {
    image: "/images/Hero_family.jpeg",
    heading: "Every Journey",
    accent: "Brings You Closer.",
    description:
      "Discover comfortable rides and amazing destinations with your loved ones.",
    label: "MAKE MEMORIES TOGETHER",
  },
];

// HERO COLLAGE IMAGES
// Add more image objects here whenever you want.
const collageImages = [
  { src: "/images/Hero.jpeg", alt: "Odisha road journey" },
  { src: "/images/Hero_solo.jpeg", alt: "Solo adventure" },
  { src: "/images/Hero_family.jpeg", alt: "Family travel" },
  { src: "/images/solo.jpeg", alt: "Solo bike ride" },
  { src: "/images/couple.jpeg", alt: "Couple road trip" },
  { src: "/images/family.jpeg", alt: "Family journey" },
  { src: "/images/suntemple.jpeg", alt: "Konark Sun Temple" },
  { src: "/images/chilika.jpeg", alt: "Chilika Lake" },
  { src: "/images/deomali.jpeg", alt: "Deomali hills" },
  { src: "/images/tikarpada.jpeg", alt: "Tikarapada destination" },
  { src: "/images/puri.jpg", alt: "Puri beach" },
  { src: "/images/konark.jpg", alt: "Konark heritage" },
  { src: "/images/simlipal.jpg", alt: "Similipal forest" },
  { src: "/images/hotel.jpeg", alt: "Travel accommodation" },
  { src: "/images/restaurant.jpeg", alt: "Local dining" },
];

// DESTINATIONS
const destinations = [
  {
    name: "Puri",
    description: "Beach • Temple • Leisure",
    image: "/images/puri.jpg",
  },
  {
    name: "Konark",
    description: "Heritage • History",
    image: "/images/konark.jpg",
  },
  {
    name: "Chilika",
    description: "Lake • Nature • Birds",
    image: "/images/chilika.jpeg",
  },
  {
    name: "Deomali",
    description: "Hiking • Mountains",
    image: "/images/deomali.jpeg",
  },
  {
    name: "Similipal",
    description: "Forest • Wildlife",
    image: "/images/simlipal.jpg",
  },
];

// CATEGORIES
const categories = [
  {
    name: "Solo Ride",
    subtitle: "Freedom on Two Wheels",
    description:
      "Explore Odisha independently with comfortable bikes and scooters.",
    image: "/images/solo.jpeg",
    icon: Bike,
    route: "/solo",
    tag: "Bike & Scooter",
  },
  {
    name: "Couple Ride",
    subtitle: "Comfortable Journey for Two",
    description:
      "Enjoy beautiful road trips with your partner in a comfortable car.",
    image: "/images/couple.jpeg",
    icon: CarFront,
    route: "/solo",
    tag: "Cars & SUVs",
  },
  {
    name: "Family Ride",
    subtitle: "Travel Together",
    description:
      "Discover destinations and create wonderful memories together.",
    image: "/images/family.jpeg",
    icon: BusFront,
    route: "/solo",
    tag: "Family Vehicles",
  },
  {
    name: "Hotels",
    subtitle: "Relax and Recharge",
    description: "Discover comfortable stays across beautiful Odisha.",
    image: "/images/hotel.jpeg",
    icon: Hotel,
    route: "/hotels",
    tag: "Stay & Explore",
  },
  {
    name: "Restaurants",
    subtitle: "Taste Odisha",
    description: "Discover local restaurants and delicious regional food.",
    image: "/images/restaurant.jpeg",
    icon: Utensils,
    route: "/restaurants",
    tag: "Food & Dining",
  },
  {
    name: "Healthcare",
    subtitle: "Travel Safely",
    description: "Find healthcare facilities during your journey.",
    image: "/images/hospital.jpeg",
    icon: Hospital,
    route: "/services",
    tag: "Nearby Services",
  },
  {
    name: "Mechanic",
    subtitle: "Roadside Assistance",
    description: "Find vehicle repair and maintenance services.",
    image: "/images/mechanic.jpeg",
    icon: Wrench,
    route: "/services",
    tag: "Vehicle Support",
  },
];

// TOUR PACKAGES
const tourPackages = [
  {
    name: "Puri Beach Escape",
    location: "Puri, Odisha",
    duration: "2 Days / 1 Night",
    category: "Beach Tour",
    image: "/images/puri.jpg",
    description:
      "Enjoy beautiful beaches, Jagannath Temple and the peaceful coastal atmosphere.",
  },
  {
    name: "Konark Heritage Tour",
    location: "Konark, Odisha",
    duration: "1 Day",
    category: "Heritage Tour",
    image: "/images/konark.jpg",
    description:
      "Explore the iconic Sun Temple and discover Odisha's rich architectural heritage.",
  },
  {
    name: "Chilika Nature Escape",
    location: "Chilika, Odisha",
    duration: "2 Days / 1 Night",
    category: "Nature Tour",
    image: "/images/chilika.jpeg",
    description:
      "Experience the beauty of Chilika Lake, scenic views and birdwatching.",
  },
  {
    name: "Deomali Adventure",
    location: "Koraput, Odisha",
    duration: "3 Days / 2 Nights",
    category: "Adventure Tour",
    image: "/images/deomali.jpeg",
    description:
      "Explore Odisha's highest peak with beautiful mountain landscapes.",
  },
];

// OFFERS
const offers = [
  {
    title: "Weekend Getaway",
    subtitle: "Special travel offers",
    discount: "UP TO 30% OFF",
    image: "/images/weekend.jpg",
  },
  {
    title: "Explore Odisha",
    subtitle: "Discover new destinations",
    discount: "SPECIAL DEALS",
    image: "/images/odisha.jpg",
  },
  {
    title: "Long Drive Special",
    subtitle: "Make every kilometre count",
    discount: "EXCLUSIVE OFFERS",
    image: "/images/long-drive.jpg",
  },
];

// FAQ
const faqs = [
  {
    question: "What vehicles are available on MapMySafar?",
    answer:
      "You can explore bikes, scooters, cars and SUVs depending on availability.",
  },
  {
    question: "Can I book a vehicle for multiple days?",
    answer:
      "Yes. You can select hourly or multi-day rental options based on vehicle availability.",
  },
  {
    question: "Can I travel outside my pickup city?",
    answer:
      "Travel within permitted Odisha routes is subject to the vehicle's rental terms and restrictions.",
  },
  {
    question: "How can I manage my booking?",
    answer:
      "Use the Manage Booking option to access your booking details and available booking actions.",
  },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Automatic hero slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (!pickup || !pickupDate || !returnDate) {
      alert("Please select pickup location and travel dates.");
      return;
    }

    if (new Date(returnDate) < new Date(pickupDate)) {
      alert("Return date cannot be before pickup date.");
      return;
    }

    const params = new URLSearchParams({
      pickup,
      destination,
      pickupDate,
      returnDate,
    });

    window.location.href = `/solo?${params.toString()}`;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F7F5] text-[#17231E]">
      <div className="font-['DM_Sans']">
        {/* NAVBAR */}

        {/* HERO SECTION */}

        <section className="relative px-4 pt-5 sm:px-7 lg:px-10">
          <div className="mx-auto max-w-[1300px] text-center">
            <p className="text-xs font-bold tracking-[.3em] text-[#D96B43]">
              EXPLORE ODISHA YOUR WAY
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[60px]">
              Discover Odisha.
              <span className="block text-[#123B2D]">
                Drive Your Own Story.
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#68736D] sm:text-base">
              From beautiful coastal roads to peaceful hill destinations,
              discover Odisha with the perfect ride for every journey.
            </p>

            {/* STATS */}

            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <div>
                <h3 className="text-2xl font-extrabold text-[#123B2D]">30+</h3>
                <p className="text-xs text-gray-500">Destinations</p>
              </div>

              <div className="h-12 w-px bg-gray-200" />

              <div>
                <h3 className="text-2xl font-extrabold text-[#123B2D]">7+</h3>
                <p className="text-xs text-gray-500">Travel Services</p>
              </div>

              <div className="h-12 w-px bg-gray-200" />

              <div>
                <h3 className="text-2xl font-extrabold text-[#123B2D]">24×7</h3>
                <p className="text-xs text-gray-500">Travel Support</p>
              </div>
            </div>
          </div>

          {/* INFINITE MOVING IMAGE COLLAGE */}

          <div className="mapsaf-collage-window mx-auto mt-5 max-w-[1450px] sm:mt-6">
            <div className="mapsaf-collage-track">
              {[...collageImages, ...collageImages].map((image, index) => (
                <div
                  className="mapsaf-collage-card"
                  key={`${index}-${image.src}`}
                  aria-hidden={
                    index >= collageImages.length ? "true" : undefined
                  }
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index < 5 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BOOKING SEARCH */}

          <div className="relative z-20 mx-auto -mt-1 max-w-[1200px] rounded-3xl border border-[#E8E1D5] bg-white p-4 shadow-xl sm:p-7">
            <div className="mb-6 flex flex-wrap gap-3">
              <NavLink
                to="/solo"
                className="rounded-full bg-[#123B2D] px-6 py-3 text-xs font-bold text-white"
              >
                <CarFront className="mr-2 inline" size={17} />
                Self Drive
              </NavLink>

              <NavLink
                to="/cityRide"
                className="rounded-full px-5 py-3 text-xs font-semibold text-gray-600 hover:bg-[#F1F1EC]"
              >
                <CarFront className="mr-2 inline" size={16} />
                City Ride
              </NavLink>

              <NavLink
                to="/tours"
                className="rounded-full px-5 py-3 text-xs font-semibold text-gray-600 hover:bg-[#F1F1EC]"
              >
                <Mountain className="mr-2 inline" size={16} />
                Tour Packages
              </NavLink>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {/* PICKUP LOCATION */}

              <label className="rounded-xl border border-gray-200 bg-[#FAFBF9] p-3">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                  <MapPin size={14} className="text-[#D96B43]" />
                  Pickup Location
                </span>

                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="mt-3 w-full bg-transparent text-sm font-bold outline-none"
                >
                  <option value="">Select City</option>
                  {[
                    "Bhubaneswar",
                    "Puri",
                    "Cuttack",
                    "Konark",
                    "Koraput",
                    "Sambalpur",
                    "Rourkela",
                    "Berhampur",
                  ].map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </label>

              {/* DESTINATION */}

              <label className="rounded-xl border border-gray-200 bg-[#FAFBF9] p-3">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                  <MapPin size={14} className="text-[#D96B43]" />
                  Destination
                </span>

                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="mt-3 w-full bg-transparent text-sm font-bold outline-none"
                >
                  <option value="">Select Destination</option>
                  {[
                    "Puri",
                    "Konark",
                    "Chilika",
                    "Deomali",
                    "Similipal",
                    "Tikarapada",
                    "Bhubaneswar",
                  ].map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </label>

              {/* PICKUP DATE */}

              <label className="rounded-xl border border-gray-200 bg-[#FAFBF9] p-3">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                  <CalendarDays size={14} className="text-[#D96B43]" />
                  Pickup Date
                </span>

                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="mt-3 w-full bg-transparent text-sm font-bold outline-none"
                />
              </label>

              {/* RETURN DATE */}

              <label className="rounded-xl border border-gray-200 bg-[#FAFBF9] p-3">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                  <CalendarDays size={14} className="text-[#D96B43]" />
                  Return Date
                </span>

                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="mt-3 w-full bg-transparent text-sm font-bold outline-none"
                />
              </label>

              {/* SEARCH BUTTON */}

              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#D96B43] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#C65A35]"
              >
                Find Your Ride
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* QUICK SERVICES */}

        <section className="px-5 py-14 lg:px-10">
          <div className="mx-auto grid max-w-[1250px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["Self Drive", CarFront, "/solo"],
              ["City Ride", CarFront, "/cityRide"],
              ["Tour Packages", Mountain, "/tours"],
              ["Hotels", Hotel, "/hotels"],
              ["Restaurants", Utensils, "/restaurants"],
              ["Travel Support", Wrench, "/services"],
            ].map(([name, Icon, path]) => (
              <NavLink
                to={path}
                key={name}
                className="rounded-2xl border border-gray-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-[#D96B43] hover:shadow-lg"
              >
                <Icon size={27} className="mx-auto text-[#123B2D]" />
                <h3 className="mt-3 text-sm font-bold">{name}</h3>
                <p className="mt-1 text-[10px] text-gray-500">
                  Explore services
                </p>
              </NavLink>
            ))}
          </div>
        </section>

        {/* CITY RIDE SECTION */}

        <section className="px-5 pb-16 lg:px-10">
          <div className="mx-auto max-w-[1320px] overflow-hidden rounded-3xl bg-[#123B2D]">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[340px]">
                <img
                  src="/images/city-road.jpg"
                  alt="City ride"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#123B2D]/20 to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-8 text-white sm:p-12">
                <p className="text-xs font-bold tracking-[.25em] text-[#F4A27B]">
                  QUICK CITY TRAVEL
                </p>

                <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
                  Going Somewhere
                  <span className="block text-[#F07850]">Nearby?</span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/75">
                  Need to travel across the city? Book a comfortable local ride
                  for shopping, office commutes, meetings and everyday trips.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="text-[#F07850]" size={19} />
                    Flexible Rides
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="text-[#F07850]" size={19} />
                    Local Trips
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CarFront className="text-[#F07850]" size={19} />
                    Comfortable Cars
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="text-[#F07850]" size={19} />
                    Reliable Travel
                  </div>
                </div>

                <NavLink
                  to="/cityRide"
                  className="mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-[#D96B43] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#C65A35]"
                >
                  Book a City Ride
                  <ArrowRight size={19} />
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        {/* DESTINATIONS */}

        <section className="bg-white px-5 py-16 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="text-center">
              <p className="text-xs font-bold tracking-[.25em] text-[#D96B43]">
                DISCOVER ODISHA
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
                Best Places to Explore
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Find beautiful destinations for your next road trip.
              </p>
            </div>

            <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {destinations.map((place) => (
                <NavLink
                  to="/tours"
                  key={place.name}
                  className="relative h-[340px] min-w-[240px] flex-1 snap-start overflow-hidden rounded-2xl bg-[#123B2D]"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{place.name}</h3>
                    <p className="mt-2 text-xs text-white/80">
                      {place.description}
                    </p>
                    <span className="mt-4 flex items-center gap-2 text-xs font-bold text-[#F4A27B]">
                      Explore destination
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </section>

        {/* WHY MAPMYSAFAR */}

        <section className="px-5 py-16 lg:px-10">
          <div className="mx-auto grid max-w-[1250px] gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[.25em] text-[#D96B43]">
                YOUR JOURNEY, OUR PRIORITY
              </p>

              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.045em]">
                Travel Better.
                <span className="block text-[#123B2D]">Explore Freely.</span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500">
                MapMySafar makes exploring Odisha easier with vehicle rentals,
                destination discovery and helpful travel services in one place.
              </p>

              <NavLink
                to="/about"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#123B2D] px-6 py-3 text-sm font-bold text-white hover:bg-[#D96B43]"
              >
                Know About Us
                <ArrowRight size={17} />
              </NavLink>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                [ShieldCheck, "Verified Vehicles", "Reliable travel options"],
                [IndianRupee, "Transparent Pricing", "Know your costs"],
                [Headset, "Travel Assistance", "Support when needed"],
                [Leaf, "Local Experiences", "Discover Odisha"],
              ].map(([Icon, title, description]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <Icon size={27} className="text-[#D96B43]" />
                  <h3 className="mt-5 text-sm font-bold">{title}</h3>
                  <p className="mt-2 text-xs text-gray-500">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VEHICLE & SERVICE CATEGORIES */}

        <section className="bg-[#EEF1EC] px-5 py-16 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-9">
              <p className="text-xs font-bold tracking-[.25em] text-[#D96B43]">
                FIND YOUR EXPERIENCE
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
                Explore by Category
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <NavLink
                    to={category.route}
                    key={category.name}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                      <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                        <Icon size={20} />
                        <h3 className="text-xl font-bold">{category.name}</h3>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-bold text-[#D96B43]">
                        {category.subtitle}
                      </p>

                      <p className="mt-3 min-h-[55px] text-xs leading-6 text-gray-500">
                        {category.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-[11px] font-semibold text-[#123B2D]">
                          {category.tag}
                        </span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D96B43] text-white">
                          <ArrowRight size={17} />
                        </span>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOUR PACKAGES SECTION */}

        <section className="bg-white px-5 py-16 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-bold tracking-[.25em] text-[#D96B43]">
                  CURATED TRAVEL EXPERIENCES
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
                  Explore Our Tour Packages
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
                  Discover handpicked destinations, exciting experiences and
                  memorable journeys across Odisha.
                </p>
              </div>

              <NavLink
                to="/tours"
                className="inline-flex items-center gap-2 rounded-full bg-[#123B2D] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#D96B43]"
              >
                View All Tours
                <ArrowRight size={16} />
              </NavLink>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tourPackages.map((tour) => (
                <NavLink
                  to="/tours"
                  key={tour.name}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-[220px] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-2 text-[10px] font-bold text-[#123B2D] shadow">
                      {tour.category}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="p-5">
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={14} className="text-[#D96B43]" />
                      {tour.location}
                    </p>

                    <h3 className="mt-3 text-lg font-extrabold text-[#123B2D]">
                      {tour.name}
                    </h3>

                    <p className="mt-3 min-h-[65px] text-xs leading-6 text-gray-500">
                      {tour.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <CalendarDays size={15} className="text-[#D96B43]" />
                        {tour.duration}
                      </span>

                      <span className="flex items-center gap-1 text-xs font-bold text-[#D96B43]">
                        Explore <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

            <div className="mt-10 text-center">
              <NavLink
                to="/tours"
                className="inline-flex items-center gap-3 rounded-xl bg-[#D96B43] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#C65A35]"
              >
                Discover All Tour Packages
                <ArrowRight size={18} />
              </NavLink>
            </div>
          </div>
        </section>

        {/* OFFERS */}

        <section className="px-5 py-16 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <p className="text-xs font-bold tracking-[.25em] text-[#D96B43]">
              EXCLUSIVE DEALS
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
              Special Offers for Your Journey
            </h2>

            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {offers.map((offer) => (
                <div
                  key={offer.title}
                  className="group relative h-[270px] overflow-hidden rounded-2xl bg-[#123B2D]"
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 p-6 text-white">
                    <span className="rounded-full bg-[#D96B43] px-3 py-1 text-[10px] font-bold">
                      {offer.discount}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold">{offer.title}</h3>

                    <p className="mt-2 text-xs text-white/80">
                      {offer.subtitle}
                    </p>

                    <NavLink
                      to="/offers"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#F4A27B]"
                    >
                      Explore Offer
                      <ArrowRight size={16} />
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIDDEN GEMS */}

        <section className="px-5 pb-16 lg:px-10">
          <div className="mx-auto max-w-[1320px] rounded-3xl bg-[#123B2D] p-8 text-white sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold tracking-[.25em] text-[#F4A27B]">
                  BEYOND THE USUAL
                </p>

                <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em]">
                  Discover Odisha's
                  <span className="block text-[#F07850]">Hidden Gems.</span>
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-white/75">
                  Find beautiful hidden destinations, peaceful landscapes and
                  unforgettable road trip experiences.
                </p>

                <NavLink
                  to="/tours"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D96B43] px-6 py-3 text-sm font-bold"
                >
                  Explore Odisha Tours
                  <ArrowRight size={17} />
                </NavLink>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["/images/deomali.jpeg", "Deomali Hills"],
                  ["/images/chilika.jpeg", "Chilika Lake"],
                  ["/images/simlipal.jpg", "Similipal"],
                  ["/images/tikarpada.jpeg", "Tikarapada"],
                ].map(([image, title]) => (
                  <NavLink
                    to="/tours"
                    key={title}
                    className="relative h-36 overflow-hidden rounded-xl sm:h-44"
                  >
                    <img
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    <h3 className="absolute bottom-3 left-3 text-sm font-bold">
                      {title}
                    </h3>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}

        <section className="bg-[#EEF1EC] px-5 py-16 lg:px-10">
          <div className="mx-auto grid max-w-[1250px] gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold tracking-[.25em] text-[#D96B43]">
                NEED HELP?
              </p>

              <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em]">
                Frequently Asked
                <span className="block text-[#123B2D]">Questions.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-500">
                Have questions about bookings or travelling? Find answers here.
              </p>

              <NavLink
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#D96B43]"
              >
                Contact Support
                <ArrowRight size={17} />
              </NavLink>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-[#123B2D]">
                    {faq.question}
                    <span className="text-xl text-[#D96B43] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 text-xs leading-6 text-gray-500">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
      </div>
    </main>
  );
};

export default Home;
