import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ monuments, onSelectMonument }) => {
  // Center of Safi, Morocco
  const position = [32.2994, -9.2372];

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border-2 border-brand-light">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} eventHandlers={{ click: () => onSelectMonument && onSelectMonument({name: "Safi City Center", description: "Placeholder for Safi Center", uri: "http://example.org/safionto/Safi"}) }}>
          <Popup>
            Safi City Center
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
