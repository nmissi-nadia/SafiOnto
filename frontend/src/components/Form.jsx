import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting to SPARQL:", formData);
    // Future integration: POST to FastAPI
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <PlusCircle className="text-brand" /> Contribute
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monument Name</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g. Ksar El Bahar"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all resize-none h-24"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Historical significance..."
          />
        </div>
        <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-lg transition-colors shadow-md">
          Add to Knowledge Graph
        </button>
      </form>
    </div>
  );
};

export default Form;
