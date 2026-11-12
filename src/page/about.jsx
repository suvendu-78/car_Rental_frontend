import React from "react";
import { Link } from "react-router-dom";
import {
  CarFront,
  UsersRound,
  MapPin,
  ShieldCheck,
  Compass,
  ArrowRight,
  Heart,
  Map,
  Leaf,
} from "lucide-react";

const features = [
  {
    icon: CarFront,
    title: "Freedom to Explore",
    description:
      "Self-drive and with-driver rentals for your complete travel freedom.",
    orange: false,
  },
  {
    icon: UsersRound,
    title: "Made for Every Journey",
    description:
      "Solo, couple, family and group travel with the right vehicles and plans.",
    orange: true,
  },
  {
    icon: MapPin,
    title: "Odisha First, Always",
    description:
      "Local routes, destinations, food stops and trusted travel experiences.",
    orange: false,
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Safety Comes First",
    description:
      "We aim to make every booking straightforward and every journey more reassuring.",
  },
  {
    icon: Heart,
    title: "Travel With Comfort",
    description:
      "Choose the right vehicle for your plans, travel style and group size.",
  },
  {
    icon: Compass,
    title: "Discover More",
    description:
      "Explore beautiful destinations and memorable routes across Odisha.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5f0] text-[#18382a]">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[300px] items-center overflow-hidden sm:min-h-[380px] lg:min-h-[390px]">
        <img
          src="/images/about_hero.png"
          alt="Friends enjoying a scenic road trip"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#09291f]/95 via-[#09291f]/75 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
          <div className="max-w-[650px]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#ff7047] sm:text-sm">
              About MapMySafar
            </p>

            <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Every Journey Has a Story.
              <br />
              Ours Starts in <span className="text-[#f4774b]">Odisha.</span>
            </h1>

            <p className="mt-4 max-w-[540px] text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
              We're making every road trip simpler, safer and more memorable —
              from everyday rides to discovering the heart of Odisha.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 rounded-lg bg-[#e96d43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d85b32]"
              >
                Explore Our Fleet
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/odisha-tours"
                className="inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Discover Odisha
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#e96d43] to-transparent" />
      </section>

      {/* WHO WE ARE */}
      <section className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8 sm:py-12 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e96d43] sm:text-xs">
            Who We Are
          </p>

          <h2 className="text-2xl font-extrabold tracking-tight text-[#172b21] sm:text-3xl lg:text-4xl">
            More than a ride. Your travel companion.
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
            MapMySafar is an Odisha-first travel and car rental platform built
            for people who love to explore. We connect travelers to convenient
            rental options and local travel experiences, bringing essential
            travel services together in one place.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="flex items-center gap-4 rounded-xl border border-[#e9e5dc] bg-white p-4 transition hover:border-[#d8cfc0] hover:shadow-md sm:p-5"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                    feature.orange
                      ? "bg-[#ffeadc] text-[#df542d]"
                      : "bg-[#e3ece3] text-[#183f2e]"
                  }`}
                >
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#18382a] sm:text-base">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* BRAND VALUES STRIP */}
      <section className="bg-[#173b2b] text-white">
        <div className="mx-auto grid max-w-[1400px] px-5 py-4 sm:px-8 md:grid-cols-3 lg:px-12">
          <div className="flex items-center gap-4 border-b border-white/15 py-4 md:border-b-0 md:border-r md:py-2 md:pr-5">
            <Leaf
              size={32}
              className="shrink-0 text-[#f4774b]"
              strokeWidth={1.7}
            />
            <div>
              <h3 className="text-base font-bold sm:text-lg">Odisha First</h3>
              <p className="mt-1 text-xs text-white/70">
                Local roots, local people, local experiences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-white/15 py-4 md:border-b-0 md:border-r md:px-5 md:py-2">
            <UsersRound
              size={32}
              className="shrink-0 text-[#f4774b]"
              strokeWidth={1.7}
            />
            <div>
              <h3 className="text-base font-bold sm:text-lg">
                Every Kind of Journey
              </h3>
              <p className="mt-1 text-xs text-white/70">
                Solo, couple, family and group travel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 md:py-2 md:pl-5">
            <Map
              size={32}
              className="shrink-0 text-[#f4774b]"
              strokeWidth={1.7}
            />
            <div>
              <h3 className="text-base font-bold sm:text-lg">
                One Simple Platform
              </h3>
              <p className="mt-1 text-xs text-white/70">
                Rides, destinations, stays and travel inspiration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="group relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1200&q=85"
              alt="Temple architecture and Odisha heritage"
              loading="lazy"
              className="h-[240px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[320px] lg:h-[340px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-3">
              <p className="text-sm font-bold text-[#173b2b]">
                Explore Odisha Together
              </p>
              <p className="mt-1 text-xs text-gray-600">
                One journey at a time.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e96d43] sm:text-xs">
              Our Vision
            </p>

            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-[#172b21] sm:text-3xl">
              A More Connected Way to Explore Odisha
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              Our vision is to make exploring Odisha simpler by bringing vehicle
              rentals, beautiful destinations and travel inspiration closer
              together.
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              From short city rides to long road trips, we want to help
              travelers discover more, travel comfortably and enjoy the freedom
              to explore at their own pace.
            </p>

            <Link
              to="/odisha-tours"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#e96d43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d85b32]"
            >
              Start Your Journey
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="border-y border-[#e9e3d8] bg-[#efede5]">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e96d43] sm:text-xs">
              What Matters to Us
            </p>

            <h2 className="text-2xl font-extrabold tracking-tight text-[#172b21] sm:text-3xl">
              Travel Better, Together
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Every detail should help make your next journey easier to plan and
              more enjoyable to experience.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-xl border border-[#e4ded2] bg-white p-5 transition hover:shadow-md sm:p-6"
                >
                  <Icon
                    size={29}
                    className="mb-4 text-[#e96d43]"
                    strokeWidth={1.8}
                  />

                  <h3 className="text-base font-bold text-[#18382a] sm:text-lg">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-2xl bg-[#173b2b] px-5 py-10 text-center sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-12 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#ff986f]">
              Your Next Adventure Awaits
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Odisha Is Calling.
              <br />
              Let's Hit the Road.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              Choose your ride, plan your route and make your next journey one
              to remember.
            </p>

            <Link
              to="/fleet"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e96d43] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d85b32]"
            >
              Find Your Ride
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
