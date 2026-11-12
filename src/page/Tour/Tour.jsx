import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  CalendarDays,
  Star,
  Search,
  Compass,
  SlidersHorizontal,
  Clock3,
  Sparkles,
} from "lucide-react";

import { tourPackages } from "./tourData.jsx";

const categories = [
  "All Tours",
  "Beach",
  "Adventure",
  "Nature",
  "Heritage",
  "Coastal",
];

const Tours = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("All Tours");
  const [search, setSearch] = useState("");

  const filteredTours = useMemo(() => {
    return tourPackages.filter((tour) => {
      const matchesCategory =
        category === "All Tours" || tour.category === category;

      const matchesSearch =
        tour.name.toLowerCase().includes(search.toLowerCase()) ||
        tour.location.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

  // Navigate to the selected tour's dynamic booking page
  const explorePackage = (tourId) => {
    navigate(`/TourBooking/${tourId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#123B2D]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#123B2D] px-5 py-20 text-white md:py-28">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#D96B43]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1350px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[#F4A17F]">
            <Sparkles size={15} />
            Curated Travel Experiences
          </div>

          <div className="grid items-end gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                Explore Odisha.
                <span className="mt-2 block text-[#E77A50]">
                  Find Your Adventure.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-8 text-white/70 md:text-base">
                From peaceful beaches to beautiful mountains, discover
                handpicked tour packages across Odisha with MapMySafar. Your
                next unforgettable journey starts here.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById("tour-packages")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#D96B43] px-7 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-[#123B2D]"
              >
                Explore Packages
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                ["30+", "Destinations"],
                ["7+", "Tour Experiences"],
                ["24/7", "Travel Support"],
              ].map(([number, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-extrabold text-[#F4A17F] md:text-3xl">
                    {number}
                  </h3>
                  <p className="mt-2 text-[11px] text-white/60 md:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOUR PACKAGES SECTION */}
      <section
        id="tour-packages"
        className="mx-auto max-w-[1350px] px-5 py-16 md:py-20"
      >
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#D96B43]">
              Discover the beauty
            </p>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Explore Our Tour Packages
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Choose your favourite destination and start your journey.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Compass size={19} className="text-[#D96B43]" />
            <span>
              <strong className="text-[#123B2D]">{filteredTours.length}</strong>{" "}
              Packages Available
            </span>
          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="mb-9 rounded-2xl border border-[#E9E2D8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#F8F7F3] px-4">
              <Search size={19} className="shrink-0 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Puri, Koraput, Ganjam..."
                className="w-full bg-transparent py-4 text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <SlidersHorizontal
                size={18}
                className="shrink-0 text-[#D96B43]"
              />

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-xs font-semibold transition-all ${
                    category === item
                      ? "bg-[#123B2D] text-white shadow-md"
                      : "bg-[#F8F7F3] text-slate-600 hover:bg-[#F8E9E1] hover:text-[#123B2D]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TOUR CARDS */}
        {filteredTours.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTours.map((tour) => (
              <article
                key={tour.id}
                className="group overflow-hidden rounded-3xl border border-[#E9E2D8] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#D96B43]/40 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative h-[250px] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#123B2D] shadow-sm">
                    {tour.category} Tour
                  </span>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-sm font-semibold text-white">
                    <Star size={15} className="fill-[#F4A17F] text-[#F4A17F]" />
                    {tour.rating}

                    <span className="ml-1 font-normal text-white/75">
                      ({tour.reviews} reviews)
                    </span>
                  </div>

                  <button
                    onClick={() => explorePackage(tour.id)}
                    aria-label={`Explore ${tour.name}`}
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#123B2D] shadow-lg transition hover:scale-110 hover:bg-[#D96B43] hover:text-white"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* CARD CONTENT */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MapPin size={15} className="text-[#D96B43]" />
                    {tour.location}
                  </div>

                  <h3 className="mt-3 text-xl font-extrabold text-[#123B2D] transition group-hover:text-[#D96B43]">
                    {tour.name}
                  </h3>

                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
                    {tour.description}
                  </p>

                  {/* DURATION */}
                  <div className="mt-5 flex items-center justify-between border-y border-slate-100 py-4 text-xs text-slate-500">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-[#D96B43]" />
                      {tour.duration}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={15} />
                      Flexible Dates
                    </span>
                  </div>

                  {/* PRICE */}
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Starting from</p>

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-2xl font-extrabold text-[#123B2D]">
                          {formatPrice(tour.price)}
                        </span>

                        {tour.oldPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatPrice(tour.oldPrice)}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Per person · Sample price
                      </p>
                    </div>
                  </div>

                  {/* EXPLORE BUTTON */}
                  <button
                    onClick={() => explorePackage(tour.id)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B2D] py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#D96B43]"
                  >
                    Explore Package
                    <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* NO RESULTS */
          <div className="rounded-3xl border border-[#E9E2D8] bg-white py-20 text-center">
            <Compass size={45} className="mx-auto text-[#D96B43]" />

            <h3 className="mt-5 text-xl font-bold text-[#123B2D]">
              No tours found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching another destination.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All Tours");
              }}
              className="mt-6 rounded-xl bg-[#123B2D] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#D96B43]"
            >
              View All Tours
            </button>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto mb-16 max-w-[1350px] px-5">
        <div className="relative overflow-hidden rounded-[28px] bg-[#123B2D] px-7 py-14 text-white md:px-14">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#D96B43]/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#F4A17F]">
              Your journey, your priority
            </p>

            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              Your Next Odisha Adventure Starts Here.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/70">
              Discover new places, explore different cultures and make
              unforgettable memories with MapMySafar.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("tour-packages")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D96B43] px-7 py-4 text-sm font-bold transition hover:bg-white hover:text-[#123B2D]"
            >
              Plan Your Trip
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
