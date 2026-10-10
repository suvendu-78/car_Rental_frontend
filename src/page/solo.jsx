import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

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
    icon: "🏍️",
    title: "Two Wheeler",
    subtitle: "Most Popular",
    types: ["Bike", "Scooter"],
    description: "Popular bikes and scooters for solo travelers",
  },
  hatchback: {
    icon: "🚗",
    title: "Hatchback",
    subtitle: "Budget Friendly",
    types: ["Hatchback"],
    description: "Affordable hatchback cars for your solo trip",
  },
  sedan: {
    icon: "🚘",
    title: "Sedan",
    subtitle: "Comfort Ride",
    types: ["Sedan"],
    description: "Comfortable sedan cars for your journey",
  },
  suv: {
    icon: "🚙",
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
    setSelectedTypes((previous) => {
      if (previous.includes(type)) {
        return previous.filter((item) => item !== type);
      }

      return [...previous, type];
    });
  };

  const handleFuelChange = (fuel) => {
    setSelectedFuels((previous) => {
      if (previous.includes(fuel)) {
        return previous.filter((item) => item !== fuel);
      }

      return [...previous, fuel];
    });
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

  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((vehicle) => {
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
    }

    if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "popularity") {
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
    <div className="min-h-screen bg-[#F4EFEA] text-[#1E3A2B]">
      <section className="relative h-[350px] sm:h-[430px] overflow-hidden">
        <img
          src="/images/solo_banner.png"
          alt="Solo Ride"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A2B]/95 via-[#1E3A2B]/10 to-transparent" />

        <div className="relative z-10 max-w-[1450px] mx-auto px-5 sm:px-8 pt-16 sm:pt-24">
          {/* <p className="text-white/80 text-sm">
            Home <span className="mx-2">›</span> Solo Ride
          </p>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Solo <span className="text-[#D96B43]">Ride</span>
          </h1> */}
        </div>
      </section>

      <section className="relative z-20 px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2">
                  📍 Where are you starting from?
                </label>

                <select
                  value={location}
                  onChange={handleLocation}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F4EFEA] outline-none focus:border-[#D96B43]"
                >
                  <option value="">Select City / District</option>

                  <optgroup label="Odisha">
                    {odishaLocations.map((place) => (
                      <option key={place} value={place}>
                        {place}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <button
                onClick={() => {
                  if (odishaLocations.includes(location)) {
                    setServiceAvailable(true);
                    setShowVehicles(true);
                  }
                }}
                className="h-12 lg:w-44 bg-[#D96B43] hover:bg-[#c55c39] text-white rounded-xl font-semibold transition"
              >
                Continue →
              </button>

              <div className="hidden md:grid grid-cols-3 gap-5 lg:w-[380px]">
                <div className="text-center border-l border-gray-200">
                  <div className="text-xl">🧭</div>

                  <p className="text-xs font-semibold mt-1">Explore</p>

                  <p className="text-[11px] text-gray-500">Tourist Places</p>
                </div>

                <div className="text-center border-l border-gray-200">
                  <div className="text-xl">🚗</div>

                  <p className="text-xs font-semibold mt-1">Find Best</p>

                  <p className="text-[11px] text-gray-500">Vehicles</p>
                </div>

                <div className="text-center border-l border-gray-200">
                  <div className="text-xl">🛡️</div>

                  <p className="text-xs font-semibold mt-1">Safe</p>

                  <p className="text-[11px] text-gray-500">Reliable Travel</p>
                </div>
              </div>
            </div>

            {location && !serviceAvailable && (
              <div className="mt-5 p-4 sm:p-5 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚠️</div>

                  <div className="flex-1">
                    <h3 className="font-bold text-red-700">
                      Sorry, no services available
                    </h3>

                    <p className="text-sm text-red-600 mt-1">
                      We currently provide vehicle rental services only within
                      Odisha.
                    </p>

                    <button
                      onClick={changeLocation}
                      className="mt-3 px-4 py-2 bg-[#D96B43] hover:bg-[#c55c39] text-white rounded-lg text-sm font-semibold transition"
                    >
                      Select Odisha Location
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {!showVehicles && (
        <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-14">
          <div className="max-w-[1450px] mx-auto">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Popular Tourist Places{" "}
                  <span className="text-[#D96B43]">in Odisha</span>
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Discover beautiful destinations around Odisha before choosing
                  your ride.
                </p>
              </div>

              <button className="hidden sm:block text-sm font-semibold text-[#D96B43]">
                View All Places →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {touristPlaces.map((place) => (
                <div
                  key={place.title}
                  className="bg-white rounded-2xl overflow-hidden border border-[#1E3A2B]/10 shadow-sm hover:shadow-lg transition"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold">{place.title}</h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {place.category}
                        </p>
                      </div>

                      <button className="w-9 h-9 rounded-full bg-[#D96B43] text-white">
                        →
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-[#DDE9DF] rounded-2xl p-6 flex flex-col justify-center">
                <div className="text-4xl mb-4">📍</div>

                <h3 className="text-xl font-bold">
                  Select a location to see available vehicles
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Bikes, scooters, cars and SUVs available near you.
                </p>

                <button
                  onClick={() => document.querySelector("select")?.focus()}
                  className="mt-5 w-fit px-4 py-2.5 bg-[#1E3A2B] text-white rounded-lg text-sm font-semibold"
                >
                  Select Location →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {showVehicles && serviceAvailable && (
        <section className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-[1450px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">
                  Home <span className="mx-2">›</span> Solo Ride
                </p>

                <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                  Solo Ride
                </h2>

                <p className="text-lg font-semibold mt-1">
                  Vehicles available in{" "}
                  <span className="text-[#D96B43]">{location}</span>
                </p>
              </div>

              <button
                onClick={changeLocation}
                className="w-fit px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-[#D96B43] transition"
              >
                📍 {location} · Change
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#1E3A2B]/10 p-2 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {Object.entries(categoryData).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => handleCategoryChange(key)}
                    className={`p-4 rounded-xl text-left transition ${
                      activeCategory === key
                        ? "bg-[#D96B43] text-white"
                        : "hover:bg-[#F4EFEA]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{data.icon}</span>

                      <div>
                        <p className="font-bold text-sm">{data.title}</p>

                        <p
                          className={`text-xs mt-1 ${
                            activeCategory === key
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          {data.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
              <aside className="bg-white rounded-2xl p-5 border border-[#1E3A2B]/10 h-fit lg:sticky lg:top-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Filter Vehicles</h3>

                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-[#D96B43] hover:underline"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold">Vehicle Type</p>

                  {currentCategory.types.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 mt-3 text-sm text-gray-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="w-4 h-4 accent-[#D96B43]"
                      />

                      {type}
                    </label>
                  ))}
                </div>

                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Price Range</p>

                    <span className="text-sm font-bold text-[#D96B43]">
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

                        if (value <= maxPrice) {
                          setMinPrice(value);
                        }
                      }}
                      className="w-full accent-[#1E3A2B]"
                    />

                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="50"
                      value={maxPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value >= minPrice) {
                          setMaxPrice(value);
                        }
                      }}
                      className="w-full accent-[#D96B43]"
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹0</span>
                    <span>₹3,000</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="border rounded-lg px-3 py-2">
                      <p className="text-[10px] text-gray-400">Minimum</p>

                      <p className="font-semibold text-sm">₹{minPrice}</p>
                    </div>

                    <div className="border rounded-lg px-3 py-2">
                      <p className="text-[10px] text-gray-400">Maximum</p>

                      <p className="font-semibold text-sm">₹{maxPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-sm font-semibold">Fuel Type</p>

                  {["Petrol", "Diesel", "Electric"].map((fuel) => (
                    <label
                      key={fuel}
                      className="flex items-center gap-2 mt-3 text-sm text-gray-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFuels.includes(fuel)}
                        onChange={() => handleFuelChange(fuel)}
                        className="w-4 h-4 accent-[#D96B43]"
                      />

                      {fuel}
                    </label>
                  ))}
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full mt-7 h-11 bg-[#D96B43] hover:bg-[#c55c39] text-white rounded-lg font-semibold transition"
                >
                  Apply Filters
                </button>
              </aside>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {currentCategory.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {currentCategory.description}
                    </p>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                  >
                    <option value="popularity">Sort by: Popularity</option>

                    <option value="priceLow">Price: Low to High</option>

                    <option value="priceHigh">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-[#1E3A2B]">
                      {filteredVehicles.length}
                    </span>{" "}
                    vehicles
                  </p>

                  <p className="text-xs text-gray-400">
                    ₹{appliedMinPrice} - ₹{appliedMaxPrice}
                  </p>
                </div>

                {filteredVehicles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {filteredVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="bg-white rounded-xl overflow-hidden border border-[#1E3A2B]/10 shadow-sm hover:shadow-lg transition"
                      >
                        <div className="aspect-[4/3] bg-[#F7F7F7] p-3">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>

                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-[#1E3A2B]">
                              {vehicle.name}
                            </h3>

                            <span className="text-[10px] px-2 py-1 rounded-full bg-[#DDE9DF] text-[#1E3A2B] font-semibold whitespace-nowrap">
                              {vehicle.type}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-gray-500">
                            <span>⚙ {vehicle.engine}</span>

                            <span>⛽ {vehicle.fuel}</span>

                            <span>◉ {vehicle.mileage}</span>
                          </div>

                          <p className="text-lg font-bold text-[#1E3A2B] mt-3">
                            ₹{vehicle.price}
                            <span className="text-xs font-normal text-gray-500">
                              {" "}
                              / day
                            </span>
                          </p>

                          <button className="w-full mt-3 h-10 bg-[#D96B43] hover:bg-[#c55c39] text-white rounded-lg text-sm font-semibold transition">
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-[#1E3A2B]/10 p-12 text-center">
                    <div className="text-5xl mb-4">🚫</div>

                    <h3 className="text-xl font-bold">No vehicles found</h3>

                    <p className="text-sm text-gray-500 mt-2">
                      No vehicle matches your selected filters.
                    </p>

                    <button
                      onClick={clearFilters}
                      className="mt-5 px-5 py-2.5 bg-[#D96B43] text-white rounded-lg font-semibold"
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
