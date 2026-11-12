import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bike, CarFront, Car, Truck } from "lucide-react";

const odishaLocations = [
  "Bhubaneswar",
  "Puri",
  "Cuttack",
  "Berhampur",
  "Koraput",
  "Rourkela",
  "Sambalpur",
  "Balasore",
  "Baripada",
  "Angul",
  "Dhenkanal",
  "Rayagada",
];

const touristPlaces = [
  {
    title: "Puri Beach",
    category: "Sea • Temple • Leisure",
    image: "/images/puri.jpg",
  },
  {
    title: "Konark Sun Temple",
    category: "Heritage • History • Architecture",
    image: "/images/konark.jpg",
  },
  {
    title: "Chilika Lake",
    category: "Nature • Boating • Birds",
    image: "/images/chilika_sun_set.jpg",
  },
  {
    title: "Deomali Hills",
    category: "Hiking • Trekking • Nature",
    image: "/images/deomali.jpg",
  },
  {
    title: "Similipal",
    category: "Forest • Wildlife • Waterfalls",
    image: "/images/simlipal.jpg",
  },
  {
    title: "Tikarapada",
    category: "Boating • Wildlife • Nature",
    image: "/images/tikarpada.jpg",
  },
  {
    title: "Belghar Nature Camp",
    category: "Forest Stay • Camping • Nature",
    image: "/images/belghar.jpg",
  },
];

const vehicles = [
  {
    id: 1,
    name: "KTM Duke 200",
    image: "/images/ktm-duke.jpg",
    category: "bike",
    type: "Bike",
    engine: "200cc",
    fuel: "Petrol",
    mileage: "45 kmpl",
    price: 900,
    popularity: 98,
  },
  {
    id: 2,
    name: "Royal Enfield Classic 350",
    image: "/images/classic-350.jpg",
    category: "bike",
    type: "Bike",
    engine: "350cc",
    fuel: "Petrol",
    mileage: "35 kmpl",
    price: 1200,
    popularity: 96,
  },
  {
    id: 3,
    name: "Yamaha R15 V4",
    image: "/images/r15.jpg",
    category: "bike",
    type: "Bike",
    engine: "155cc",
    fuel: "Petrol",
    mileage: "40 kmpl",
    price: 1100,
    popularity: 94,
  },
  {
    id: 4,
    name: "Honda Activa 6G",
    image: "/images/activa.jpg",
    category: "bike",
    type: "Scooter",
    engine: "110cc",
    fuel: "Petrol",
    mileage: "50 kmpl",
    price: 500,
    popularity: 97,
  },
  {
    id: 5,
    name: "TVS Jupiter",
    image: "/images/jupiter.jpg",
    category: "bike",
    type: "Scooter",
    engine: "110cc",
    fuel: "Petrol",
    mileage: "55 kmpl",
    price: 500,
    popularity: 91,
  },
  {
    id: 6,
    name: "Suzuki Access 125",
    image: "/images/access.jpg",
    category: "bike",
    type: "Scooter",
    engine: "125cc",
    fuel: "Petrol",
    mileage: "50 kmpl",
    price: 550,
    popularity: 89,
  },
  {
    id: 7,
    name: "Hero Splendor Plus",
    image: "/images/splendor.jpg",
    category: "bike",
    type: "Bike",
    engine: "100cc",
    fuel: "Petrol",
    mileage: "60 kmpl",
    price: 450,
    popularity: 93,
  },
  {
    id: 8,
    name: "Bajaj Pulsar 150",
    image: "/images/pulsar.jpg",
    category: "bike",
    type: "Bike",
    engine: "150cc",
    fuel: "Petrol",
    mileage: "45 kmpl",
    price: 700,
    popularity: 92,
  },
  {
    id: 9,
    name: "Maruti Swift",
    image: "/images/swift.jpg",
    category: "hatchback",
    type: "Hatchback",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "22 kmpl",
    price: 1500,
    popularity: 95,
  },
  {
    id: 10,
    name: "Hyundai i20",
    image: "/images/i20.jpg",
    category: "hatchback",
    type: "Hatchback",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "20 kmpl",
    price: 1800,
    popularity: 90,
  },
  {
    id: 11,
    name: "Tata Tiago",
    image: "/images/tiago.jpg",
    category: "hatchback",
    type: "Hatchback",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "21 kmpl",
    price: 1400,
    popularity: 87,
  },
  {
    id: 12,
    name: "Maruti Baleno",
    image: "/images/baleno.jpg",
    category: "hatchback",
    type: "Hatchback",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "21 kmpl",
    price: 1700,
    popularity: 91,
  },
  {
    id: 13,
    name: "Honda City",
    image: "/images/honda-city.jpg",
    category: "sedan",
    type: "Sedan",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "18 kmpl",
    price: 2200,
    popularity: 94,
  },
  {
    id: 14,
    name: "Hyundai Verna",
    image: "/images/verna.jpg",
    category: "sedan",
    type: "Sedan",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "19 kmpl",
    price: 2300,
    popularity: 92,
  },
  {
    id: 15,
    name: "Maruti Ciaz",
    image: "/images/ciaz.jpg",
    category: "sedan",
    type: "Sedan",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "20 kmpl",
    price: 2100,
    popularity: 85,
  },
  {
    id: 16,
    name: "Honda Amaze",
    image: "/images/amaze.jpg",
    category: "sedan",
    type: "Sedan",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "19 kmpl",
    price: 1900,
    popularity: 88,
  },
  {
    id: 17,
    name: "Hyundai Creta",
    image: "/images/creta.jpg",
    category: "suv",
    type: "SUV",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "18 kmpl",
    price: 2800,
    popularity: 98,
  },
  {
    id: 18,
    name: "Tata Nexon",
    image: "/images/nexon.jpg",
    category: "suv",
    type: "SUV",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "17 kmpl",
    price: 2400,
    popularity: 94,
  },
  {
    id: 19,
    name: "Maruti Brezza",
    image: "/images/brezza.jpg",
    category: "suv",
    type: "SUV",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "19 kmpl",
    price: 2500,
    popularity: 93,
  },
  {
    id: 20,
    name: "Kia Seltos",
    image: "/images/seltos.jpg",
    category: "suv",
    type: "SUV",
    engine: "Petrol",
    fuel: "Petrol",
    mileage: "17 kmpl",
    price: 2900,
    popularity: 96,
  },
];

