import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const OdishaMap = () => {
  const odishaCenter = [20.2961, 85.8245];

  return (
    <div className="w-full h-[450px] rounded-2xl overflow-hidden">
      <MapContainer
        center={odishaCenter}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={odishaCenter}>
          <Popup>
            <div>
              <h3 className="font-bold">Odisha</h3>
              <p>Explore Odisha and find your destination.</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OdishaMap;
