import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../../styles/maps.scss";

function Maps({ latitude, longitude, name, country }) {
  return (
    <div className="maps-container">
      <MapContainer center={[latitude, longitude]} zoom={6}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <h3>
              {name}, {country}
            </h3>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Maps;
