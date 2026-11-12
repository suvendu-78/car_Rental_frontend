import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CarFront,
  CircleCheck,
  Wallet,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock3,
  UserRound,
  Fuel,
  Route,
  Compass,
  Mountain,
  Waves,
  Landmark,
  Trees,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "06",
    note: "All reservations",
    icon: CalendarDays,
  },
  {
    title: "Upcoming Trips",
    value: "02",
    note: "Ready for your next trip",
    icon: CarFront,
  },
  {
    title: "Completed Trips",
    value: "04",
    note: "Journeys completed",
    icon: CircleCheck,
  },
  {
    title: "Total Spent",
    value: "₹24,500",
    note: "Your travel expenses",
    icon: Wallet,
  },
];

const bookings = [
  {
    id: 1,
    vehicle: "Maruti Swift",
    category: "Hatchback",
    date: "12 Oct 2026",
    route: "Bhubaneswar → Puri",
    status: "Upcoming",
    price: "₹4,500",
    duration: "3 Days",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    vehicle: "Hyundai Creta",
    category: "SUV",
    date: "20 Sep 2026",
    route: "Bhubaneswar → Konark",
    status: "Completed",
    price: "₹9,000",
    duration: "3 Days",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    vehicle: "Tata Nexon",
    category: "Compact SUV",
    date: "05 Aug 2026",
    route: "Bhubaneswar → Bhitarkanika",
    status: "Completed",
    price: "₹7,500",
    duration: "2 Days",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop",
  },
];

const destinations = [
  {
    name: "Puri",
    subtitle: "Coastal escape",
    distance: "Approx. 60 km",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&auto=format&fit=crop&q=80",
    icon: Waves,
  },
  {
    name: "Konark",
    subtitle: "Heritage & history",
    distance: "Approx. 65 km",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=500&auto=format&fit=crop&q=80",
    icon: Landmark,
  },
  {
    name: "Chilika",
    subtitle: "Lakeside journeys",
    distance: "Approx. 100 km",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&auto=format&fit=crop&q=80",
    icon: Compass,
  },
  {
    name: "Bhitarkanika",
    subtitle: "Into the wilderness",
    distance: "Approx. 160 km",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=80",
    icon: Trees,
  },
];

