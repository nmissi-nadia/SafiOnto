import React, { useState } from 'react';
import { MapPin, Info, Clock, Building, Calendar, Edit, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMonumentNarrative } from '../services/api';

const MonumentCard = ({ monument }) => {
  const isAuthenticated = !!localStorage.getItem('safi_token');
  const [narrative, setNarrative] = useState(null);
  const [loadingNarrative, setLoadingNarrative] = useState(false);

  const handleGenerateNarrative = async () => {
    setLoadingNarrative(true);
    const result = await getMonumentNarrative(monument.uri);
    if (result) {
      setNarrative(result);
    } else {
      setNarrative("Désolé, l'IA n'a pas pu générer le récit à partir des données.");
    }
    setLoadingNarrative(false);
  };

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
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center gap-2">
              <Info size={18} /> Histoire & Description
            </h3>
            {!narrative && !loadingNarrative && (
              <button 
                onClick={handleGenerateNarrative}
                className="text-xs bg-brand text-white px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-brand-dark transition-colors shadow-sm"
              >
                <Sparkles size={14} /> Générer un récit avec l'IA
              </button>
            )}
          </div>
          
          {loadingNarrative ? (
            <div className="flex items-center gap-2 text-brand font-medium p-4 justify-center">
              <Loader2 className="animate-spin" size={20} />
              SafiBot rédige l'histoire...
            </div>
          ) : narrative ? (
            <div className="prose prose-sm md:prose-base text-gray-800 leading-relaxed max-w-none">
              <p className="whitespace-pre-line">{narrative}</p>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed text-lg">
              {monument.description || "Aucune description basique disponible."}
            </p>
          )}
        </div>
      </div>
        
      <div className="mt-8 flex gap-2 justify-between items-center bg-gray-100 p-3 rounded-lg overflow-hidden">
        <div className="flex gap-2 items-center text-sm text-gray-500 overflow-hidden">
          <Clock size={16} className="flex-shrink-0" />
          <span className="truncate">URI Sémantique : <a href={monument.uri} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">{monument.uri}</a></span>
        </div>
        {isAuthenticated && (
          <Link to={`/expert?uri=${encodeURIComponent(monument.uri)}`} className="bg-brand text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 hover:bg-brand-dark transition-colors whitespace-nowrap">
            <Edit size={16} /> Modifier
          </Link>
        )}
      </div>
    </div>
  );
};

export default MonumentCard;