const categoryData = {
  bike: {
    icon: Bike,
    title: "Two Wheeler",
    subtitle: "Most Popular",
    types: ["Bike", "Scooter"],
    description: "Popular bikes and scooters for solo travelers",
  },
  hatchback: {
    icon: CarFront,
    title: "Hatchback",
    subtitle: "Budget Friendly",
    types: ["Hatchback"],
    description: "Affordable hatchback cars for your solo trip",
  },
  sedan: {
    icon: Car,
    title: "Sedan",
    subtitle: "Comfort Ride",
    types: ["Sedan"],
    description: "Comfortable sedan cars for your journey",
  },
  suv: {
    icon: Truck,
    title: "SUV",
    subtitle: "Long Drive",
    types: ["SUV"],
    description: "Spacious SUVs for long distance travel",
  },
};

const SoloRide = () => {
  const [location, setLocation] = useState("");
  const [serviceAvailable, setServiceAvailable] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);

  const [activeCategory, setActiveCategory] = useState("bike");
  const [selectedTypes, setSelectedTypes] = useState(categoryData.bike.types);
  const [selectedFuels, setSelectedFuels] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);

  const [appliedTypes, setAppliedTypes] = useState(categoryData.bike.types);
  const [appliedFuels, setAppliedFuels] = useState([]);
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(3000);

  const [sortBy, setSortBy] = useState("popularity");
  const navigate = useNavigate();
  const handleLocation = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (odishaLocations.includes(value)) {
      setServiceAvailable(true);
      setShowVehicles(true);
    } else {
      setServiceAvailable(false);
      setShowVehicles(false);
    }
  };

  const changeLocation = () => {
    setLocation("");
    setServiceAvailable(false);
    setShowVehicles(false);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const categoryInfo = categoryData[category];

    setSelectedTypes(categoryInfo.types);
    setAppliedTypes(categoryInfo.types);
    setSelectedFuels([]);
    setAppliedFuels([]);
    setMinPrice(0);
    setMaxPrice(3000);
    setAppliedMinPrice(0);
    setAppliedMaxPrice(3000);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((previous) =>
      previous.includes(type)
        ? previous.filter((item) => item !== type)
        : [...previous, type],
    );
  };

  const handleFuelChange = (fuel) => {
    setSelectedFuels((previous) =>
      previous.includes(fuel)
        ? previous.filter((item) => item !== fuel)
        : [...previous, fuel],
    );
  };

  const applyFilters = () => {
    setAppliedTypes(selectedTypes);
    setAppliedFuels(selectedFuels);
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
  };

  const clearFilters = () => {
    const types = categoryData[activeCategory].types;

    setSelectedTypes(types);
    setAppliedTypes(types);
    setSelectedFuels([]);
    setAppliedFuels([]);
    setMinPrice(0);
    setMaxPrice(3000);
    setAppliedMinPrice(0);
    setAppliedMaxPrice(3000);
  };

  const Handeling = async (vehicle) => {
    const response = await fetch(`http://localhost:8000/api/v1/users/getuser`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      navigate("/Booking", {
        state: { vehicle },
      });
    } else {
      navigate("/login", {
        state: {
          from: "/Booking",
          vehicle,
        },
      });
    }
  };
  const filteredVehicles = useMemo(() => {
    const result = vehicles.filter((vehicle) => {
      const categoryMatch = vehicle.category === activeCategory;
      const typeMatch = appliedTypes.includes(vehicle.type);
      const priceMatch =
        vehicle.price >= appliedMinPrice && vehicle.price <= appliedMaxPrice;
      const fuelMatch =
        appliedFuels.length === 0 || appliedFuels.includes(vehicle.fuel);

      return categoryMatch && typeMatch && priceMatch && fuelMatch;
    });

    if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [
    activeCategory,
    appliedTypes,
    appliedFuels,
    appliedMinPrice,
    appliedMaxPrice,
    sortBy,
  ]);

  const currentCategory = categoryData[activeCategory];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#123629]">
      {/* Traditional Odisha hero banner */}
      <section className="relative w-full overflow-hidden border-b-[5px] border-[#C77B35] bg-white">
        <img
          src="/images/Hero_solo.jpeg"
          alt="Solo Ride - Explore Odisha"
          className="block h-auto w-full object-contain"
        />
      </section>

      {/* Responsive location selector */}
      <section className="relative z-20 -mt-5 w-full min-w-0 px-4 sm:-mt-8 sm:px-6 lg:-mt-10 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-[1250px]">
          <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#D9B77A] bg-white p-4 shadow-[0_12px_30px_rgba(22,48,35,0.12)] sm:p-6">
            <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_175px_minmax(300px,0.8fr)] lg:items-end">
              <div className="min-w-0">
                <label
                  htmlFor="starting-location"
                  className="mb-2 block text-sm font-semibold text-[#123629]"
                >
                  📍 Where are you starting from?
                </label>

                <select
                  id="starting-location"
                  value={location}
                  onChange={handleLocation}
                  className="block h-12 w-full min-w-0 rounded-xl border border-[#D8C9B1] bg-white px-4 text-sm outline-none transition focus:border-[#C75B2A] focus:ring-2 focus:ring-[#C75B2A]/20"
                >
                  <option value="">Select City / District</option>
                  {odishaLocations.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (odishaLocations.includes(location)) {
                    setServiceAvailable(true);
                    setShowVehicles(true);
                  }
                }}
                className="h-12 w-full rounded-xl bg-[#C9572B] px-5 font-semibold text-white transition hover:bg-[#A94320]"
              >
                Continue →
              </button>

              <div className="grid min-w-0 grid-cols-3 overflow-hidden rounded-xl border border-[#E4D5BB] bg-white">
                <div className="flex min-w-0 flex-col items-center justify-center px-1 py-3 text-center">
                  <span className="text-xl">🧭</span>
                  <p className="mt-1 text-xs font-semibold">Explore</p>
                  <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                    Tourist Places
                  </p>
                </div>

                <div className="flex min-w-0 flex-col items-center justify-center border-x border-[#E4D5BB] px-1 py-3 text-center">
                  <span className="text-xl">🚘</span>
                  <p className="mt-1 text-xs font-semibold">Find Best</p>
                  <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                    Vehicles
                  </p>
                </div>

                <div className="flex min-w-0 flex-col items-center justify-center px-1 py-3 text-center">
                  <span className="text-xl">🛡️</span>
                  <p className="mt-1 text-xs font-semibold">Safe</p>
                  <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                    Reliable Travel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tourist destinations */}
      {!showVehicles && (
        <section className="bg-white px-4 pb-14 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1450px]">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#8A6A3C]">
                  Explore the beauty
                </p>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Popular Tourist Places{" "}
                  <span className="text-[#C9572B]">in Odisha</span>
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Discover beautiful destinations around Odisha before choosing
                  your ride.
                </p>
              </div>

              <button className="hidden text-sm font-semibold text-[#C9572B] sm:block">
                View All Places →
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {touristPlaces.map((place) => (
                <div
                  key={place.title}
                  className="overflow-hidden rounded-2xl border border-[#D9C8AC] bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 p-4">
                    <div>
                      <h3 className="font-semibold">{place.title}</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {place.category}
                      </p>
                    </div>
                    <button
                      aria-label={`Explore ${place.title}`}
                      className="h-9 w-9 shrink-0 rounded-full bg-[#C9572B] text-white transition hover:bg-[#A94320]"
                    >
                      →
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex flex-col justify-center rounded-2xl border border-[#C99A5A] bg-white p-6 text-[#123629]">
                <div className="mb-4 text-3xl">📍</div>
                <h3 className="text-xl font-semibold">
                  Select a location to see available vehicles
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Bikes, scooters, cars and SUVs available near you.
                </p>
                <button
                  onClick={() =>
                    document.getElementById("starting-location")?.focus()
                  }
                  className="mt-5 w-fit rounded-lg bg-[#C9572B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A94320]"
                >
                  Select Location →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vehicles and filters */}
      {showVehicles && serviceAvailable && (
        <section className="w-full overflow-hidden border-y-4 border-[#C77B35] bg-white px-4 py-10 text-[#123629] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1450px]">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm text-gray-500">
                  Home <span className="mx-2">›</span> Solo Ride
                </p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                  Solo Ride
                </h2>
                <p className="mt-1 text-lg font-semibold">
                  Vehicles available in{" "}
                  <span className="text-[#C9572B]">{location}</span>
                </p>
              </div>

              <button
                onClick={changeLocation}
                className="w-fit rounded-lg border border-[#D9B77A] bg-white px-4 py-2 text-sm font-semibold text-[#123629] transition hover:border-[#C9572B]"
              >
                📍 {location} · Change
              </button>
            </div>

            {/* Vehicle categories */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-[#D8C6A5] bg-white">
              <div className="h-1 w-full bg-[#B86A3B]" />

              <div className="p-4 sm:p-6">
                <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A7045]">
                      Explore Odisha at your pace
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-[#173A2D] sm:text-2xl">
                      Choose Your Vehicle
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Select a category to explore available vehicles.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {Object.entries(categoryData).map(([key, data]) => {
                    const CategoryIcon = data.icon;
                    const isActive = activeCategory === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleCategoryChange(key)}
                        aria-pressed={isActive}
                        className={`group flex min-h-[112px] items-center gap-4 rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9572B] focus-visible:ring-offset-2 ${
                          isActive
                            ? "border-[#B86A3B] bg-white shadow-sm"
                            : "border-[#E1D7C5] bg-white hover:border-[#BBA17A]"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                            isActive
                              ? "bg-[#F1EADF] text-[#173A2D]"
                              : "border border-[#E4D9C7] bg-white text-[#345343] group-hover:bg-[#F8F3E9]"
                          }`}
                        >
                          <CategoryIcon
                            size={25}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-[15px] font-semibold text-[#173A2D]">
                            {data.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {data.subtitle}
                          </p>
                          <div
                            className={`mt-3 h-[2px] rounded-full transition-all duration-200 ${
                              isActive
                                ? "w-10 bg-[#B86A3B]"
                                : "w-5 bg-[#D8C6A5] group-hover:w-8"
                            }`}
                          />
                        </div>

                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                            isActive
                              ? "border-[#173A2D] bg-[#173A2D] text-white"
                              : "border-[#D5CBB9] text-transparent"
                          }`}
                        >
                          {isActive && (
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            >
                              <path
                                d="m4 10 4 4 8-8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Filters and vehicle listings */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]">
              <aside className="h-fit rounded-2xl border border-[#D9B77A] bg-white p-5 text-[#123629] shadow-sm lg:sticky lg:top-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Filter Vehicles</h3>
                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-[#C9572B] hover:underline"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold">Vehicle Type</p>
                  {currentCategory.types.map((type) => (
                    <label
                      key={type}
                      className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="h-4 w-4 accent-[#C9572B]"
                      />
                      {type}
                    </label>
                  ))}
                </div>

                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Price Range</p>
                    <span className="text-sm font-bold text-[#C9572B]">
                      ₹{minPrice} - ₹{maxPrice}
                    </span>
                  </div>

                  <div className="mt-4">
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="50"
                      value={minPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= maxPrice) setMinPrice(value);
                      }}
                      className="w-full accent-[#123629]"
                    />
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="50"
                      value={maxPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= minPrice) setMaxPrice(value);
                      }}
                      className="w-full accent-[#C9572B]"
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹0</span>
                    <span>₹3,000</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-[#D9C8AC] px-3 py-2">
                      <p className="text-[10px] text-gray-400">Minimum</p>
                      <p className="text-sm font-semibold">₹{minPrice}</p>
                    </div>
                    <div className="rounded-lg border border-[#D9C8AC] px-3 py-2">
                      <p className="text-[10px] text-gray-400">Maximum</p>
                      <p className="text-sm font-semibold">₹{maxPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-sm font-semibold">Fuel Type</p>
                  {["Petrol", "Diesel", "Electric"].map((fuel) => (
                    <label
                      key={fuel}
                      className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFuels.includes(fuel)}
                        onChange={() => handleFuelChange(fuel)}
                        className="h-4 w-4 accent-[#C9572B]"
                      />
                      {fuel}
                    </label>
                  ))}
                </div>

                <button
                  onClick={applyFilters}
                  className="mt-7 h-11 w-full rounded-lg bg-[#C9572B] font-semibold text-white transition hover:bg-[#A94320]"
                >
                  Apply Filters
                </button>
              </aside>

              <div className="min-w-0">
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {currentCategory.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {currentCategory.description}
                    </p>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-[#D9C8AC] bg-white px-3 py-2 text-sm text-[#123629] outline-none"
                  >
                    <option value="popularity">Sort by: Popularity</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                  </select>
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-[#C9572B]">
                      {filteredVehicles.length}
                    </span>{" "}
                    vehicles
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹{appliedMinPrice} - ₹{appliedMaxPrice}
                  </p>
                </div>

                {filteredVehicles.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {filteredVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="overflow-hidden rounded-xl border border-[#D9B77A] bg-white text-[#123629] shadow-sm transition hover:shadow-md"
                      >
                        <div className="aspect-[4/3] bg-[#F3E9D8] p-3">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>

                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold">{vehicle.name}</h3>
                            <span className="whitespace-nowrap rounded-full bg-[#E4D2B4] px-2 py-1 text-[10px] font-semibold text-[#123629]">
                              {vehicle.type}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-500">
                            <span>⚙ {vehicle.engine}</span>
                            <span>⛽ {vehicle.fuel}</span>
                            <span>◉ {vehicle.mileage}</span>
                          </div>

                          <p className="mt-3 text-lg font-bold">
                            ₹{vehicle.price}
                            <span className="text-xs font-normal text-gray-500">
                              {" "}
                              / day
                            </span>
                          </p>

                          <button
                            type="button"
                            className="mt-3 h-10 w-full rounded-lg bg-[#C9572B] text-sm font-semibold text-white transition hover:bg-[#A94320]"
                            onClick={() => Handeling(vehicle)}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#D9B77A] bg-white p-12 text-center text-[#123629]">
                    <div className="mb-4 text-5xl">🚫</div>
                    <h3 className="text-xl font-bold">No vehicles found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      No vehicle matches your selected filters.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-5 rounded-lg bg-[#C9572B] px-5 py-2.5 font-semibold text-white hover:bg-[#A94320]"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SoloRide;
