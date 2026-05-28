import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Search, List, Shield, Database, Landmark, Navigation } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img 
            src="/hero-bg.png" 
            alt="Paysage de Safi au crépuscule" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-tight">
            Découvrez le Patrimoine de Safi
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-light max-w-3xl mx-auto">
            Une exploration intelligente de l'histoire, de l'artisanat et de l'architecture de la capitale de la céramique.
          </p>
          
          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/map" className="group flex items-center justify-center gap-3 bg-brand hover:bg-brand-light text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <Map className="group-hover:animate-bounce" size={24} /> Carte Interactive
            </Link>
            <Link to="/map" className="group flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-brand-dark px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <Search className="group-hover:rotate-90 transition-transform" size={24} /> Recherche Avancée
            </Link>
            <Link to="/map" className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <List size={24} /> Liste des Monuments
            </Link>
            <Link to="/expert" className="group flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <Shield className="group-hover:animate-pulse" size={24} /> Espace Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Pourquoi explorer avec SafiOnto ?</h2>
          <div className="w-24 h-1.5 bg-brand mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow border border-gray-50 flex flex-col items-center text-center group">
            <div className="bg-blue-50 p-5 rounded-2xl mb-8 group-hover:bg-brand group-hover:scale-110 transition-all duration-300">
              <Database className="text-brand group-hover:text-white transition-colors" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Données Sémantiques</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Relié au Web des données, notre portail utilise des ontologies (OWL) complexes pour lier intelligemment les monuments entre eux.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow border border-gray-50 flex flex-col items-center text-center group">
            <div className="bg-amber-50 p-5 rounded-2xl mb-8 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
              <Landmark className="text-amber-600 group-hover:text-white transition-colors" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Héritage Architectural</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Découvrez la richesse de l'architecture portugaise et islamique à travers des fiches historiques détaillées et richement illustrées.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow border border-gray-50 flex flex-col items-center text-center group">
            <div className="bg-emerald-50 p-5 rounded-2xl mb-8 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300">
              <Navigation className="text-emerald-600 group-hover:text-white transition-colors" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tourisme Intelligent</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Profitez d'une carte interactive Leaflet pour explorer la ville selon vos centres d'intérêts grâce au filtrage dynamique.
            </p>
          </div>
        </div>
      </section>

      {/* Famous Places Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 my-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Les lieux les plus célèbres de Safi</h2>
          <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez une sélection des monuments incontournables qui forgent l'identité historique et culturelle de la ville.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Place 1 */}
          <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="h-64 overflow-hidden relative">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ksar_el-Bahr.jpg/640px-Ksar_el-Bahr.jpg" alt="Ksar El Bahar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">Forteresse</div>
            </div>
            <div className="p-6 bg-white relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ksar El Bahar</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Le Château de la Mer, joyau de l'architecture portugaise du XVIe siècle surplombant majestueusement l'océan Atlantique.
              </p>
              <Link to="/map" className="text-brand font-bold hover:text-brand-dark flex items-center gap-1 group-hover:gap-2 transition-all">
                Explorer <span className="text-xl">→</span>
              </Link>
            </div>
          </div>

          {/* Place 2 */}
          <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="h-64 overflow-hidden relative">
              <img src="https://www.moroccopedia.com/wp-content/uploads/2012/12/Safi-Pottery.jpg" alt="Colline des Potiers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">Artisanat</div>
            </div>
            <div className="p-6 bg-white relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">La Colline des Potiers</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Le cœur battant de l'artisanat safiot, où les maîtres potiers perpétuent un savoir-faire ancestral reconnu mondialement.
              </p>
              <Link to="/map" className="text-emerald-600 font-bold hover:text-emerald-800 flex items-center gap-1 group-hover:gap-2 transition-all">
                Explorer <span className="text-xl">→</span>
              </Link>
            </div>
          </div>

          {/* Place 3 */}
          <div className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="h-64 overflow-hidden relative">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Safi_Medina.jpg/640px-Safi_Medina.jpg" alt="La Médina de Safi" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">Centre Historique</div>
            </div>
            <div className="p-6 bg-white relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">L'Ancienne Médina</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Un dédale de ruelles chargées d'histoire, abritant des souks colorés, des remparts séculaires et une ambiance authentique.
              </p>
              <Link to="/map" className="text-amber-600 font-bold hover:text-amber-800 flex items-center gap-1 group-hover:gap-2 transition-all">
                Explorer <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand text-white py-20 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-extrabold mb-2">150+</div>
            <div className="text-brand-light text-lg font-medium uppercase tracking-wider">Monuments</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">14</div>
            <div className="text-brand-light text-lg font-medium uppercase tracking-wider">Catégories Protégé</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">5000+</div>
            <div className="text-brand-light text-lg font-medium uppercase tracking-wider">Triplets RDF</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">100%</div>
            <div className="text-brand-light text-lg font-medium uppercase tracking-wider">Open Data</div>
          </div>
        </div>
      </section>

      {/* How it Works Section (Animated) */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Comment ça marche ?</h2>
          <div className="w-24 h-1.5 bg-brand mx-auto rounded-full mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Ligne connectrice animée (visible sur Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-brand-light via-brand to-emerald-500 rounded-full opacity-30"></div>

          {/* Etape 1 */}
          <div className="relative flex flex-col items-center group">
            <div className="w-20 h-20 bg-white rounded-full border-4 border-brand flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,100,200,0.4)] group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-brand/20 group-hover:animate-ping rounded-full"></div>
              <Search className="text-brand relative z-10" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand transition-colors">1. Recherchez</h3>
            <p className="text-center text-gray-600">Utilisez notre moteur de recherche sémantique pour trouver un monument ou filtrer par catégorie historique.</p>
          </div>

          {/* Etape 2 */}
          <div className="relative flex flex-col items-center group mt-12 md:mt-0">
            <div className="w-20 h-20 bg-white rounded-full border-4 border-amber-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-amber-500/20 group-hover:animate-ping rounded-full"></div>
              <Map className="text-amber-500 relative z-10" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-500 transition-colors">2. Explorez</h3>
            <p className="text-center text-gray-600">Visualisez les résultats sur la carte interactive et cliquez sur les marqueurs pour voir les détails géographiques.</p>
          </div>

          {/* Etape 3 */}
          <div className="relative flex flex-col items-center group mt-12 md:mt-0">
            <div className="w-20 h-20 bg-white rounded-full border-4 border-emerald-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/20 group-hover:animate-ping rounded-full"></div>
              <Database className="text-emerald-500 relative z-10" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-500 transition-colors">3. Enrichissez</h3>
            <p className="text-center text-gray-600">En mode expert, alimentez l'ontologie en ajoutant de nouveaux lieux directement dans la base de graphes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">SafiOnto</h2>
            <p className="text-gray-500 max-w-sm">
              Projet universitaire réalisé dans le cadre du Master Data Science, visant à valoriser le patrimoine culturel marocain par l'intelligence artificielle.
            </p>
          </div>
          <div className="flex gap-8 text-lg font-medium">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="mailto:contact@safionto.ma" className="hover:text-white transition-colors">Contact</a>
            <a href="https://github.com" className="hover:text-white transition-colors">Code Source</a>
          </div>
        </div>
        <div className="text-center mt-12 text-sm border-t border-gray-800 pt-8 font-light tracking-wide">
          &copy; {new Date().getFullYear()} SafiOnto. Tous droits réservés. Construit avec React & Tailwind.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
