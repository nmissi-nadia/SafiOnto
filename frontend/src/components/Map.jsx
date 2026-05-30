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
          if (monument.lat == null || monument.lng == null) return null;
          
          return (
            <Marker key={idx} position={[monument.lat, monument.lng]} eventHandlers={{ click: () => onSelectMonument && onSelectMonument(monument) }}>
              <Popup>
                <div className="popup-content min-w-[200px] max-w-[250px]">
                  {monument.imageUrl && <img src={monument.imageUrl} alt={monument.name} className="w-full h-32 object-cover rounded mb-2" />}
                  <h3 className="font-bold text-lg text-brand-dark mb-1">{monument.name}</h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs bg-brand-light text-white px-2 py-1 rounded-full w-fit">{monument.type}</span>
                    <p className="text-sm mt-1"><b>Fondation :</b> {monument.year}</p>
                    {monument.description && (
                      <p className="text-xs text-gray-600 italic mt-1 line-clamp-3">"{monument.description}"</p>
                    )}
                  </div>
                  <a href={`/monument.html?uri=${encodeURIComponent(monument.uri)}`} className="text-xs text-blue-600 hover:underline mt-2 inline-block font-medium">Voir la fiche détaillée &rarr;</a>
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
