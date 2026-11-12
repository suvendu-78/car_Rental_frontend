import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Info,
  MapPin,
  Route,
  Users,
} from "lucide-react";

const Wheel = ({ cx, cy = 29, r = 5 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#222" />
    <circle cx={cx} cy={cy} r={r * 0.45} fill="#BDBDBD" />
  </g>
);

const CarSvg = ({ size = 40, body, path, windows }) => (
  <svg
    width={size * 1.5}
    height={size}
    viewBox="0 0 64 40"
    fill="none"
    aria-hidden="true"
  >
    <ellipse cx="32" cy="35" rx="26" ry="2" fill="#000" opacity="0.1" />
    <path d={path} fill={body} stroke="#8A8A8A" strokeWidth="0.8" />
    <path d={windows} fill="#CFE3EE" stroke="#8A8A8A" strokeWidth="0.6" />
    <rect x="57" y="22" width="3" height="2.5" rx="1" fill="#F5C518" />
    <Wheel cx={17} />
    <Wheel cx={47} />
  </svg>
);

const AutoIcon = ({ size = 40 }) => (
  <svg
    width={size * 1.5}
    height={size}
    viewBox="0 0 64 40"
    fill="none"
    aria-hidden="true"
  >
    <ellipse cx="32" cy="35" rx="24" ry="2" fill="#000" opacity="0.1" />
    <path d="M12 8h28l6 10H10z" fill="#2E7D32" />
    <path
      d="M10 18h36l9 5v8H10z"
      fill="#F5C518"
      stroke="#8A6D00"
      strokeWidth="0.8"
    />
    <path d="M14 11h24l4 6H13z" fill="#CFE3EE" />
    <rect x="53" y="22" width="3" height="3" rx="1" fill="#fff" />
    <Wheel cx={18} />
    <Wheel cx={48} />
  </svg>
);

const BikeIcon = ({ size = 40 }) => (
  <svg
    width={size * 1.5}
    height={size}
    viewBox="0 0 64 40"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="14" cy="28" r="7" stroke="#222" strokeWidth="2.5" />
    <circle cx="50" cy="28" r="7" stroke="#222" strokeWidth="2.5" />
    <path
      d="M14 28l10-12h14l6 12"
      stroke="#D96B43"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38 16l4-6h6"
      stroke="#222"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect x="22" y="12" width="14" height="4" rx="2" fill="#222" />
  </svg>
);

const ScooterIcon = ({ size = 40 }) => (
  <svg
    width={size * 1.5}
    height={size}
    viewBox="0 0 64 40"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="14" cy="30" r="5" fill="#222" />
    <circle cx="50" cy="30" r="5" fill="#222" />
    <path
      d="M10 26h16l6 4h8l4-14h-4"
      stroke="#1E3A2B"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 16l-2-8h8"
      stroke="#222"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect x="10" y="20" width="18" height="5" rx="2.5" fill="#D96B43" />
  </svg>
);

const HatchbackIcon = ({ size = 40 }) => (
  <CarSvg
    size={size}
    body="#FFFFFF"
    path="M4 29v-7c0-2 1-3 3-4l9-2 6-6c1-1 3-2 5-2h14c3 0 5 1 7 3l5 7 4 1c2 1 3 2 3 4v5z"
    windows="M22 17l4-5h13c2 0 3 1 4 2l3 5z"
  />
);

const SedanIcon = ({ size = 40 }) => (
  <CarSvg
    size={size}
    body="#F3F4F6"
    path="M3 29v-5c0-2 1-3 3-3l10-2 7-5c2-1 3-1 5-1h12c3 0 5 1 7 4l3 3 10 2c2 1 3 2 3 4v3z"
    windows="M23 16l5-4h11c2 0 3 1 4 2l3 3z"
  />
);

const SuvIcon = ({ size = 40 }) => (
  <CarSvg
    size={size}
    body="#FFFFFF"
    path="M4 29V19c0-2 1-3 3-3h4l4-6c1-1 2-2 4-2h26c2 0 3 1 4 2l3 6h5c2 0 3 1 3 3v10z"
    windows="M17 16l3-4h26l3 4z"
  />
);

const vehicles = [
  {
    id: "bike",
    name: "Bike",
    description: "Affordable rides for solo travel",
    pricePerKm: 8,
    baseFare: 0,
    passengers: 1,
    eta: "3 min",
    Icon: BikeIcon,
  },
  {
    id: "scooter",
    name: "Scooter",
    description: "Quick and comfortable solo travel",
    pricePerKm: 9,
    baseFare: 0,
    passengers: 1,
    eta: "4 min",
    Icon: ScooterIcon,
  },
  {
    id: "auto",
    name: "Auto",
    description: "Get an auto at your doorstep",
    pricePerKm: 14,
    baseFare: 0,
    passengers: 3,
    eta: "5 min",
    Icon: AutoIcon,
  },
  {
    id: "hatchback-non-ac",
    name: "Mini Non-AC",
    description: "Comfy hatchbacks at pocket-friendly fares",
    pricePerKm: 18,
    baseFare: 0,
    passengers: 4,
    eta: "5 min",
    Icon: HatchbackIcon,
  },
  {
    id: "hatchback-ac",
    name: "Mini AC",
    description: "Comfortable rides for everyday travel",
    pricePerKm: 20,
    baseFare: 0,
    passengers: 4,
    eta: "6 min",
    Icon: HatchbackIcon,
  },
  {
    id: "sedan",
    name: "Prime Sedan",
    description: "Spacious sedans for a comfortable ride",
    pricePerKm: 24,
    baseFare: 0,
    passengers: 4,
    eta: "7 min",
    Icon: SedanIcon,
  },
  {
    id: "suv",
    name: "Prime SUV",
    description: "Extra space for family and luggage",
    pricePerKm: 28,
    baseFare: 0,
    passengers: 6,
    eta: "8 min",
    Icon: SuvIcon,
  },
];

const formatPrice = (price) => `₹${Math.round(price).toLocaleString("en-IN")}`;

const pickupIcon = L.divIcon({
  className: "",
  html: '<div style="width:18px;height:18px;border-radius:50%;background:#1E3A2B;border:4px solid #fff;box-shadow:0 0 0 2px #1E3A2B"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const dropIcon = L.divIcon({
  className: "",
  html: '<div style="width:18px;height:18px;border-radius:50%;background:#D96B43;border:4px solid #fff;box-shadow:0 0 0 2px #D96B43"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length) {
      map.fitBounds(points, { padding: [40, 40] });
    }
  }, [map, points]);

  return null;
}

