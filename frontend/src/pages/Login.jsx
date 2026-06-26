import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { Shield } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = await login(username, password);
    if (token) {
      localStorage.setItem('safi_token', token);
      navigate('/expert');
    } else {
      setError('Identifiants incorrects');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md border-t-4 border-t-brand">
        <div className="flex items-center gap-3 justify-center mb-8">
          <Shield className="text-brand" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">Accès Expert</h2>
        </div>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Nom d'utilisateur</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-brand/50" 
              placeholder="admin" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Mot de passe</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-brand/50" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-brand text-white font-bold py-3 mt-2 rounded hover:bg-brand-dark transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
