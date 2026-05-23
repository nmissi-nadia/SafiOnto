import React from 'react';
import { MapPin, Info, Clock, Building, Calendar } from 'lucide-react';

const MonumentCard = ({ monument }) => {
  if (!monument) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-xl border-t-4 border-t-brand flex flex-col transition-all duration-300">
      {monument.imageUrl && (
        <img src={monument.imageUrl} alt={monument.name} className="w-full h-64 object-cover rounded-lg mb-6 shadow-md" />
      )}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2 flex items-center gap-2">
        <MapPin className="text-brand" size={28} />
        {monument.name}
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex gap-3 items-center text-gray-700 bg-gray-50 p-4 rounded-lg">
          <Building className="text-brand" size={20} />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Type</p>
            <p className="font-medium">{monument.type}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center text-gray-700 bg-gray-50 p-4 rounded-lg">
          <Calendar className="text-brand" size={20} />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Fondation</p>
            <p className="font-medium">{monument.year}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-brand-light/20 p-6 rounded-lg border border-brand-light/40">
          <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider mb-3 flex items-center gap-2">
            <Info size={18} /> Histoire & Description
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            {monument.description}
          </p>
        </div>
      </div>
        
      <div className="mt-8 flex gap-2 items-center text-sm text-gray-500 bg-gray-100 p-3 rounded-lg overflow-hidden">
        <Clock size={16} className="flex-shrink-0" />
        <span className="truncate">URI Sémantique : <a href={monument.uri} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">{monument.uri}</a></span>
      </div>
    </div>
  );
};

export default MonumentCard;