function RouteMap({ routeInfo, status, heightClass }) {
  if (status === "loading") {
    return (
      <div
        className={`flex ${heightClass} items-center justify-center rounded-2xl bg-[#E9EBE3] text-sm text-slate-500`}
      >
        Finding route...
      </div>
    );
  }

  if (status === "error" || !routeInfo) {
    return (
      <div
        className={`flex ${heightClass} items-center justify-center rounded-2xl bg-[#E9EBE3] px-4 text-center text-sm text-slate-500`}
      >
        Could not load the map for this route. Try a more specific address.
      </div>
    );
  }

  return (
    <div
      className={`relative z-0 ${heightClass} overflow-hidden rounded-2xl border border-[#E7E3D9] shadow-sm`}
    >
      <MapContainer
        center={[routeInfo.from.lat, routeInfo.from.lng]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Polyline
          positions={routeInfo.coords}
          pathOptions={{ color: "#1E3A2B", weight: 5 }}
        />
        <Marker
          position={[routeInfo.from.lat, routeInfo.from.lng]}
          icon={pickupIcon}
        />
        <Marker
          position={[routeInfo.to.lat, routeInfo.to.lng]}
          icon={dropIcon}
        />
        <FitBounds points={routeInfo.coords} />
      </MapContainer>
    </div>
  );
}

export default function RideOptions() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state?.bookingData ?? location.state ?? {};
  const email = bookingData.email ?? bookingData.user?.email ?? "";
  const name = bookingData.name ?? bookingData.user?.name ?? "";
  const mobile = bookingData.mobile ?? bookingData.user?.mobile ?? "";

  const pickup =
    location.state?.pickup ??
    bookingData.pickup ??
    bookingData.route?.pickup ??
    "";
  const drop =
    location.state?.drop ?? bookingData.drop ?? bookingData.route?.drop ?? "";
  const pickupLocation =
    location.state?.pickupLocation ?? bookingData.pickupLocation ?? null;
  const dropLocation =
    location.state?.dropLocation ?? bookingData.dropLocation ?? null;

  const [selectedId, setSelectedId] = useState("auto");
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeStatus, setRouteStatus] = useState("loading");

  useEffect(() => {
    if (!pickup || !drop) {
      setRouteStatus("error");
      return;
    }

    const controller = new AbortController();
    setRouteStatus("loading");
    setRouteInfo(null);

    const geocode = async (address) => {
      const seen = new Set();
      const parts = address
        .split(",")
        .map((part) => part.trim())
        .filter((part) => {
          const key = part.toLowerCase();
          if (!part || seen.has(key)) return false;
          seen.add(key);
          return true;
        });

      const attempts = [
        parts.join(", "),
        parts.slice(-3).join(", "),
        parts.slice(-2).join(", "),
      ];

      for (let i = 0; i < attempts.length; i++) {
        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.set("format", "jsonv2");
        url.searchParams.set("limit", "1");
        url.searchParams.set("countrycodes", "in");
        url.searchParams.set("q", attempts[i]);

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Location lookup failed");

        const data = await response.json();

        if (data[0]) {
          return {
            lat: Number(data[0].lat),
            lng: Number(data[0].lon),
            exact: i === 0,
          };
        }
      }

      throw new Error(`Location not found: ${address}`);
    };

    const getCoordinates = (selectedLocation, address) => {
      const latitude = Number(selectedLocation?.latitude);
      const longitude = Number(selectedLocation?.longitude);

      if (
        selectedLocation &&
        Number.isFinite(latitude) &&
        Number.isFinite(longitude)
      ) {
        return Promise.resolve({
          lat: latitude,
          lng: longitude,
          exact: true,
        });
      }

      return geocode(address);
    };

    const loadRoute = async () => {
      try {
        const from = await getCoordinates(pickupLocation, pickup);
        const to = await getCoordinates(dropLocation, drop);

        const routeUrl =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${from.lng},${from.lat};${to.lng},${to.lat}` +
          `?overview=full&geometries=geojson`;

        const response = await fetch(routeUrl, { signal: controller.signal });

        if (!response.ok) throw new Error("Route lookup failed");

        const data = await response.json();
        const route = data.routes?.[0];

        if (!route) throw new Error("No route found");

        const minutes = Math.max(1, Math.round(route.duration / 60));
        const distance = Math.round(route.distance / 100) / 10;
        const travelDuration =
          minutes >= 60
            ? `${Math.floor(minutes / 60)} hr ${minutes % 60} min`
            : `${minutes} min`;

        setRouteInfo({
          from,
          to,
          coords: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
          distanceKm: distance,
          durationMinutes: minutes,
          duration: travelDuration,
          approx: !from.exact || !to.exact || route.distance < 300,
        });

        setRouteStatus("ready");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Route calculation error:", error);
          setRouteStatus("error");
        }
      }
    };

    loadRoute();
    return () => controller.abort();
  }, [pickup, drop, pickupLocation, dropLocation]);

  const passedDistance = Number(
    location.state?.distanceKm ??
      bookingData.distanceKm ??
      bookingData.route?.distanceKm,
  );

  const distanceKm =
    Number.isFinite(passedDistance) && passedDistance > 0
      ? passedDistance
      : routeInfo?.distanceKm > 0
        ? routeInfo.distanceKm
        : null;

  const duration =
    location.state?.duration ??
    bookingData.duration ??
    bookingData.route?.duration ??
    routeInfo?.duration ??
    null;

  const selectedVehicle =
    vehicles.find((vehicle) => vehicle.id === selectedId) ?? vehicles[0];

  const fare =
    distanceKm !== null
      ? Math.ceil(
          selectedVehicle.pricePerKm * distanceKm + selectedVehicle.baseFare,
        )
      : null;

  if (!email || !pickup || !drop) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F6F1] p-5 text-[#1E3A2B]">
        <div className="w-full max-w-md rounded-3xl border border-[#E7E3D9] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7EDE5]">
            <MapPin size={26} />
          </div>
          <h1 className="mt-5 text-2xl font-bold">Ride details not found</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your email, pickup, or destination data is missing. Please enter
            your route again.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 w-full rounded-xl bg-[#1E3A2B] px-5 py-3 font-semibold text-white transition hover:bg-[#294C39]"
          >
            Back to booking
          </button>
        </div>
      </main>
    );
  }

  const continueBooking = async () => {
    if (
      routeStatus !== "ready" ||
      !routeInfo ||
      distanceKm === null ||
      fare === null
    ) {
      alert(
        "Please wait until the route, distance, and fare have been calculated.",
      );
      return;
    }

    const bookingObject = {
      user: {
        name,
        email,
        mobile: mobile || null,
      },
      route: {
        pickup,
        drop,
        pickupPincode: pickupLocation?.pincode || "",
        dropPincode: dropLocation?.pincode || "",
        pickupCoords: { lat: routeInfo.from.lat, lng: routeInfo.from.lng },
        dropCoords: { lat: routeInfo.to.lat, lng: routeInfo.to.lng },
        distanceKm,
        duration: routeInfo.duration,
        durationMinutes: routeInfo.durationMinutes,
        approximate: routeInfo.approx,
      },
      vehicle: {
        id: selectedVehicle.id,
        name: selectedVehicle.name,
        passengers: selectedVehicle.passengers,
        eta: selectedVehicle.eta,
      },
      fare: {
        pricePerKm: selectedVehicle.pricePerKm,
        baseFare: selectedVehicle.baseFare,
        estimatedFare: fare,
        currency: "INR",
      },
      booking: {
        status: "pending",
        bookingDate: new Date().toISOString(),
      },
    };

    console.log("Complete Booking Object:", bookingObject);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/getbookdata",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingObject),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to save booking details.");
      }

      navigate("/bookingSuccess", {
        state: { bookingData: bookingObject },
      });
    } catch (error) {
      console.error("Booking save error:", error);
      alert(
        "Unable to save booking details. Check your backend API and try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F6F1] px-4 py-4 text-[#1E3A2B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <RouteMap
            routeInfo={routeInfo}
            status={routeStatus}
            heightClass="h-[260px] sm:h-[340px] lg:h-[420px]"
          />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1E3A2B] shadow-md transition hover:text-[#D96B43]"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {routeInfo?.approx && (
          <p className="mt-2 text-xs leading-5 text-[#D96B43]">
            We couldn't find the exact location, so this distance may be
            approximate. Please enter a more specific pickup or destination.
          </p>
        )}

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <section className="rounded-2xl border border-[#E7E3D9] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold">Your route</h2>
              <div className="relative mt-5 space-y-6">
                <div className="absolute left-[11px] top-5 h-[66px] border-l-2 border-dashed border-slate-300" />
                <div className="relative flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E3A2B]">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">PICKUP LOCATION</p>
                    <p className="mt-1 break-words text-sm font-semibold text-slate-900">
                      {pickup}
                    </p>
                    {pickupLocation?.pincode && (
                      <p className="mt-1 text-xs text-slate-500">
                        Pincode: {pickupLocation.pincode}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D96B43] text-white">
                    <MapPin size={14} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">DESTINATION</p>
                    <p className="mt-1 break-words text-sm font-semibold text-slate-900">
                      {drop}
                    </p>
                    {dropLocation?.pincode && (
                      <p className="mt-1 text-xs text-slate-500">
                        Pincode: {dropLocation.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F4F5EF] p-3">
                  <Route size={19} />
                  <p className="mt-2 text-sm font-bold">
                    {distanceKm !== null ? `${distanceKm} km` : "Pending"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Road distance</p>
                </div>
                <div className="rounded-xl bg-[#F4F5EF] p-3">
                  <Clock3 size={19} />
                  <p className="mt-2 text-sm font-bold">
                    {duration || "Pending"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Travel time</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#E7E3D9] bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold">Booking details</h2>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Customer</p>
                  <p className="mt-1 break-words text-sm font-medium">
                    {name || email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="mt-1 break-all text-sm font-medium">{email}</p>
                </div>
                {mobile && (
                  <div>
                    <p className="text-xs text-slate-500">Mobile</p>
                    <p className="mt-1 text-sm font-medium">{mobile}</p>
                  </div>
                )}
              </div>
            </section>

            <div className="flex gap-3 rounded-2xl border border-[#E8E8DE] bg-[#F0F2E9] p-4">
              <Info size={20} className="mt-0.5 shrink-0 text-[#D96B43]" />
              <p className="text-xs leading-5 text-slate-600">
                Prices shown are sample rates. Actual fares depend on the
                calculated route and backend pricing rules.
              </p>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Available rides
              </p>
              <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                Select your vehicle
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E1E2DA] bg-white px-3 sm:px-5">
              {vehicles.map((vehicle, index) => {
                const Icon = vehicle.Icon;
                const isSelected = selectedId === vehicle.id;
                const estimatedFare =
                  distanceKm !== null
                    ? Math.ceil(
                        vehicle.pricePerKm * distanceKm + vehicle.baseFare,
                      )
                    : null;

                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(vehicle.id)}
                    className={`flex w-full items-center gap-3 py-4 text-left transition sm:gap-4 ${index !== vehicles.length - 1 ? "border-b border-[#E5E5E0]" : ""} ${isSelected ? "bg-[#F3F6EF]" : "bg-white hover:bg-[#FAFAF7]"}`}
                  >
                    <div className="flex w-[58px] shrink-0 flex-col items-center gap-1 sm:w-[68px]">
                      <div
                        className={`flex h-10 w-12 items-center justify-center overflow-visible rounded-lg sm:h-12 sm:w-14 ${isSelected ? "bg-[#E7EDE5] ring-2 ring-[#1E3A2B]" : "bg-[#F2F3EE]"}`}
                      >
                        <Icon size={26} />
                      </div>
                      <span className="whitespace-nowrap text-xs font-medium text-slate-600">
                        {vehicle.eta}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#172820] sm:text-base">
                          {vehicle.name}
                        </h3>
                        {isSelected && (
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1E3A2B] text-white">
                            <Check size={10} />
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        {vehicle.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Users size={13} />
                          {vehicle.passengers}
                        </span>
                        <span>₹{vehicle.pricePerKm}/km</span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#1E3A2B] sm:text-base">
                          {estimatedFare !== null
                            ? formatPrice(estimatedFare)
                            : `₹${vehicle.pricePerKm}/km`}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                          {estimatedFare !== null ? "Estimated fare" : "Per km"}
                        </p>
                      </div>
                      <ChevronRight
                        size={20}
                        className={
                          isSelected ? "text-[#D96B43]" : "text-slate-300"
                        }
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Arrival times are illustrative. Live driver availability is not
              connected yet.
            </p>
          </section>
        </div>

        <div className="sticky bottom-3 z-10 mt-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-[#1E3A2B] p-4 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-[#1E3A2B]">
                <selectedVehicle.Icon size={28} />
              </div>
              <div>
                <p className="text-xs text-white/70">Selected ride</p>
                <p className="mt-1 font-bold">{selectedVehicle.name}</p>
                <p className="text-xs text-white/70">
                  {selectedVehicle.passengers} passenger
                  {selectedVehicle.passengers > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-white/70">Estimated fare</p>
              <p className="mt-1 text-2xl font-extrabold">
                {fare !== null ? formatPrice(fare) : "Pending"}
              </p>
              <p className="mt-1 text-xs text-white/70">
                ₹{selectedVehicle.pricePerKm}/km
              </p>
            </div>

            <button
              type="button"
              onClick={continueBooking}
              disabled={
                routeStatus !== "ready" || distanceKm === null || !routeInfo
              }
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#D96B43] px-6 py-3 font-bold text-white transition hover:bg-[#C85C36] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1E3A2B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue Booking
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
