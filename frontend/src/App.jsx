import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import MonumentCard from './components/MonumentCard';
import Form from './components/Form';
import { fetchMonuments } from './services/api';

function App() {
  const [monuments, setMonuments] = useState([]);
  const [selectedMonument, setSelectedMonument] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMonuments();
      setMonuments(data);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/30 to-white flex flex-col">
      <header className="bg-brand text-white py-4 shadow-md px-8 flex justify-between items-center z-10 relative">
        <h1 className="text-3xl font-extrabold tracking-tight">SafiOnto</h1>
        <p className="text-brand-light font-medium">Cultural Heritage Portal</p>
      </header>
      
      <main className="flex-grow p-6 flex flex-col md:flex-row gap-6 max-w-[1600px] w-full mx-auto">
        <div className="md:w-2/3 h-[500px] md:h-auto min-h-[600px]">
          <Map monuments={monuments} onSelectMonument={setSelectedMonument} />
        </div>
        
        <div className="md:w-1/3 flex flex-col gap-6">
          <div className="flex-1">
            <MonumentCard monument={selectedMonument} />
          </div>
          <div>
            <Form />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
