import { NavLink } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const bhubaneswarIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 30px;
      height: 30px;
      background: #3182ce;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 7px;
        left: 7px;
      "></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const Home = () => {
  const categories = [
    { title: "Solo Ride", image: "/images/solo.jpg" },
    { title: "Couple Ride", image: "/images/couple.jpg" },
    { title: "Family Ride", image: "/images/family.jpg" },
    { title: "Visiting Place", image: "/images/visiting.jpg" },
    { title: "Mechanic", image: "/images/mechanic.jpg" },
    { title: "Hospital", image: "/images/hospital.jpg" },
    { title: "Hotel", image: "/images/hotel.jpg" },
  ];

  const exploreCategories = [
    {
      title: "Solo Ride",
      type: "Freedom on Two Wheels",
      details: "Bike • Scooter • Easy Ride",
      image: "/images/solo.jpg",
    },
    {
      title: "Couple Ride",
      type: "Comfortable Journey for Two",
      details: "Sedan • SUV • Comfortable",
      image: "/images/couple.jpg",
    },
    {
      title: "Family Ride",
      type: "Travel Together, Travel Better",
      details: "SUV • Traveller • Spacious",
      image: "/images/family.jpg",
    },
    {
      title: "Restaurant",
      type: "Taste the Local Flavours",
      details: "Local Food • Dining • Cafés",
      image: "/images/restaurant.jpg",
    },
    {
      title: "Hospital",
      type: "Healthcare When You Need It",
      details: "Emergency • Care • Nearby",
      image: "/images/hospital.jpg",
    },
    {
      title: "Mechanic",
      type: "Keep Your Journey Moving",
      details: "Car • Bike • Service",
      image: "/images/mechanic.jpg",
    },
    {
      title: "Hotel",
      type: "Relax, Rest & Stay",
      details: "Hotel • Resort • Stay",
      image: "/images/hotel.jpg",
    },
  ];

  const offers = [
    {
      title: "Weekend Getaway",
      subtitle: "Up to 30% OFF",
      image: "/images/weekend.jpg",
      button: "Book Now",
    },
    {
      title: "Long Drive Special",
      subtitle: "Flat 25% OFF",
      image: "/images/long-drive.jpg",
      button: "View Offers",
    },
    {
      title: "Explore Odisha",
      subtitle: "Special Packages",
      image: "/images/odisha.jpg",
      button: "See Deals",
    },
  ];

  const hiddenPlaces = [
    {
      title: "Naudhei Waterfall",
      image: "/images/naudehi.jpg",
    },
    {
      title: "Deomali Hills",
      image: "/images/deomali.jpg",
    },
    {
      title: "Chilika Sunset",
      image: "/images/chilika_sun_set.jpg",
    },
    {
      title: "Tikarapada",
      image: "/images/tikarpada.jpg",
    },
    {
      title: "Belghar Nature",
      image: "/images/belghar.jpg",
    },
  ];

  const popularSearches = [
    {
      name: "Puri",
      description: "Beach • Temple",
      image: "/images/puri.jpg",
    },
    {
      name: "Konark",
      description: "Sun Temple",
      image: "/images/konark.jpg",
    },
    {
      name: "Chilika",
      description: "Lake • Nature",
      image: "/images/chilika_sun_set.jpg",
    },
    {
      name: "Similipal",
      description: "Forest • Wildlife",
      image: "/images/simlipal.jpg",
    },
    {
      name: "Koraput",
      description: "Hills • Nature",
      image: "/images/deomali.jpg",
    },
  ];

  return (
    <main className="bg-[#F4EFEA] text-[#1E3A2B]">
      <section className="hidden sm:block px-3 sm:px-5 lg:px-8 pt-5">
        <div className="max-w-[1450px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) =>
              category.title === "Solo Ride" ? (
                <NavLink
                  key={category.title}
                  to="/solo"
                  className="bg-white border border-[#1E3A2B]/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.title}
                      loading="eager"
                      decoding="async"
                      className="block w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="h-14 flex items-center justify-center px-2">
                    <span className="text-sm sm:text-base font-semibold text-center tracking-tight">
                      {category.title}
                    </span>
                  </div>
                </NavLink>
              ) : (
                <div
                  key={category.title}
                  className="bg-white border border-[#1E3A2B]/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.title}
                      loading="eager"
                      decoding="async"
                      className="block w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="h-14 flex items-center justify-center px-2">
                    <span className="text-sm sm:text-base font-semibold text-center tracking-tight">
                      {category.title}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-8 mt-5">
        <div className="max-w-[1450px] mx-auto">
          <div className="relative h-[330px] sm:h-[440px] lg:h-[520px] overflow-hidden rounded-2xl">
            <img
              src="/images/hero.jpg"
              alt="Explore Odisha"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A2B]/80 via-[#1E3A2B]/40 to-transparent" />

            <div className="relative z-10 max-w-2xl px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 lg:pt-28">
              <p className="text-[#D96B43] text-sm font-semibold uppercase tracking-[0.18em]">
                Explore Odisha
              </p>

              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Book vehicle
                <span className="text-[#D96B43]"> anywhere </span>
                and go to home safely with affordable price
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-8 -mt-16 relative z-10">
        <div className="max-w-[1450px] mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-[#1E3A2B]/10 p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#1E3A2B]">
                  State
                </label>

                <select className="mt-1 w-full h-11 px-3 bg-[#F4EFEA] border border-[#1E3A2B]/10 rounded-lg text-sm outline-none focus:border-[#D96B43]">
                  <option>Odisha</option>
                  <option>West Bengal</option>
                  <option>Jharkhand</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1E3A2B]">
                  District
                </label>

                <select className="mt-1 w-full h-11 px-3 bg-[#F4EFEA] border border-[#1E3A2B]/10 rounded-lg text-sm outline-none focus:border-[#D96B43]">
                  <option>Select District</option>
                  <option>Khordha</option>
                  <option>Puri</option>
                  <option>Cuttack</option>
                  <option>Koraput</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1E3A2B]">
                  Visiting Place / Work
                </label>

                <select className="mt-1 w-full h-11 px-3 bg-[#F4EFEA] border border-[#1E3A2B]/10 rounded-lg text-sm outline-none focus:border-[#D96B43]">
                  <option>Choose Place</option>
                  <option>Puri Beach</option>
                  <option>Konark</option>
                  <option>Chilika</option>
                  <option>Similipal</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full h-11 bg-[#D96B43] hover:bg-[#c55c39] text-white font-semibold rounded-lg transition">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-8 py-12">
        <div className="max-w-[1450px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[#1E3A2B]/10 p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Search state and their district with
                <span className="text-[#D96B43]">
                  {" "}
                  their visiting place
                </span>{" "}
                and another work
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <select className="h-11 px-3 bg-[#F4EFEA] border border-[#1E3A2B]/10 rounded-lg text-sm">
                  <option>Select State</option>
                </select>

                <select className="h-11 px-3 bg-[#F4EFEA] border border-[#1E3A2B]/10 rounded-lg text-sm">
                  <option>Select District</option>
                </select>

                <select className="h-11 px-3 bg-[#F4EFEA] border border-[#1E3A2B]/10 rounded-lg text-sm">
                  <option>Visiting Place</option>
                </select>
              </div>

              <button className="w-full mt-4 h-11 bg-[#D96B43] hover:bg-[#c55c39] text-white rounded-lg font-semibold transition">
                Find Cars →
              </button>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-7 bg-[#D96B43] rounded-full"></span>

                      <p className="text-base sm:text-lg font-bold text-[#1E3A2B]">
                        Popular Searches
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 ml-3">
                      Explore popular destinations in Odisha
                    </p>
                  </div>

                  <div className="hidden sm:flex w-9 h-9 rounded-full bg-[#F4EFEA] items-center justify-center text-lg">
                    📍
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {popularSearches.map((place) => (
                    <button
                      key={place.name}
                      type="button"
                      className="group text-left bg-[#F8F5F1] hover:bg-white border border-[#1E3A2B]/10 rounded-xl p-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-w-0"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={place.image}
                            alt={place.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="min-w-0 flex-1 overflow-hidden">
                          <div className="flex items-center gap-1 min-w-0">
                            <span className="text-[#D96B43] text-[9px] shrink-0">
                              📍
                            </span>

                            <p className="font-bold text-xs text-[#1E3A2B] truncate">
                              {place.name}
                            </p>
                          </div>

                          <p className="text-[9px] text-gray-500 mt-0.5 truncate">
                            {place.description}
                          </p>

                          <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-[#D96B43] mt-1">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-0 isolate h-[360px] sm:h-[420px] bg-white rounded-2xl overflow-hidden border border-[#1E3A2B]/10">
              <MapContainer
                center={[20.45, 84.9]}
                zoom={7}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[20.2961, 85.8245]} icon={bhubaneswarIcon}>
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-[#1E3A2B]">Bhubaneswar</h3>

                      <p className="text-sm text-gray-600 mt-1">
                        Explore Odisha from here.
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-8 pb-12">
        <div className="max-w-[1450px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Explore by Category
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Find what you need for your journey.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {exploreCategories.map((category) =>
              category.title === "Solo Ride" ? (
                <NavLink
                  key={category.title}
                  to="/solo"
                  className="bg-white rounded-xl overflow-hidden border border-[#1E3A2B]/10 shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.title}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[#1E3A2B] tracking-tight">
                          {category.title}
                        </h3>

                        <p className="text-sm font-medium text-[#D96B43] mt-1">
                          {category.type}
                        </p>

                        <p className="text-xs text-gray-500 mt-1.5 leading-5">
                          {category.details}
                        </p>
                      </div>

                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D96B43] text-white text-lg font-medium flex items-center justify-center shadow-sm">
                        →
                      </span>
                    </div>
                  </div>
                </NavLink>
              ) : (
                <div
                  key={category.title}
                  className="bg-white rounded-xl overflow-hidden border border-[#1E3A2B]/10 shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.title}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[#1E3A2B] tracking-tight">
                          {category.title}
                        </h3>

                        <p className="text-sm font-medium text-[#D96B43] mt-1">
                          {category.type}
                        </p>

                        <p className="text-xs text-gray-500 mt-1.5 leading-5">
                          {category.details}
                        </p>
                      </div>

                      <button className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D96B43] hover:bg-[#c55c39] text-white text-lg font-medium transition shadow-sm">
                        →
                      </button>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-8 pb-12">
        <div className="max-w-[1450px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Offers <span className="text-[#D96B43]">Live</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {offers.map((offer) => (
              <div
                key={offer.title}
                className="relative h-60 sm:h-72 rounded-2xl overflow-hidden"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2B]/85 via-[#1E3A2B]/35 to-transparent" />

                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {offer.title}
                    </h3>

                    <p className="text-[#F4EFEA]/90 mt-1">{offer.subtitle}</p>
                  </div>

                  <button className="w-fit px-4 py-2.5 bg-[#D96B43] hover:bg-[#c55c39] rounded-lg text-sm font-semibold transition">
                    {offer.button} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-8 pb-12">
        <div className="max-w-[1450px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Hidden Visiting Places
          </h2>

          <div className="relative rounded-2xl overflow-hidden bg-[#1E3A2B] min-h-[620px] sm:min-h-[470px]">
            <img
              src="/images/hidden-odisha.jpg"
              alt="Hidden Odisha"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A2B]/95 via-[#1E3A2B]/75 to-[#1E3A2B]/30" />

            <div className="relative z-10 p-5 sm:p-8 lg:p-10 text-white">
              <p className="text-[#D96B43] text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]">
                Discover
              </p>

              <h2 className="text-2xl sm:text-4xl font-bold mt-1 tracking-tight">
                Odisha's Hidden Gems
              </h2>

              <p className="text-sm sm:text-base text-[#F4EFEA]/85 mt-3 max-w-md leading-6">
                Share reels, discover hidden places and win exciting gigs.
              </p>

              <button className="mt-5 px-5 py-2.5 bg-[#D96B43] hover:bg-[#c55c39] rounded-lg text-sm font-semibold transition">
                Share Your Reel →
              </button>
            </div>

            <div className="relative z-10 px-4 pb-5 sm:absolute sm:right-4 sm:bottom-4 sm:left-auto sm:w-[60%] sm:px-0 sm:pb-0">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {hiddenPlaces.map((place) => (
                  <div
                    key={place.title}
                    className="relative h-36 sm:h-40 rounded-xl overflow-hidden border border-white/40 shadow-xl"
                  >
                    <img
                      src={place.image}
                      alt={place.title}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <span className="absolute bottom-2 left-2 right-1 text-xs sm:text-sm text-white font-semibold">
                      {place.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-8 pb-12">
        <div className="max-w-[1450px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Frequently Asked <span className="text-[#D96B43]">Questions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What documents are required to rent a car?",
              "Can I take the car to outstation locations?",
              "Is there a security deposit?",
              "What happens in case of a breakdown?",
            ].map((question) => (
              <div
                key={question}
                className="bg-white border border-[#1E3A2B]/10 rounded-xl px-5 py-5 flex items-center justify-between shadow-sm"
              >
                <span className="text-sm">{question}</span>

                <span className="text-xl text-[#1E3A2B]">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
