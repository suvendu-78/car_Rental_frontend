import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Tag,
  Bell,
  CalendarDays,
  ArrowRight,
  CarFront,
  MapPin,
  Compass,
  Mail,
  X,
  Gift,
  CheckCircle2,
  Clock,
} from "lucide-react";

const API_URL = "http://localhost:8000/api/v1/adim/autho/getAllOfferBanners";

const exploreCards = [
  {
    title: "Explore Odisha Tours",
    description: "Discover beautiful destinations across Odisha.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80",
    button: "View Destinations",
    link: "/odisha-tours",
    icon: MapPin,
  },
  {
    title: "Our Fleet",
    description: "Find the right vehicle for every kind of journey.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
    button: "View Our Fleet",
    link: "/fleet",
    icon: CarFront,
  },
  {
    title: "Plan Your Journey",
    description: "Start planning your next road trip today.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80",
    button: "Explore Now",
    link: "/odisha-tours",
    icon: Compass,
  },
];

const benefits = [
  {
    icon: Tag,
    title: "Best Prices",
    description: "Great savings when available",
  },
  {
    icon: CalendarDays,
    title: "Flexible Booking",
    description: "Hourly, daily and long trips",
  },
  {
    icon: CarFront,
    title: "Vehicle Choices",
    description: "Self-drive and with-driver",
  },
  {
    icon: CheckCircle2,
    title: "Easy Planning",
    description: "Plan your next journey",
  },
];

