import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, category, setCategory }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-brand-light flex gap-4 w-11/12 max-w-2xl items-center">
      <div className="flex-grow flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200 focus-within:border-brand-light transition-colors">
        <Search className="text-gray-400 mr-2" size={20} />
        <input 
          type="text" 
          placeholder="Rechercher un monument (ex: Ksar)..." 
          className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 border border-gray-200">
        <Filter className="text-gray-400" size={20} />
        <select 
          className="bg-transparent border-none outline-none text-gray-700 cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          <option value="Forteresse">Forteresse historique</option>
          <option value="Mosquée">Mosquée</option>
          <option value="Hôtel">Hôtel</option>
          <option value="Restaurant">Restaurant</option>
          <option value="SiteArtisanal">Site Artisanal</option>
          <option value="PorteMédina">Porte de la Médina</option>
          <option value="Musée">Musée</option>
          <option value="PlageNaturelle">Plage Naturelle</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
