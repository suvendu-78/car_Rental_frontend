export const searchLocations = async (query) => {
  if (!query || query.trim().length < 3) {
    return [];
  }

  const url = new URL("https://photon.komoot.io/api/");

  url.searchParams.set("q", `${query}, Odisha, India`);
  url.searchParams.set("limit", "5");
  url.searchParams.set("lang", "en");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to search locations");
  }

  const data = await response.json();

  return data.features.map((feature) => {
    const properties = feature.properties;
    const [longitude, latitude] = feature.geometry.coordinates;

    return {
      name: [
        properties.name,
        properties.district,
        properties.state,
        properties.country,
      ]
        .filter(Boolean)
        .filter((value, index, array) => array.indexOf(value) === index)
        .join(", "),
      latitude,
      longitude,
      pincode: properties.postcode || "",
    };
  });
};

export const getPincode = async (latitude, longitude) => {
  const url = new URL("https://photon.komoot.io/reverse");

  url.searchParams.set("lat", latitude);
  url.searchParams.set("lon", longitude);
  url.searchParams.set("lang", "en");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to retrieve pincode");
  }

  const data = await response.json();
  const properties = data.features?.[0]?.properties;

  return properties?.postcode || "";
};
