import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import { fetchMonuments } from '../services/api';

const MapPage = () => {
  const [monuments, setMonuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMonuments();
      setMonuments(data);
    };
    loadData();
  }, []);

  const handleSelectMonument = (monument) => {
    navigate(`/monument?uri=${encodeURIComponent(monument.uri)}`);
  };

  // Local Frontend Filtering
  const filteredMonuments = monuments.filter(monument => {
    const matchCategory = category === 'all' || monument.type === category;
    const safeName = monument.name || '';
    const safeQuery = searchQuery || '';
    const matchSearch = safeName.toLowerCase().includes(safeQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="h-[calc(100vh-76px)] w-full relative">
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        category={category} 
        setCategory={setCategory} 
      />
      <Map monuments={filteredMonuments} onSelectMonument={handleSelectMonument} />
    </div>
  );
};

export default MapPage;
