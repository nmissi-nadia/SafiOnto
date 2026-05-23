import React, { useState } from 'react';
import { createMonument } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Fort',
    year: '',
    description: '',
    imageUrl: '',
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
      setTimeout(() => navigate('/'), 2000);
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {status === 'success' && <div className="bg-green-100 text-green-700 p-3 rounded">Monument ajouté avec succès ! Redirection...</div>}
      {status === 'error' && <div className="bg-red-100 text-red-700 p-3 rounded">Erreur lors de l'ajout du monument. Vérifiez que la base est accessible.</div>}
      
      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Nom du lieu (placeName)</label>
        <input name="name" value={formData.name} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Ex: Riad Safi" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Catégorie (Basée sur ton arborescence Protégé)</label>
        <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded p-2 bg-white">
          <optgroup label="Historical_Place">
            <option value="Fort">Fort</option>
            <option value="Museum">Musée (Museum)</option>
            <option value="Gate">Porte Historique (Gate)</option>
            <option value="Portuguese_Monument">Monument Portugais</option>
          </optgroup>
          <optgroup label="Cultural_Place">
            <option value="Pottery_Workshop">Atelier de Poterie</option>
          </optgroup>
          <optgroup label="Commercial_Place">
            <option value="Hotel">Hôtel</option>
            <option value="Market">Marché</option>
          </optgroup>
          <optgroup label="Food_Place">
            <option value="Restaurant">Restaurant</option>
            <option value="Traditional_Food">Cuisine Traditionnelle</option>
          </optgroup>
          <optgroup label="Health_Place">
            <option value="Hammam">Hammam</option>
            <option value="Spa">Spa</option>
          </optgroup>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1 text-gray-700">Latitude</label>
          <input name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Ex: 32.298" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1 text-gray-700">Longitude</label>
          <input name="lng" type="number" step="any" value={formData.lng} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Ex: -9.243" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Date de création (creationDate)</label>
        <input name="year" value={formData.year} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Ex: 1950" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">URL de l'image</label>
        <input name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} required className="w-full border rounded p-2" placeholder="https://..." />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border rounded p-2 h-24" placeholder="Description du lieu..." />
      </div>

      <button type="submit" disabled={status === 'loading'} className="bg-brand text-white font-bold py-3 mt-4 rounded hover:bg-brand-dark transition-colors">
        {status === 'loading' ? 'Injection SPARQL en cours...' : 'Insérer dans l\'Ontologie'}
      </button>
    </form>
  );
};

export default Form;
