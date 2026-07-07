import React, { useState, useEffect } from 'react';
import { createMonument, updateMonument, getMonumentByUri, uploadImage } from '../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Forteresse',
    year: '',
    description: '',
    lat: '',
    lng: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const uriToEdit = searchParams.get('uri');

  useEffect(() => {
    if (uriToEdit) {
      getMonumentByUri(uriToEdit).then(data => {
        if (data) {
          // If we also want to populate lat/lng, we'd need them in the detail response, 
          // or we can just leave them empty for the user to re-enter if they weren't in detail view.
          // Wait, the detail view doesn't return lat/lng currently. Let's check `get_monument_details` in sparql_service.py.
          // Actually, I'll just set what we have and let user fill the rest if missing.
          setFormData({
            name: data.name || '',
            type: data.type || 'Forteresse',
            year: data.year || '',
            description: data.description || '',
            lat: data.lat || '',
            lng: data.lng || ''
          });
        }
      });
    }
  }, [uriToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    let uploadedImageUrl = null;
    if (imageFile) {
        uploadedImageUrl = await uploadImage(imageFile);
        if (!uploadedImageUrl) {
            setStatus('error');
            return;
        }
    }
    
    const payload = {
      ...formData,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng)
    };
    
    if (uploadedImageUrl) {
        payload.imageUrl = uploadedImageUrl;
    }

    let result;
    if (uriToEdit) {
      payload.uri = uriToEdit;
      result = await updateMonument(payload);
    } else {
      result = await createMonument(payload);
    }
    
    if (result) {
      setStatus('success');
      setTimeout(() => navigate('/map'), 1000);
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
        <input name="name" value={formData.name} onChange={handleChange} disabled={!!uriToEdit} required className="w-full border rounded p-2 disabled:bg-gray-200" placeholder="Ex: Riad Safi" />
        {uriToEdit && <p className="text-xs text-gray-500 mt-1">Le nom ne peut pas être modifié car il fait partie de l'URI.</p>}
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

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700">Image du lieu (Optionnel)</label>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border rounded p-2" />
      </div>

      <button type="submit" disabled={status === 'loading'} className="bg-brand text-white font-bold py-3 mt-4 rounded hover:bg-brand-dark transition-colors">
        {status === 'loading' ? 'Injection SPARQL en cours...' : (uriToEdit ? 'Mettre à jour l\'Ontologie' : 'Insérer dans l\'Ontologie')}
      </button>
    </form>
  );
};

export default Form;
