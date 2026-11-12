import { useState } from "react";
import { Heart, MapPin, Trash2 } from "lucide-react";

const initialPlaces = [
  {
    id: 1,
    name: "Puri Beach",
    type: "Beach destination",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Konark Sun Temple",
    type: "Heritage destination",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Chilika Lake",
    type: "Nature destination",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80",
  },
];

const Wishlist = () => {
  const [places, setPlaces] = useState(initialPlaces);

  const removePlace = (id) => {
    setPlaces((current) => current.filter((place) => place.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#D96B43]">SAVED FOR LATER</p>
        <h1 className="mt-1 text-3xl font-bold text-[#1E3A2B]">My Wishlist</h1>
        <p className="mt-2 text-gray-500">
          Your favourite destinations in one place.
        </p>
      </div>

      {places.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          <Heart className="mx-auto text-[#D96B43]" size={40} />
          <h2 className="mt-4 font-bold text-[#1E3A2B]">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Save destinations you want to visit.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {places.map((place) => (
            <article
              key={place.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <img
                src={place.image}
                alt={place.name}
                loading="lazy"
                className="h-48 w-full object-cover"
              />
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <h2 className="font-bold text-[#1E3A2B]">{place.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{place.type}</p>
                  <p className="mt-3 flex items-center gap-1 text-xs text-[#D96B43]">
                    <MapPin size={14} /> Odisha, India
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removePlace(place.id)}
                  aria-label={`Remove ${place.name}`}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        Demo data; changes reset after refresh.
      </p>
    </div>
  );
};

export default Wishlist;
