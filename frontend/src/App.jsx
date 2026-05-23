import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import MonumentDetail from './pages/MonumentDetail';
import Form from './components/Form';
import { Shield } from 'lucide-react';

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/30 to-white flex flex-col">
      <header className={`${isHome ? 'absolute top-0 bg-gradient-to-b from-black/80 to-transparent' : 'relative bg-brand shadow-md'} w-full z-50 py-4 px-10 flex justify-between items-center text-white`}>
        <Link to="/" className={`text-3xl font-extrabold tracking-tighter hover:text-brand-light transition-colors ${isHome ? 'drop-shadow-md text-4xl' : ''}`}>
          SafiOnto
        </Link>
        <nav className={`flex gap-8 items-center font-medium ${isHome ? 'text-lg drop-shadow-md' : 'text-base'}`}>
          <Link to="/" className="hover:text-brand-light transition-colors">Accueil</Link>
          <a href="/#about" className="hover:text-brand-light transition-colors">À propos</a>
          <a href="/#contact" className="hover:text-brand-light transition-colors">Contact</a>
          <Link to="/expert" className={`ml-4 ${isHome ? 'bg-white/20 hover:bg-white/30 border-white/40' : 'bg-brand-dark hover:bg-white hover:text-brand border-transparent'} backdrop-blur-sm border px-5 py-2 rounded-full transition-colors flex items-center gap-2 text-sm uppercase tracking-wider font-bold`}>
            <Shield size={16} /> Expert
          </Link>
        </nav>
      </header>
      
      <main className="flex-grow flex flex-col relative w-full h-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<div className="h-[calc(100vh-80px)]"><MapPage /></div>} />
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
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
