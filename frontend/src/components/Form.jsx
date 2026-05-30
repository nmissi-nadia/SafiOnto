import React, { useState } from 'react';
import { createMonument } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Forteresse',
    year: '',
    description: '',
    lat: '',
    lng: ''
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const result = await createMonument({
      ...formData,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng)
    });
    
    if (result) {
      setStatus('success');
      setTimeout(() => navigate('/map'), 2000);
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {status === 'success' && <div className="bg-green-100 text-green-700 p-3 rounded">Lieu ajouté avec succès ! Redirection...</div>}
      {status === 'error' && <div className="bg-red-100 text-red-700 p-3 rounded">Erreur lors de l'ajout. Vérifiez que la base Fuseki est accessible.</div>}
      
      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Nom du lieu (rdfs:label)</label>
        <input name="name" value={formData.name} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Ex: Riad Safi" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Catégorie (Classes SafiOnto V2)</label>
        <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded p-2 bg-white">
          <optgroup label="Patrimoine">
            <option value="Forteresse">Forteresse</option>
            <option value="Mosquée">Mosquée</option>
            <option value="Musée">Musée</option>
            <option value="PorteMédina">Porte de la Médina</option>
            <option value="Remparts">Remparts</option>
            <option value="SiteArtisanal">Site Artisanal</option>
          </optgroup>
          <optgroup label="Hébergement & Restauration">
            <option value="Hôtel">Hôtel</option>
            <option value="Riad">Riad</option>
            <option value="Restaurant">Restaurant</option>
            <option value="CaféRestaurant">Café / Restaurant</option>
            <option value="Snack">Snack</option>
          </optgroup>
          <optgroup label="Institutions & Services">
            <option value="HôpitalPublic">Hôpital Public</option>
            <option value="Pharmacie">Pharmacie</option>
            <option value="Banque">Banque</option>
            <option value="Lycée">Lycée</option>
          </optgroup>
          <optgroup label="Nature & Loisirs">
            <option value="PlageNaturelle">Plage Naturelle</option>
            <option value="SpotSurf">Spot de Surf</option>
            <option value="EspacePublic">Espace Public</option>
          </optgroup>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1 text-gray-700">Latitude (safi:latitude)</label>
          <input name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Ex: 32.298" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1 text-gray-700">Longitude (safi:longitude)</label>
          <input name="lng" type="number" step="any" value={formData.lng} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Ex: -9.243" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Année de construction (safi:annéeConstruction)</label>
        <input name="year" value={formData.year} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Ex: 1950" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Description (dc:description)</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border rounded p-2 h-24" placeholder="Description du lieu..." />
      </div>

      <button type="submit" disabled={status === 'loading'} className="bg-brand text-white font-bold py-3 mt-4 rounded hover:bg-brand-dark transition-colors">
        {status === 'loading' ? 'Injection SPARQL en cours...' : 'Insérer dans l\'Ontologie'}
      </button>
    </form>
  );
};

export default Form;
