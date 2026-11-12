import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Navigation,
  ArrowDownUp,
  Search,
  LoaderCircle,
  ShieldCheck,
  Clock3,
  X,
} from "lucide-react";
import { searchLocations, getPincode } from "../../map/locationService.js";

const API_BASE_URL = "http://localhost:8000/api/v1";
const CHECK_LOGIN_URL = `${API_BASE_URL}/users/cheakuser`;
const CITY_BOOK_URL = `${API_BASE_URL}/users/cityBook`;

const CityRide = () => {
  const navigate = useNavigate();

  const [rideData, setRideData] = useState({
    pickup: "",
    drop: "",
  });

  const [selectedLocations, setSelectedLocations] = useState({
    pickup: null,
    drop: null,
  });

  const [suggestions, setSuggestions] = useState({
    pickup: [],
    drop: [],
  });

  const [activeField, setActiveField] = useState("");
  const [searching, setSearching] = useState({
    pickup: false,
    drop: false,
  });

  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingRide, setLoadingRide] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const checkLoginOnPageLoad = async () => {
      try {
        const response = await fetch(CHECK_LOGIN_URL, {
          method: "POST",
          credentials: "include",
        });

        const data = await response.json();
        const loggedIn = response.ok && data.success === true;

        if (isMounted) {
          setIsLoggedIn(loggedIn);
          setEmail(loggedIn ? data.email || "" : "");
        }
      } catch (err) {
        console.error("Login check failed:", err);

        if (isMounted) {
          setIsLoggedIn(false);
          setEmail("");
        }
      } finally {
        if (isMounted) {
          setLoginChecked(true);
        }
      }
    };

    checkLoginOnPageLoad();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      const fields = ["pickup", "drop"];

      for (const field of fields) {
        const query = rideData[field].trim();
        const selected = selectedLocations[field];

        if (
          field === activeField &&
          query.length >= 3 &&
          (!selected || selected.name !== query)
        ) {
          setSearching((prev) => ({
            ...prev,
            [field]: true,
          }));

          try {
            const results = await searchLocations(query);

            if (!cancelled) {
              setSuggestions((prev) => ({
                ...prev,
                [field]: results,
              }));
            }
          } catch (err) {
            console.error("Location search failed:", err);

            if (!cancelled) {
              setSuggestions((prev) => ({
                ...prev,
                [field]: [],
              }));
            }
          } finally {
            if (!cancelled) {
              setSearching((prev) => ({
                ...prev,
                [field]: false,
              }));
            }
          }
        } else if (!cancelled) {
          setSuggestions((prev) => ({
            ...prev,
            [field]: [],
          }));
        }
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    rideData.pickup,
    rideData.drop,
    selectedLocations.pickup,
    selectedLocations.drop,
    activeField,
  ]);

  const checkLogin = async () => {
    try {
      const response = await fetch(CHECK_LOGIN_URL, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      const loggedIn = response.ok && data.success === true;

      setIsLoggedIn(loggedIn);
      setEmail(loggedIn ? data.email || "" : "");

      if (!loggedIn) {
        setError("Please login first to book a ride.");
      }

      return loggedIn;
    } catch (err) {
      console.error("Login verification failed:", err);

      setIsLoggedIn(false);
      setEmail("");
      setError("Unable to verify login. Please try again.");

      return false;
    }
  };

  const handleRideChange = (event) => {
    const { name, value } = event.target;

    setRideData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSelectedLocations((prev) => ({
      ...prev,
      [name]: null,
    }));

    setSuggestions((prev) => ({
      ...prev,
      [name]: [],
    }));

    setActiveField(name);
    setError("");
  };

  const selectLocation = (field, location) => {
    setRideData((prev) => ({
      ...prev,
      [field]: location.name,
    }));

    setSelectedLocations((prev) => ({
      ...prev,
      [field]: location,
    }));

    setSuggestions((prev) => ({
      ...prev,
      [field]: [],
    }));

    setActiveField("");
    setError("");
  };

  const useCurrentLocation = async () => {
    setError("");

    if (!loginChecked) {
      setError("Checking login status. Please try again.");
      return;
    }

    const loggedIn = await checkLogin();

    if (!loggedIn) return;

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );

          if (!response.ok) {
            throw new Error("Could not find your current address.");
          }

          const data = await response.json();
          const address =
            data.display_name ||
            `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

          let pincode = data.address?.postcode || "";

          if (!pincode) {
            try {
              pincode = await getPincode(latitude, longitude);
            } catch (err) {
              console.error("Pincode lookup failed:", err);
            }
          }

          const location = {
            name: address,
            latitude,
            longitude,
            pincode: pincode || "",
          };

          setRideData((prev) => ({
            ...prev,
            pickup: address,
          }));

          setSelectedLocations((prev) => ({
            ...prev,
            pickup: location,
          }));

          setSuggestions((prev) => ({
            ...prev,
            pickup: [],
          }));

          setActiveField("");
        } catch (err) {
          console.error("Location lookup failed:", err);
          setError(
            "Could not find your address. Please enter pickup manually.",
          );
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        if (err.code === 1) {
          setError("Location permission denied. Enter pickup manually.");
        } else if (err.code === 2) {
          setError("Your current location is unavailable.");
        } else if (err.code === 3) {
          setError("Location request timed out. Please try again.");
        } else {
          setError("Unable to get your current location.");
        }

        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const swapLocations = () => {
    setRideData((prev) => ({
      pickup: prev.drop,
      drop: prev.pickup,
    }));

    setSelectedLocations((prev) => ({
      pickup: prev.drop,
      drop: prev.pickup,
    }));

    setSuggestions({
      pickup: [],
      drop: [],
    });

    setActiveField("");
    setError("");
  };

  const findRide = async (event) => {
    event.preventDefault();
    setError("");

    if (!loginChecked) {
      setError("Checking login status. Please try again.");
      return;
    }

    const loggedIn = await checkLogin();

    if (!loggedIn) return;

    const pickup = rideData.pickup.trim();
    const drop = rideData.drop.trim();

    if (!pickup || !drop) {
      setError("Please enter both pickup and destination.");
      return;
    }

    if (pickup.toLowerCase() === drop.toLowerCase()) {
      setError("Pickup and destination cannot be the same.");
      return;
    }

    if (!selectedLocations.pickup || !selectedLocations.drop) {
      setError(
        "Please select both pickup and destination from the location suggestions.",
      );
      return;
    }

    setLoadingRide(true);

    try {
      const pickupLocation = selectedLocations.pickup;
      const dropLocation = selectedLocations.drop;

      const response = await fetch(CITY_BOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          pickup,
          drop,
          pickupPincode: pickupLocation.pincode || "",
          dropPincode: dropLocation.pincode || "",
          pickupCoordinates: {
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
          },
          dropCoordinates: {
            latitude: dropLocation.latitude,
            longitude: dropLocation.longitude,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        setError(result.message || "Unable to save ride details.");
        return;
      }

      const bookingData = result.data;

      if (!bookingData) {
        setError("Booking data was not returned by the server.");
        return;
      }

      navigate("/rideOptions", {
        state: {
          ...bookingData,
          pickup,
          drop,
          pickupLocation,
          dropLocation,
          bookingData,
        },
      });
    } catch (err) {
      console.error("Find ride error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoadingRide(false);
    }
  };

  const renderSuggestions = (field) => {
    const items = suggestions[field];

    if (activeField !== field || !rideData[field].trim()) {
      return null;
    }

    if (rideData[field].trim().length < 3) {
      return null;
    }

    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
        {searching[field] ? (
          <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500">
            <LoaderCircle size={16} className="animate-spin" />
            Searching locations...
          </div>
        ) : items.length > 0 ? (
          items.map((location, index) => (
            <button
              key={`${location.latitude}-${location.longitude}-${index}`}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectLocation(field, location)}
              className="flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left last:border-0 hover:bg-[#F7F9F5]"
            >
              <MapPin size={18} className="mt-1 shrink-0 text-[#D96B43]" />

              <span className="min-w-0">
                <span className="block text-sm font-medium text-[#1E3A2B]">
                  {location.name}
                </span>

                <span className="mt-1 block text-xs text-gray-500">
                  {location.pincode
                    ? `Pincode: ${location.pincode}`
                    : "Pincode may not be available"}
                </span>
              </span>
            </button>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500">
            No locations found. Try a more specific place name.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#1E3A2B]">
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:px-10 lg:grid-cols-2 lg:items-center lg:py-14">
        <section className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E7EDE5] px-4 py-2 text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#D96B43]" />
            Your city, your ride
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight md:text-6xl">
            Every journey
            <br />
            starts <span className="text-[#D96B43]">here.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 md:text-lg">
            Enter your pickup and destination to get your ride started. Simple
            booking, a smooth experience, and less waiting.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E7E3D9] bg-white p-4">
              <Navigation size={22} className="text-[#D96B43]" />
              <p className="mt-3 font-semibold">Easy pickup</p>
              <p className="mt-1 text-sm text-gray-500">Choose your location</p>
            </div>

            <div className="rounded-2xl border border-[#E7E3D9] bg-white p-4">
              <Clock3 size={22} className="text-[#D96B43]" />
              <p className="mt-3 font-semibold">Quick booking</p>
              <p className="mt-1 text-sm text-gray-500">Just a few steps</p>
            </div>

            <div className="rounded-2xl border border-[#E7E3D9] bg-white p-4">
              <ShieldCheck size={22} className="text-[#D96B43]" />
              <p className="mt-3 font-semibold">Secure access</p>
              <p className="mt-1 text-sm text-gray-500">
                Login-protected requests
              </p>
            </div>
          </div>
        </section>

        <section className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl border border-[#E7E3D9] bg-white shadow-xl shadow-[#1E3A2B]/10">
            <div className="relative h-48 overflow-hidden bg-[#E8E9DC] md:h-56">
              <div className="absolute inset-0 opacity-70">
                <div className="absolute left-[12%] top-[-20%] h-[150%] w-5 rotate-[28deg] bg-white" />
                <div className="absolute left-[38%] top-[-15%] h-[140%] w-7 rotate-[-18deg] bg-white" />
                <div className="absolute left-[70%] top-[-20%] h-[150%] w-5 rotate-[35deg] bg-white" />
                <div className="absolute left-[-10%] top-[30%] h-5 w-[120%] rotate-[-10deg] bg-white" />
                <div className="absolute left-[-10%] top-[68%] h-7 w-[120%] rotate-[8deg] bg-white" />
                <div className="absolute left-[5%] top-[8%] h-10 w-20 rounded-xl bg-[#D5DFC9]" />
                <div className="absolute right-[8%] top-[15%] h-14 w-24 rounded-xl bg-[#D5DFC9]" />
                <div className="absolute bottom-[5%] left-[42%] h-12 w-20 rounded-xl bg-[#D5DFC9]" />
              </div>

              <svg
                viewBox="0 0 400 220"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <path
                  d="M 70 160 C 115 160, 120 65, 195 95 S 275 155, 330 55"
                  fill="none"
                  stroke="#D96B43"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="7 7"
                />
              </svg>

              <div className="absolute left-[14%] top-[62%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#1E3A2B] text-white shadow-lg">
                <MapPin size={19} />
              </div>

              <div className="absolute right-[13%] top-[18%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#D96B43] text-white shadow-lg">
                <Navigation size={18} />
              </div>

              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-600" />
                Ready for your next ride
              </div>
            </div>

            <div className="p-5 md:p-8">
              <h2 className="text-2xl font-bold">Where to?</h2>

              <p className="mt-1 text-sm text-gray-500">
                Type at least 3 characters and select a suggested location.
              </p>

              {!loginChecked ? (
                <p className="mt-3 text-sm text-gray-500">Checking login...</p>
              ) : isLoggedIn && email ? (
                <div className="mt-4 rounded-xl border border-[#E7EDE5] bg-[#F7F9F5] px-4 py-3">
                  <p className="text-xs font-medium text-gray-500">
                    Logged in as
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold">
                    {email}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">
                  Please log in to book a ride.
                </p>
              )}

              <form onSubmit={findRide} className="mt-7">
                <div className="relative">
                  <div className="absolute left-[19px] top-11 h-[72px] border-l-2 border-dashed border-gray-300" />

                  <div className="flex items-start gap-3">
                    <div className="relative z-10 mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7EDE5] text-[#1E3A2B]">
                      <MapPin size={21} />
                    </div>

                    <div className="relative min-w-0 flex-1">
                      <label
                        htmlFor="pickup"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Pickup location
                      </label>

                      <div className="relative">
                        <input
                          id="pickup"
                          name="pickup"
                          type="text"
                          value={rideData.pickup}
                          onChange={handleRideChange}
                          onFocus={() => setActiveField("pickup")}
                          onBlur={() => {
                            setTimeout(() => {
                              setActiveField((current) =>
                                current === "pickup" ? "" : current,
                              );
                            }, 150);
                          }}
                          placeholder="Enter pickup address"
                          autoComplete="off"
                          className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 pr-10 text-sm outline-none transition focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10"
                        />

                        {rideData.pickup && (
                          <button
                            type="button"
                            onClick={() => {
                              setRideData((prev) => ({
                                ...prev,
                                pickup: "",
                              }));
                              setSelectedLocations((prev) => ({
                                ...prev,
                                pickup: null,
                              }));
                              setSuggestions((prev) => ({
                                ...prev,
                                pickup: [],
                              }));
                              setActiveField("pickup");
                            }}
                            aria-label="Clear pickup"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      {selectedLocations.pickup && (
                        <p className="mt-1 text-xs text-gray-500">
                          Pincode:{" "}
                          {selectedLocations.pickup.pincode || "Unavailable"}
                        </p>
                      )}

                      {renderSuggestions("pickup")}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={swapLocations}
                    disabled={!rideData.pickup && !rideData.drop}
                    aria-label="Swap pickup and destination"
                    className="absolute right-3 top-[77px] z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1E3A2B] shadow-sm transition hover:bg-[#E7EDE5] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowDownUp size={17} />
                  </button>

                  <div className="mt-5 flex items-start gap-3">
                    <div className="relative z-10 mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9E8E1] text-[#D96B43]">
                      <Navigation size={21} />
                    </div>

                    <div className="relative min-w-0 flex-1">
                      <label
                        htmlFor="drop"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Destination
                      </label>

                      <div className="relative">
                        <input
                          id="drop"
                          name="drop"
                          type="text"
                          value={rideData.drop}
                          onChange={handleRideChange}
                          onFocus={() => setActiveField("drop")}
                          onBlur={() => {
                            setTimeout(() => {
                              setActiveField((current) =>
                                current === "drop" ? "" : current,
                              );
                            }, 150);
                          }}
                          placeholder="Where do you want to go?"
                          autoComplete="off"
                          className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 pr-10 text-sm outline-none transition focus:border-[#D96B43] focus:ring-2 focus:ring-[#D96B43]/10"
                        />

                        {rideData.drop && (
                          <button
                            type="button"
                            onClick={() => {
                              setRideData((prev) => ({
                                ...prev,
                                drop: "",
                              }));
                              setSelectedLocations((prev) => ({
                                ...prev,
                                drop: null,
                              }));
                              setSuggestions((prev) => ({
                                ...prev,
                                drop: [],
                              }));
                              setActiveField("drop");
                            }}
                            aria-label="Clear destination"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      {selectedLocations.drop && (
                        <p className="mt-1 text-xs text-gray-500">
                          Pincode:{" "}
                          {selectedLocations.drop.pincode || "Unavailable"}
                        </p>
                      )}

                      {renderSuggestions("drop")}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={useCurrentLocation}
                  disabled={!loginChecked || loadingLocation || loadingRide}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A2B] transition hover:text-[#D96B43] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingLocation ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    <Navigation size={17} />
                  )}

                  {loadingLocation
                    ? "Getting your location..."
                    : "Use my current location"}
                </button>

                {error && (
                  <div
                    role="alert"
                    className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!loginChecked || loadingRide || loadingLocation}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E3A2B] px-5 py-4 font-bold text-white transition hover:bg-[#294C39] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingRide ? (
                    <>
                      <LoaderCircle size={20} className="animate-spin" />
                      Saving ride details...
                    </>
                  ) : !loginChecked ? (
                    "Checking login..."
                  ) : (
                    <>
                      <Search size={20} />
                      Find a Ride
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                  You must be logged in to create a ride request.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CityRide;
