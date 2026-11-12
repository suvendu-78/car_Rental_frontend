import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CarFront,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Headset,
  Wrench,
  Users,
  Fuel,
  Settings2,
  MapPin,
  Compass,
  Phone,
} from "lucide-react";

const dummyVehicles = [
  {
    id: 1,
    name: "Maruti Swift",
    category: "Hatchback",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    price: 1299,
    image: "/images/swift.jpeg",
    available: true,
  },
];

const Fleets = () => {
  const [vehicles] = useState(dummyVehicles);

  return (
    <main className="min-h-screen bg-[#F8F4EC] text-[#123B2D]">
      {/* PAGE HERO */}

      <section className="relative overflow-hidden px-5 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[.25em] text-[#D96B43]">
              <span className="h-px w-9 bg-[#D96B43]" />
              MAPMYSAFAR FLEET
            </p>

            <h1 className="font-serif text-5xl font-bold leading-tight sm:text-6xl">
              Find the Right
              <span className="block italic text-[#D96B43]">Ride for You.</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              From everyday city rides to memorable road trips, discover
              comfortable and reliable vehicles for exploring Odisha.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <ShieldCheck size={25} className="mb-2 text-[#D96B43]" />
                <p className="text-xs font-bold">Verified</p>
                <p className="mt-1 text-[10px] text-gray-500">Vehicles</p>
              </div>

              <div>
                <Wrench size={25} className="mb-2 text-[#D96B43]" />
                <p className="text-xs font-bold">Maintained</p>
                <p className="mt-1 text-[10px] text-gray-500">Fleet</p>
              </div>

              <div>
                <Headset size={25} className="mb-2 text-[#D96B43]" />
                <p className="text-xs font-bold">24×7</p>
                <p className="mt-1 text-[10px] text-gray-500">Support</p>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] overflow-hidden rounded-[100px_18px_100px_18px] bg-[#DDE4D8] sm:h-[380px]">
            <img
              src="/images/suntemple.jpeg"
              alt="Explore Odisha"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#09291F]/50 to-transparent" />

            <div className="absolute bottom-7 left-7 text-white">
              <p className="text-xs font-semibold tracking-widest">
                EXPLORE ODISHA
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold">
                Every road has a story.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET SECTION */}

      <section className="px-5 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1350px]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold tracking-[.2em] text-[#D96B43]">
                FIND YOUR RIDE
              </p>

              <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                Our Available Vehicles
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Choose a vehicle that suits your journey.
              </p>
            </div>

            <span className="rounded-full bg-[#E8EDE5] px-4 py-2 text-xs font-bold text-[#123B2D]">
              {vehicles.length} Vehicle Available
            </span>
          </div>

          {/* VEHICLES AVAILABLE */}

          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {vehicles.map((vehicle) => (
                <article
                  key={vehicle.id}
                  className="group overflow-hidden rounded-2xl border border-[#123B2D]/10 bg-[#FFFEFB] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* VEHICLE IMAGE */}

                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#E8E8DF]">
                    {vehicle.image ? (
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : null}

                    <CarFront
                      size={75}
                      strokeWidth={1}
                      className="text-[#123B2D]/40"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-[#123B2D] px-3 py-1.5 text-[10px] font-bold text-white">
                      {vehicle.category}
                    </span>

                    <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-green-700">
                      Available
                    </span>
                  </div>

                  {/* VEHICLE DETAILS */}

                  <div className="p-5">
                    <h3 className="font-serif text-xl font-bold">
                      {vehicle.name}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      {vehicle.category} · {vehicle.seats} Seater
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4 border-y border-gray-100 py-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Users size={15} />
                        {vehicle.seats} Seats
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Fuel size={15} />
                        {vehicle.fuel}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Settings2 size={15} />
                        {vehicle.transmission}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-500">
                          Starting from
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          ₹{vehicle.price.toLocaleString("en-IN")}
                          <span className="text-xs font-normal text-gray-500">
                            {" "}
                            / day
                          </span>
                        </p>
                      </div>

                      <NavLink
                        to="/fleet"
                        className="inline-flex items-center gap-2 rounded-full bg-[#D96B43] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#BD542F]"
                      >
                        Book Now
                        <ArrowRight size={15} />
                      </NavLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* NO VEHICLES EMPTY STATE */

            <div className="mx-auto max-w-4xl py-10">
              <div className="overflow-hidden rounded-[28px] bg-[#EFEAE0]">
                <div className="grid items-center lg:grid-cols-2">
                  <div className="p-7 sm:p-12">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#123B2D] text-white">
                      <CarFront size={32} />
                    </div>

                    <p className="text-xs font-bold tracking-[.2em] text-[#D96B43]">
                      MORE JOURNEYS AHEAD
                    </p>

                    <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                      Your next adventure is just around the corner!
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-gray-600">
                      We're currently updating our vehicle collection to bring
                      you better travel options. New rides are coming soon!
                    </p>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      In the meantime, discover beautiful destinations across
                      Odisha with MapMySafar.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <NavLink
                        to="/tours"
                        className="rounded-full bg-[#D96B43] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#BD542F]"
                      >
                        Explore Tours →
                      </NavLink>

                      <NavLink
                        to="/cityRide"
                        className="rounded-full border border-[#123B2D] px-6 py-3 text-xs font-bold transition hover:bg-[#123B2D] hover:text-white"
                      >
                        City Rides
                      </NavLink>
                    </div>
                  </div>

                  <div className="relative min-h-[300px] lg:min-h-[480px]">
                    <img
                      src="/images/suntemple.jpeg"
                      alt="Discover Odisha"
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#09291F]/50 to-transparent" />

                    <div className="absolute bottom-7 left-7 text-white">
                      <p className="text-xs font-bold tracking-widest">
                        MAPMYSAFAR
                      </p>

                      <h3 className="mt-2 font-serif text-3xl font-bold">
                        Explore more.
                        <br />
                        Travel further.
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HELP BANNER */}

      <section className="px-5 pb-16 sm:px-10 lg:px-16">
        <div className="relative mx-auto max-w-[1350px] overflow-hidden rounded-3xl bg-[#123B2D] p-8 text-white sm:p-12">
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-bold tracking-[.2em] text-[#F3B18C]">
              WE'RE HERE TO HELP
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Not sure which ride is right for you?
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75">
              Tell us about your travel plans. Our team will help you find the
              right option for your journey across Odisha.
            </p>

            <NavLink
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F8F4EC] px-6 py-3 text-sm font-bold text-[#123B2D] transition hover:bg-[#D96B43] hover:text-white"
            >
              <Phone size={16} />
              Talk to an Expert
              <ArrowUpRight size={16} />
            </NavLink>
          </div>

          <Compass
            size={220}
            strokeWidth={0.5}
            className="absolute -right-10 -bottom-16 text-white/10"
          />
        </div>
      </section>
    </main>
  );
};

export default Fleets;
