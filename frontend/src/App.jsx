import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapPage from './pages/MapPage';
import MonumentDetail from './pages/MonumentDetail';
import Form from './components/Form';
import { Shield } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-brand-light/30 to-white flex flex-col">
        <header className="bg-brand text-white py-4 shadow-md px-8 flex justify-between items-center z-10 relative">
          <Link to="/" className="text-3xl font-extrabold tracking-tight hover:text-brand-light">SafiOnto</Link>
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-white hover:text-brand-light font-medium transition-colors">Carte Touristique</Link>
            <Link to="/expert" className="text-white hover:text-brand-light font-medium transition-colors flex items-center gap-1">
              <Shield size={16} /> Mode Expert
            </Link>
          </div>
        </header>
        
        <main className="flex-grow flex flex-col relative w-full h-full">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/monument" element={<MonumentDetail />} />
            <Route path="/expert" element={
              <div className="p-8 max-w-2xl mx-auto w-full mt-10">
                <div className="bg-white rounded-xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 text-brand">Ajouter / Mettre à jour un Monument</h2>
                  <Form />
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
