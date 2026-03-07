import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RestaurantProvider } from './context/RestaurantContext';
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

// 404
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Page non trouvée
      </h2>
      <p className="text-gray-600 mb-8">
        La page que vous cherchez n'existe pas
      </p>
      <a href="/" className="btn-primary">
        Retour à l'accueil
      </a>
    </div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <RestaurantProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notre-histoire" element={<OurStory />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reserver" element={<Reservation />} />
                <Route path="/galerie" element={<Gallery />} />
                <Route path="/avis" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* WhatsApp Button */}
            <WhatsAppButton />
          </div>
        </Router>
      </RestaurantProvider>
    </HelmetProvider>
  );
}

export default App;