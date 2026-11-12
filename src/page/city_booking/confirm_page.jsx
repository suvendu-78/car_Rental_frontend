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
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Headset,
  MapPin,
  Navigation,
  Route,
  Wallet,
  CarFront,
  User,
  Mail,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

const createMarker = (color) =>
  L.divIcon({
    className: "custom-map-marker",
    html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};border:4px solid white;box-shadow:0 3px 12px #0003;display:flex;align-items:center;justify-content:center;color:white;font-size:15px;font-weight:bold;">●</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const pickupMarker = createMarker("#1E3A2B");
const destinationMarker = createMarker("#D96B43");

function FitRoute({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 1) {
      map.setView(points[0], 14);
    } else if (points.length > 1) {
      map.fitBounds(points, { padding: [45, 45] });
    }
  }, [map, points]);

  return null;
}

function Metric({ icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-[#F7F8F6] p-4">
      <div className="shrink-0 text-[#D96B43]">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
        <p className="mt-1 break-words text-lg font-extrabold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function TripPoint({ color, label, value, pincode }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`mt-1.5 h-4 w-4 shrink-0 rounded-full border-[4px] border-white ${color} ring-1 ring-gray-200`}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 break-words font-semibold text-slate-900">{value}</p>
        {pincode && (
          <p className="mt-1 text-xs text-slate-500">Pincode: {pincode}</p>
        )}
      </div>
      <MapPin size={18} className="shrink-0 text-slate-400" />
    </div>
  );
}

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.bookingData ?? location.state ?? {};
  const user = booking.user ?? {};
  const route = booking.route ?? {};
  const selectedVehicle = booking.vehicle ?? booking.selectedVehicle ?? {};
  const fareDetails =
    typeof booking.fare === "object" && booking.fare !== null
      ? booking.fare
      : {};

  const pickup = route.pickup ?? booking.pickup ?? "Pickup location";
  const drop = route.drop ?? booking.drop ?? "Destination";

  const vehicleName =
    selectedVehicle.name ??
    selectedVehicle.title ??
    selectedVehicle.type ??
    "Selected vehicle";

  const passengers =
    selectedVehicle.passengers ?? selectedVehicle.capacity ?? 3;

  const distanceKm = route.distanceKm ?? booking.distanceKm ?? null;
  const durationMinutes =
    route.durationMinutes ?? booking.durationMinutes ?? null;
  const duration = route.duration ?? booking.duration ?? null;

  const fare =
    fareDetails.estimatedFare ??
    booking.estimatedFare ??
    (typeof booking.fare === "number" ? booking.fare : null) ??
    selectedVehicle.fare ??
    selectedVehicle.price ??
    null;

  const pricePerKm = fareDetails.pricePerKm ?? null;
  const bookingId = booking.bookingId ?? booking.id ?? null;
  const bookingStatus = booking.booking?.status ?? booking.status ?? "pending";
  const bookingDate =
    booking.booking?.bookingDate ?? booking.bookingDate ?? null;

  const pickupPincode = route.pickupPincode ?? "";
  const dropPincode = route.dropPincode ?? "";

  const toPoint = (coordinates) => {
    if (!coordinates) return null;

    const lat = Number(coordinates.lat);
    const lng = Number(coordinates.lng);

    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      Math.abs(lat) <= 90 &&
      Math.abs(lng) <= 180
    ) {
      return [lat, lng];
    }

    return null;
  };

  const pickupCoords = toPoint(route.pickupCoords);
  const dropCoords = toPoint(route.dropCoords);

  const [roadRoute, setRoadRoute] = useState([]);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(false);

  useEffect(() => {
    if (!pickupCoords || !dropCoords) {
      setRoadRoute([]);
      setRouteLoading(false);
      setRouteError(true);
      return;
    }

    const controller = new AbortController();

    const fetchRoadRoute = async () => {
      setRouteLoading(true);
      setRouteError(false);
      setRoadRoute([]);

      try {
        const url =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${pickupCoords[1]},${pickupCoords[0]};` +
          `${dropCoords[1]},${dropCoords[0]}` +
          `?overview=full&geometries=geojson`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not retrieve the road route");
        }

        const data = await response.json();
        const coordinates = data.routes?.[0]?.geometry?.coordinates;

        if (!coordinates?.length) {
          throw new Error("No road route was found");
        }

        setRoadRoute(coordinates.map(([lng, lat]) => [lat, lng]));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Road route error:", error);
          setRouteError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setRouteLoading(false);
        }
      }
    };

    fetchRoadRoute();

    return () => controller.abort();
  }, [
    route.pickupCoords?.lat,
    route.pickupCoords?.lng,
    route.dropCoords?.lat,
    route.dropCoords?.lng,
  ]);

  const formatFare = (value) => {
    if (value === null || value === undefined || value === "") {
      return "Not available";
    }

    const numericFare = Number(value);

    return Number.isFinite(numericFare)
      ? `₹${numericFare.toLocaleString("en-IN")}`
      : String(value);
  };

  const handleTrackRide = () => {
    navigate("/track-ride", {
      state: {
        bookingData: booking,
        user,
        pickup,
        drop,
        pickupCoords,
        dropCoords,
        distanceKm,
        duration,
        durationMinutes,
        vehicle: selectedVehicle,
        fare: fareDetails,
        bookingId,
      },
    });
  };

  const mapPoints = roadRoute.length
    ? roadRoute
    : [pickupCoords, dropCoords].filter(Boolean);

  const mapCenter = pickupCoords ?? dropCoords ?? [20.8409, 85.1016];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative z-0 h-[280px] w-full overflow-hidden sm:h-[350px] lg:h-[400px]">
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom={false}
          className="h-full w-full"
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="bottomright" />

          {pickupCoords && (
            <Marker position={pickupCoords} icon={pickupMarker} />
          )}

          {dropCoords && (
            <Marker position={dropCoords} icon={destinationMarker} />
          )}

          {roadRoute.length > 0 && (
            <Polyline
              positions={roadRoute}
              pathOptions={{
                color: "#1E3A2B",
                weight: 6,
                opacity: 0.95,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          )}

          <FitRoute points={mapPoints} />
        </MapContainer>

        <div className="pointer-events-none absolute left-4 top-4 z-[500] rounded-full border border-gray-100 bg-white/95 px-4 py-2 shadow-md backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1E3A2B]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {routeLoading
              ? "LOADING ROAD ROUTE"
              : routeError
                ? "TRIP MAP"
                : "YOUR ROUTE"}
          </div>
        </div>

        {routeError && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-[500] w-[90%] max-w-sm -translate-x-1/2 rounded-xl bg-white/95 px-4 py-3 text-center shadow-lg backdrop-blur">
            <p className="text-xs text-slate-600">
              The road route is unavailable. Pickup and destination markers are
              shown where coordinates are available.
            </p>
          </div>
        )}
      </section>

      <main className="relative z-10 mx-auto -mt-5 max-w-5xl rounded-t-[28px] border border-gray-100 bg-white px-4 pb-8 pt-6 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] sm:px-7 sm:pt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
              <Check size={32} strokeWidth={3} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#1E3A2B] sm:text-2xl">
                {bookingStatus === "pending"
                  ? "Booking Request Received"
                  : "Booking Confirmed"}
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                {bookingStatus === "pending"
                  ? "Your booking request is awaiting confirmation."
                  : "Your ride has been successfully confirmed."}
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-2.5 text-sm font-semibold capitalize text-amber-800">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            {bookingStatus}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Metric
            icon={<Route size={25} />}
            label="Distance"
            value={distanceKm !== null ? `${distanceKm} km` : "Not available"}
          />

          <Metric
            icon={<Clock3 size={25} />}
            label="Estimated time"
            value={
              duration ??
              (durationMinutes !== null
                ? `${durationMinutes} min`
                : "Not available")
            }
          />

          <Metric
            icon={<Wallet size={25} />}
            label="Estimated fare"
            value={formatFare(fare)}
          />
        </div>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-[76px] w-[90px] shrink-0 items-center justify-center rounded-xl bg-[#F3F5F1] text-[#1E3A2B]">
              <CarFront size={49} strokeWidth={1.5} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-slate-900">
                {vehicleName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {passengers} passengers · Your selected ride
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={16} />
                Estimated arrival: {selectedVehicle.eta ?? "Awaiting driver"}
              </div>

              {pricePerKm !== null && (
                <p className="mt-1 text-sm text-slate-500">
                  {formatFare(pricePerKm)} per km
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-2xl border border-gray-200 p-4 sm:p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Trip details
          </h2>

          <TripPoint
            color="bg-[#1E3A2B]"
            label="Pickup location"
            value={pickup}
            pincode={pickupPincode}
          />

          <div className="ml-[7px] h-7 border-l-2 border-dashed border-gray-300" />

          <TripPoint
            color="bg-[#D96B43]"
            label="Destination"
            value={drop}
            pincode={dropPincode}
          />
        </section>

        <section className="mt-3 rounded-2xl border border-gray-200 p-4 sm:p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Customer details
          </h2>

          <div className="flex items-start gap-3">
            <User size={19} className="mt-0.5 text-[#D96B43]" />
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="mt-1 font-semibold">
                {user.name || "Not provided"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Mail size={19} className="mt-0.5 text-[#D96B43]" />
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-1 break-all font-semibold">
                {user.email || "Not provided"}
              </p>
            </div>
          </div>

          {user.mobile && (
            <div className="mt-4">
              <p className="text-sm text-slate-500">Mobile</p>
              <p className="mt-1 font-semibold">{user.mobile}</p>
            </div>
          )}
        </section>

        <section className="mt-3 flex items-start gap-3 rounded-2xl bg-[#F0F6F0] p-4 sm:p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1E3A2B]">
            <Wallet size={24} />
          </div>

          <div>
            <h2 className="font-bold text-[#1E3A2B]">Pay at destination</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              No payment is required now. Pay your fare after reaching your
              destination.
            </p>
          </div>
        </section>

        <div className="mt-5 grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={handleTrackRide}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#D96B43] px-5 py-4 font-bold text-white shadow-sm transition hover:bg-[#C75B35] active:scale-[0.99]"
          >
            <Navigation size={22} />
            Track My Ride
            <ArrowRight size={21} />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/payment", {
                state: {
                  bookingData: booking,
                },
              })
            }
            className="flex w-full items-center justify-center rounded-xl border border-[#1E3A2B] bg-white px-5 py-3.5 font-semibold text-[#1E3A2B] transition hover:bg-[#F5F8F5]"
          >
            Pay Thouugh app
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          {bookingId ? `Booking ID: ${bookingId}` : "Your ride details"}
          {" · "}
          {bookingDate
            ? new Date(bookingDate).toLocaleString()
            : "Booking date unavailable"}
        </p>
      </main>
    </div>
  );
};

export default BookingSuccess;
