import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import { fetchMonuments } from '../services/api';

const MapPage = () => {
  const [monuments, setMonuments] = useState([]);
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

  return (
    <div className="h-[calc(100vh-76px)] w-full">
      <Map monuments={monuments} onSelectMonument={handleSelectMonument} />
    </div>
  );
};

export default MapPage;
