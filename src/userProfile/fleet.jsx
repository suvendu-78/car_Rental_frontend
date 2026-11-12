// import { useState } from "react";
// import { CarFront, Fuel, Users, Search } from "lucide-react";
// import { Link } from "react-router-dom";

// const vehicles = [
//   {
//     name: "Maruti Swift",
//     type: "Hatchback",
//     seats: 5,
//     fuel: "Petrol",
//     price: 1800,
//   },
//   { name: "Hyundai Creta", type: "SUV", seats: 5, fuel: "Petrol", price: 3000 },
//   {
//     name: "Tata Nexon",
//     type: "Compact SUV",
//     seats: 5,
//     fuel: "Petrol",
//     price: 2500,
//   },
//   {
//     name: "Maruti Dzire",
//     type: "Sedan",
//     seats: 5,
//     fuel: "Petrol",
//     price: 2000,
//   },
// ];

// const Fleet = () => {
//   const [search, setSearch] = useState("");

//   const filtered = vehicles.filter((car) =>
//     car.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="space-y-6">
//       <div>
//         <p className="text-sm font-semibold text-[#D96B43]">FIND YOUR RIDE</p>
//         <h1 className="mt-1 text-3xl font-bold text-[#1E3A2B]">Our Fleet</h1>
//         <p className="mt-2 text-gray-500">
//           Choose a vehicle for your next journey.
//         </p>
//       </div>

//       <div className="flex items-center gap-3 rounded-xl bg-white px-4 shadow-sm">
//         <Search size={18} className="text-gray-400" />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search vehicles..."
//           className="w-full py-3 outline-none"
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//         {filtered.map((car) => (
//           <article
//             key={car.name}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >
//             <div className="flex h-36 items-center justify-center rounded-xl bg-[#F4EFEA] text-[#1E3A2B]">
//               <CarFront size={80} strokeWidth={1.3} />
//             </div>
//             <p className="mt-4 text-xs font-semibold uppercase text-[#D96B43]">
//               {car.type}
//             </p>
//             <h2 className="mt-1 text-xl font-bold text-[#1E3A2B]">
//               {car.name}
//             </h2>

//             <div className="mt-4 flex gap-4 text-sm text-gray-500">
//               <span className="flex items-center gap-1">
//                 <Users size={16} /> {car.seats} seats
//               </span>
//               <span className="flex items-center gap-1">
//                 <Fuel size={16} /> {car.fuel}
//               </span>
//             </div>

//             <div className="mt-5 flex items-center justify-between border-t pt-4">
//               <p className="font-bold text-[#1E3A2B]">
//                 ₹{car.price.toLocaleString("en-IN")}
//                 <span className="text-xs font-normal text-gray-500">
//                   {" "}
//                   / day
//                 </span>
//               </p>
//               <Link
//                 to="/fleet"
//                 className="rounded-lg bg-[#D96B43] px-4 py-2 text-sm font-semibold text-white"
//               >
//                 Book Now
//               </Link>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Fleet;

import { useMemo, useState } from "react";
import {
  CarFront,
  Fuel,
  Users,
  Search,
  ArrowRight,
  SlidersHorizontal,
  Gauge,
  Settings2,
} from "lucide-react";
import { Link } from "react-router-dom";

const vehicles = [
  {
    id: 1,
    name: "Maruti Swift",
    type: "Hatchback",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    price: 1800,
  },
  {
    id: 2,
    name: "Hyundai Creta",
    type: "SUV",
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 3000,
  },
  {
    id: 3,
    name: "Tata Nexon",
    type: "Compact SUV",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    price: 2500,
  },
  {
    id: 4,
    name: "Maruti Dzire",
    type: "Sedan",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    price: 2000,
  },
];

const categories = ["All Vehicles", "Hatchback", "Sedan", "SUV", "Compact SUV"];

const Fleet = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Vehicles");
  const [sort, setSort] = useState("recommended");

  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((car) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        car.name.toLowerCase().includes(query) ||
        car.type.toLowerCase().includes(query) ||
        car.fuel.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Vehicles" || car.type === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sort]);

  return (
    <div className="min-w-0 space-y-7 bg-white text-black">
      {/* Page heading */}
      <section className="border-b border-gray-200 pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
          Find your ride
        </p>

        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Our Fleet
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Find the right vehicle for your next Odisha journey.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {filteredVehicles.length} vehicles available
          </p>
        </div>
      </section>

      {/* Search and sorting */}
      <section className="flex flex-col gap-3 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:border-black">
          <Search size={18} className="shrink-0 text-gray-500" />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by vehicle name, type or fuel..."
            aria-label="Search vehicles"
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <label className="flex items-center gap-2 rounded-lg border border-gray-300 px-3.5 py-3">
          <SlidersHorizontal size={17} className="text-gray-500" />

          <span className="whitespace-nowrap text-sm text-gray-600">
            Sort by
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort vehicles by price"
            className="min-w-0 bg-white text-sm text-black outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </section>

      {/* Vehicle categories */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Settings2 size={17} className="text-gray-500" />

          <h2 className="text-sm font-medium">Vehicle category</h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                category === item
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Fleet grid */}
      {filteredVehicles.length > 0 ? (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredVehicles.map((car) => (
            <article
              key={car.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors hover:border-gray-400"
            >
              {/* Vehicle visual */}
              <div className="flex h-44 items-center justify-center border-b border-gray-200 bg-gray-50">
                <CarFront size={82} strokeWidth={1} className="text-gray-700" />
              </div>

              <div className="p-5">
                {/* Vehicle name */}
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {car.type}
                </p>

                <h2 className="mt-1.5 text-lg font-medium text-black">
                  {car.name}
                </h2>

                <p className="mt-1 text-xs text-gray-500">Self-drive rental</p>

                {/* Specifications */}
                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-gray-200 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={17} className="shrink-0 text-gray-500" />
                    <span>{car.seats} seats</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Fuel size={17} className="shrink-0 text-gray-500" />
                    <span>{car.fuel}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Settings2 size={17} className="shrink-0 text-gray-500" />
                    <span>{car.transmission}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Gauge size={17} className="shrink-0 text-gray-500" />
                    <span>Self drive</span>
                  </div>
                </div>

                {/* Price and booking */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-normal text-black">
                      ₹{car.price.toLocaleString("en-IN")}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">per day</p>
                  </div>

                  <Link
                    to="/manage-booking"
                    className="inline-flex items-center gap-2 rounded-lg border border-black px-3.5 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                  >
                    Book now
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        /* Empty state */
        <section className="rounded-lg border border-gray-200 px-5 py-14 text-center">
          <CarFront
            size={34}
            strokeWidth={1.3}
            className="mx-auto text-gray-500"
          />

          <h2 className="mt-4 text-base font-medium">No vehicles found</h2>

          <p className="mt-2 text-sm text-gray-500">
            Try another search or select a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All Vehicles");
              setSort("recommended");
            }}
            className="mt-4 rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition hover:bg-gray-100"
          >
            Clear filters
          </button>
        </section>
      )}

      <p className="text-xs leading-5 text-gray-400">
        Prices are sample rates and may vary depending on travel dates and
        rental conditions.
      </p>
    </div>
  );
};

export default Fleet;