const Account = () => {
  const navigate = useNavigate();

  return (
    <div className="min-w-0 bg-white text-black">
      <main className="mx-auto max-w-[1800px] space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Hero: OdishaDrive identity */}
        <section className="relative isolate overflow-hidden rounded-xl bg-black">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&auto=format&fit=crop&q=85"
            alt="Car ready for a self-drive journey"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />

          <div className="flex min-h-[320px] items-center p-6 sm:min-h-[350px] sm:p-9 lg:p-12">
            <div className="max-w-xl text-white">
              <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                <MapPin size={15} />
                Odisha, at your own pace
              </div>

              <h1 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                From temple towns to coastal roads.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/80 sm:text-base">
                Your next Odisha journey starts here. Pick your ride, choose
                your route, and discover the state on your terms.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/account/fleet")}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
                >
                  Find your car
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/account/explore")}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/50 bg-black/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                >
                  <Compass size={17} />
                  Explore Odisha
                </button>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/75">
                <span className="flex items-center gap-1.5">
                  <Route size={14} />
                  Your route, your rules
                </span>

                <span className="flex items-center gap-1.5">
                  <CarFront size={14} />
                  Self-drive freedom
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Travel overview */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">
                Your Travel Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                A quick look at your journeys
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/account/bookings")}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-black hover:underline"
            >
              All bookings
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.title}
                  className="rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-gray-400"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>

                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>

                  <h3 className="mt-5 text-2xl font-normal tracking-normal">
                    {stat.value}
                  </h3>

                  <p className="mt-1.5 text-xs text-gray-500">{stat.note}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Popular Odisha road trips */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                Beyond the usual route
              </p>

              <h2 className="mt-2 text-lg font-semibold sm:text-xl">
                Take the scenic way
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                A few places worth discovering by road.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/account/explore")}
              className="hidden shrink-0 items-center gap-1 text-sm font-medium hover:underline sm:flex"
            >
              All destinations
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {destinations.map((destination) => {
              const Icon = destination.icon;

              return (
                <article
                  key={destination.name}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale transition duration-300 group-hover:scale-105"
                    />

                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md border border-white/70 bg-white/95 px-2.5 py-1.5 text-xs text-black">
                      <MapPin size={13} />
                      {destination.distance}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-medium">
                          {destination.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {destination.subtitle}
                        </p>
                      </div>

                      <Icon
                        size={19}
                        strokeWidth={1.5}
                        className="shrink-0 text-gray-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/account/explore")}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-black hover:underline"
                    >
                      Explore destination
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Recent bookings and trip details */}
        <section className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
          {/* Recent bookings */}
          <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-medium sm:text-xl">
                  Recent Bookings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest reservations
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/account/bookings")}
                className="inline-flex shrink-0 items-center gap-1 text-sm font-medium hover:underline"
              >
                View all
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-5 divide-y divide-gray-200">
              {bookings.map((booking) => (
                <article
                  key={booking.id}
                  className="flex flex-col gap-3 py-5 first:pt-2 last:pb-1 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <img
                      src={booking.image}
                      alt={booking.vehicle}
                      loading="lazy"
                      className="h-[76px] w-[92px] shrink-0 rounded-md border border-gray-100 object-cover"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium sm:text-base">
                        {booking.vehicle}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.category}
                      </p>

                      <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
                        <CalendarDays size={13} className="shrink-0" />
                        {booking.date}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin size={13} className="shrink-0" />
                        <span className="truncate">{booking.route}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3 sm:justify-start sm:border-0 sm:pt-0">
                    <span className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-normal text-gray-700">
                      {booking.status}
                    </span>

                    <div className="sm:min-w-[78px]">
                      <p className="text-sm font-normal">{booking.price}</p>

                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <Clock3 size={12} />
                        {booking.duration}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/account/bookings/${booking.id}`)
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-xs font-normal transition hover:bg-gray-100"
                    >
                      Details
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-1">
            {/* Odisha road-trip feature */}
            <article className="overflow-hidden rounded-lg border border-gray-200 bg-white sm:col-span-2 2xl:col-span-1">
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
                  The Odisha drive
                </p>

                <h3 className="mt-2 text-xl font-medium">
                  One state. Many stories.
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  From the coast around Puri to the heritage of Konark, plan a
                  journey that suits your pace.
                </p>
              </div>

              <img
                src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&auto=format&fit=crop&q=80"
                alt="Coastal landscape for a road trip"
                loading="lazy"
                className="h-40 w-full object-cover grayscale"
              />

              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <p className="text-xs text-gray-500">Start exploring</p>

                  <p className="mt-1 text-sm font-medium">Your next route</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/account/explore")}
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Explore
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>

            {/* Quick actions */}
            <article className="rounded-lg border border-gray-200 bg-white p-5 sm:col-span-2 2xl:col-span-1">
              <h3 className="text-base font-medium">Quick Actions</h3>

              <p className="mt-1 text-sm text-gray-500">
                The things you need, in one place.
              </p>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate("/account/fleet")}
                  className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 text-left transition hover:bg-gray-50"
                >
                  <CarFront size={20} strokeWidth={1.5} />

                  <span className="flex-1">
                    <span className="block text-sm font-normal">
                      Find a vehicle
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                      Choose your next ride
                    </span>
                  </span>

                  <ArrowRight size={16} className="text-gray-500" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/account/payments")}
                  className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 text-left transition hover:bg-gray-50"
                >
                  <Wallet size={20} strokeWidth={1.5} />

                  <span className="flex-1">
                    <span className="block text-sm font-normal">
                      Payment history
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                      Review your payments
                    </span>
                  </span>

                  <ArrowRight size={16} className="text-gray-500" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/account/profile")}
                  className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 text-left transition hover:bg-gray-50"
                >
                  <UserRound size={20} strokeWidth={1.5} />

                  <span className="flex-1">
                    <span className="block text-sm font-normal">
                      My profile
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                      Manage your account details
                    </span>
                  </span>

                  <ArrowRight size={16} className="text-gray-500" />
                </button>
              </div>
            </article>

            {/* Practical travel note */}
            <article className="rounded-lg border border-gray-200 bg-white p-5 sm:col-span-2 2xl:col-span-1">
              <div className="flex items-start gap-3">
                <Fuel size={21} strokeWidth={1.5} className="mt-0.5 shrink-0" />

                <div>
                  <h3 className="text-sm font-medium">
                    Before you hit the road
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Check your pickup details, driving documents and booking
                    dates before starting your journey.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/account/bookings")}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    Review bookings
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col justify-between gap-2 border-t border-gray-200 pt-5 text-xs text-gray-500 sm:flex-row sm:items-center">
          <p>© 2026 OdishaDrive</p>
          <p>Made for journeys across Odisha.</p>
        </footer>
      </main>
    </div>
  );
};

export default Account;