const parseDate = (value, endOfDay = false) => {
  if (!value) return null;

  const date = new Date(
    value.length === 10
      ? `${value}T${endOfDay ? "23:59:59.999" : "00:00:00"}`
      : value,
  );

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = parseDate(value);

  if (!date) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isOfferActive = (offer) => {
  if (offer.deleted) return false;

  const now = new Date();
  const start = parseDate(offer.validFrom);
  const end = parseDate(offer.validUntil, true);

  return (!start || now >= start) && (!end || now <= end);
};

const isBannerActive = (banner) => {
  if (banner.deleted || !banner.image) return false;

  const now = new Date();
  const start = parseDate(banner.startTime);
  const end = parseDate(banner.endTime);

  return (!start || now >= start) && (!end || now <= end);
};

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [banners, setBanners] = useState([]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchOfferBanners = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Unable to fetch offers and banners",
          );
        }

        const offerData = Array.isArray(result.offers)
          ? result.offers
          : Array.isArray(result.data?.offers)
            ? result.data.offers
            : [];

        const bannerData = Array.isArray(result.banners)
          ? result.banners
          : Array.isArray(result.data?.banners)
            ? result.data.banners
            : [];

        const activeOffers = offerData.filter(isOfferActive);
        const activeBanners = bannerData.filter(isBannerActive);

        setOffers(activeOffers);
        setBanners(activeBanners);

        if (activeOffers.length > 0 || activeBanners.length > 0) {
          setShowPopup(true);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Offer API Error:", error);
          setApiError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchOfferBanners();

    return () => controller.abort();
  }, []);

  const hasOffers = offers.length > 0;
  const hasBanners = banners.length > 0;

  const featuredOffer = offers[0] || null;
  const featuredBanner = banners[0] || null;

  const popupTitle =
    featuredOffer?.title || featuredBanner?.title || "Special Promotion";

  const popupLink = featuredBanner?.link || "/fleet";

  const closePopup = () => {
    setShowPopup(false);
    setPopupClosed(true);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(
      "Email notifications are not connected yet. Please try again later.",
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5f0] text-[#18382a]">
      {showPopup && !popupClosed && !loading && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-xl"
          onClick={closePopup}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="festival-popup-title"
            className="relative w-full max-w-[550px] overflow-hidden rounded-[30px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-[#173b2b] px-6 pb-10 pt-9 text-center text-white sm:px-10 sm:pb-10 sm:pt-9">
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close popup"
                className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={21} />
              </button>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[20px] bg-[#ed7048] shadow-lg">
                <Gift size={36} strokeWidth={2.1} />
              </div>

              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.24em] text-[#ff9b7c]">
                MAPMYSAFAR SPECIAL
              </p>

              <h2
                id="festival-popup-title"
                className="mx-auto mt-3 max-w-[430px] text-[30px] font-extrabold leading-tight sm:text-[38px]"
              >
                {popupTitle}
              </h2>

              {featuredOffer && (
                <p className="mt-3 text-3xl font-extrabold text-[#ff9b7c]">
                  {featuredOffer.discount}% OFF
                </p>
              )}

              <p className="mx-auto mt-4 max-w-[440px] text-base leading-7 text-white/80">
                {featuredOffer
                  ? `Enjoy ${featuredOffer.discount}% off on your next journey across Odisha.`
                  : "Explore this special promotion and plan your next journey across Odisha."}
              </p>

              <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full border border-white/10" />

              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10" />
            </div>

            <div className="px-6 pb-7 pt-7 text-center sm:px-10 sm:pb-8">
              <div className="flex items-center justify-center gap-3 text-base font-semibold text-[#173b2b]">
                <CalendarDays size={20} className="shrink-0 text-[#ed7048]" />

                <span>
                  {featuredOffer
                    ? `Valid until ${formatDate(featuredOffer.validUntil)}`
                    : "Promotion available now"}
                </span>
              </div>

              <p className="mx-auto mt-4 max-w-[440px] text-base leading-7 text-slate-600">
                {featuredOffer
                  ? `Use this special offer for your next road trip. Valid from ${formatDate(featuredOffer.validFrom)} to ${formatDate(featuredOffer.validUntil)}.`
                  : "Discover special promotions and make your next road trip across Odisha memorable."}
              </p>

              <Link
                to={popupLink}
                onClick={closePopup}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ed7048] px-5 py-4 text-base font-bold text-white transition hover:bg-[#d85b32]"
              >
                Explore MapMySafar
                <ArrowRight size={20} />
              </Link>

              <p className="mt-5 text-sm text-slate-500">
                Great journeys don't have to wait.
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="relative flex min-h-[220px] items-end overflow-hidden sm:min-h-[300px] lg:min-h-[365px]">
        <img
          src={featuredBanner?.image || "/images/festival.png"}
          alt={featuredBanner?.title || "MapMySafar Odisha"}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#09291f]/40 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[220px] w-full max-w-[1400px] items-end px-5 pb-5 sm:min-h-[300px] sm:px-8 sm:pb-7 lg:min-h-[365px] lg:px-12 lg:pb-8">
          <div className="flex flex-wrap gap-3">
            <a
              href="#available-offers"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#173b2b] transition hover:bg-[#f1eee6]"
            >
              View Offers
              <ArrowRight size={17} />
            </a>

            <Link
              to={featuredBanner?.link || "/fleet"}
              className="inline-flex items-center gap-2 rounded-lg border border-white/70 bg-[#173b2b]/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#173b2b]/40"
            >
              Find Your Ride
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-2 sm:px-8 md:grid-cols-4 lg:px-12">
        {benefits.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-xl border border-[#e9e5dc] bg-white p-3 sm:p-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  index % 2 === 0
                    ? "bg-[#e96d43] text-white"
                    : "bg-[#173b2b] text-white"
                }`}
              >
                <Icon size={21} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#18382a] sm:text-sm">
                  {item.title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-xs">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <section
        id="available-offers"
        className="mx-auto max-w-[1400px] scroll-mt-6 px-5 pb-10 sm:px-8 lg:px-12"
      >
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e96d43]">
            Special Deals
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#173b2b]">
            Available Offers
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Find an offer that suits your next journey.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-[#e9e5dc] bg-white">
            <p className="text-sm font-semibold text-[#173b2b]">
              Loading offers...
            </p>
          </div>
        ) : apiError ? (
          <div className="rounded-2xl border border-red-200 bg-white px-5 py-10 text-center">
            <p className="font-semibold text-red-700">
              Unable to load promotions
            </p>

            <p className="mt-2 text-sm text-gray-600">{apiError}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#173b2b] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        ) : hasOffers ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <article
                key={offer.id || offer.title || index}
                className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-[#173b2b] to-[#2d7454] text-white">
                  <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
                      Special Offer
                    </p>

                    <p className="mt-2 text-5xl font-extrabold">
                      {offer.discount}%
                    </p>

                    <p className="text-sm font-bold">OFF</p>
                  </div>

                  <span className="absolute left-3 top-3 rounded-lg bg-[#e96d43] px-3 py-2 text-xs font-bold text-white">
                    Limited Period
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#173b2b]">
                    {offer.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Enjoy {offer.discount}% off on your next journey with
                    MapMySafar.
                  </p>

                  <p className="mt-3 text-xs text-gray-500">
                    <Clock size={14} className="mr-1 inline" />
                    Valid: {formatDate(offer.validFrom)} –{" "}
                    {formatDate(offer.validUntil)}
                  </p>

                  <Link
                    to="/fleet"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#e96d43] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d85b32]"
                  >
                    View Offer
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-[#e8e5dc] bg-white px-5 py-10 sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -left-12 top-10 h-36 w-36 rounded-full bg-[#e8efe6]/70 blur-3xl" />

            <div className="pointer-events-none absolute -right-12 bottom-0 h-36 w-36 rounded-full bg-[#ffeadc]/70 blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6eee5] text-[#173b2b]">
                <Tag size={32} strokeWidth={1.7} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#e96d43]">
                Stay Tuned
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#173b2b] sm:text-4xl">
                No Offers Available Right Now
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
                We don't have any active offers at the moment, but exciting
                festival deals and seasonal discounts may be coming soon.
                Meanwhile, explore Odisha and plan your next journey with
                MapMySafar.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/odisha-tours"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#173b2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24533d]"
                >
                  Explore Odisha
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/fleet"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#d9ded5] bg-[#f7f8f4] px-5 py-3 text-sm font-semibold text-[#173b2b] transition hover:bg-[#e9eee6]"
                >
                  View Our Fleet
                  <CarFront size={17} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {hasBanners && (
        <section className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-8 lg:px-12">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e96d43]">
              More to Explore
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#173b2b]">
              Latest Promotions
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {banners.map((banner, index) => (
              <article
                key={banner.id || banner.title || index}
                className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-sm"
              >
                <img
                  src={banner.image}
                  alt={banner.title || "MapMySafar promotion"}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#173b2b]">
                    {banner.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    Explore this promotion and plan your next journey.
                  </p>

                  <p className="mt-3 text-xs text-gray-500">
                    <Clock size={14} className="mr-1 inline" />
                    Ends: {formatDate(banner.endTime)}
                  </p>

                  <Link
                    to={banner.link || "/fleet"}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#d96b43] hover:text-[#b84f2d]"
                  >
                    Explore Now
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="bg-[#eeefe7]">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e96d43]">
              Your Next Adventure
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#173b2b] sm:text-3xl">
              Explore Odisha While You Wait
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Discover destinations, browse vehicles and plan your next road
              trip.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {exploreCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-xl border border-[#e5e4db] bg-white transition hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="h-40 w-full object-cover sm:h-48"
                  />

                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <Icon size={20} className="text-[#e96d43]" />

                      <h3 className="text-lg font-bold text-[#173b2b]">
                        {card.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {card.description}
                    </p>

                    <Link
                      to={card.link}
                      className="mt-4 flex items-center justify-between rounded-lg bg-[#edf0e8] px-4 py-3 text-sm font-semibold text-[#173b2b] transition hover:bg-[#dfe8dc]"
                    >
                      {card.button}
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="grid items-center gap-6 rounded-2xl border border-[#dfe4d9] bg-[#e9eee5] p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e96d43] text-white sm:h-14 sm:w-14">
              <Mail size={26} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e96d43]">
                Stay Updated
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-[#173b2b] sm:text-2xl">
                Be the First to Know
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Get updates about upcoming festival offers, seasonal deals and
                special discounts.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="w-full">
            <label
              htmlFor="offers-email"
              className="mb-2 block text-sm font-semibold text-[#173b2b]"
            >
              Email address
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="offers-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="Enter your email address"
                className="min-w-0 flex-1 rounded-lg border border-[#d8ded5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#e96d43] focus:ring-2 focus:ring-[#e96d43]/15"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e96d43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#d85b32]"
              >
                <Bell size={16} />
                Notify Me
              </button>
            </div>

            {emailError && (
              <p role="status" className="mt-2 text-xs text-red-700">
                {emailError}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-500">
              Email notifications require a connected email service.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
