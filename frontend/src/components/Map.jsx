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
        {monuments.map((monument, idx) => {
          if (!monument.coords) return null;
          
          const coordsMatch = monument.coords.match(/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/);
          if (!coordsMatch) return null;
          
          const lng = parseFloat(coordsMatch[1]);
          const lat = parseFloat(coordsMatch[2]);
          
          return (
            <Marker key={idx} position={[lat, lng]} eventHandlers={{ click: () => onSelectMonument && onSelectMonument(monument) }}>
              <Popup>
                <div className="popup-content min-w-[200px]">
                  {monument.imageUrl && <img src={monument.imageUrl} alt={monument.name} className="w-full h-32 object-cover rounded mb-2" />}
                  <h3 className="font-bold text-lg text-brand-dark">{monument.name}</h3>
                  <p className="text-sm"><b>Type :</b> {monument.type}</p>
                  <p className="text-sm"><b>Fondation :</b> {monument.year}</p>
                  <a href={`/monument.html?uri=${encodeURIComponent(monument.uri)}`} className="text-xs text-blue-600 hover:underline mt-2 inline-block">Voir la fiche détaillée</a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
