import { useState } from "react";
import { MapPin, Search } from "lucide-react";

const destinations = [
  {
    name: "Puri Beach",
    type: "Beach",
    description: "Coastal views and peaceful seaside walks.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Konark Sun Temple",
    type: "Heritage",
    description: "Discover Odisha's remarkable heritage.",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chilika Lake",
    type: "Nature",
    description: "Enjoy the lagoon and its landscapes.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Daringbadi",
    type: "Hills",
    description: "Explore green hills and scenic surroundings.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  },
];

const Explore = () => {
  const [search, setSearch] = useState("");

  const filtered = destinations.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#D96B43]">
          DISCOVER THE STATE
        </p>
        <h1 className="mt-1 text-3xl font-bold text-[#1E3A2B]">
          Explore Odisha
        </h1>
        <p className="mt-2 text-gray-500">
          Find inspiration for your next road trip.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-white px-4 shadow-sm">
        <Search size={19} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations..."
          className="w-full py-3 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((place) => (
          <article
            key={place.name}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <img
              src={place.image}
              alt={place.name}
              loading="lazy"
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <span className="rounded-full bg-[#FBEAE2] px-3 py-1 text-xs font-semibold text-[#D96B43]">
                {place.type}
              </span>
              <h2 className="mt-3 text-lg font-bold text-[#1E3A2B]">
                {place.name}
              </h2>
              <p className="mt-2 text-sm text-gray-500">{place.description}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-[#D96B43]">
                <MapPin size={16} /> Odisha, India
              </p>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500">No destinations match your search.</p>
      )}
    </div>
  );
};

export default Explore;
