import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getMonumentByUri } from '../services/api';
import MonumentCard from '../components/MonumentCard';

const MonumentDetail = () => {
  const [searchParams] = useSearchParams();
  const uri = searchParams.get('uri');
  const navigate = useNavigate();
  const [monument, setMonument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMonument = async () => {
      if (uri) {
        const data = await getMonumentByUri(uri);
        setMonument(data);
      }
      setLoading(false);
    };
    loadMonument();
  }, [uri]);

  return (
    <div className="max-w-4xl mx-auto w-full p-6">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-brand font-bold hover:text-brand-dark transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-brand-light/30">
        ← Retour à la carte
      </button>
      
      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium text-lg animate-pulse">Chargement de l'ontologie...</div>
      ) : monument ? (
        <MonumentCard monument={monument} />
      ) : (
        <div className="text-center py-20 text-red-500 font-bold bg-white rounded-xl shadow-md">Entité Urbaine introuvable dans le graphe de connaissances.</div>
      )}
    </div>
  );
};

export default MonumentDetail;
