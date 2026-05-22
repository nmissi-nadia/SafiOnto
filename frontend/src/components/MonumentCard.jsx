import React from 'react';
import { MapPin, Info, Clock } from 'lucide-react';

const MonumentCard = ({ monument }) => {
  if (!monument) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl h-full flex items-center justify-center border border-gray-100">
        <p className="text-gray-500 font-medium">Select a monument on the map to see details</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl h-full border-t-4 border-t-brand flex flex-col transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <MapPin className="text-brand" size={24} />
        {monument.name}
      </h2>
      
      <div className="mt-4 space-y-4 flex-grow">
        <div className="bg-brand-light/30 p-4 rounded-lg border border-brand-light/50">
          <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider mb-1 flex items-center gap-2">
            <Info size={16} /> Description
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {monument.description || "No description available in the ontology."}
          </p>
        </div>
        
        <div className="flex gap-2 items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <Clock size={16} />
          <span>URI: <a href={monument.uri} className="text-blue-500 hover:underline truncate inline-block max-w-[200px] align-bottom" target="_blank" rel="noreferrer">{monument.uri}</a></span>
        </div>
      </div>
    </div>
  );
};

export default MonumentCard;
