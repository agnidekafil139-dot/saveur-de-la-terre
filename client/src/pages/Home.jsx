import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaUtensils, FaUsers, FaParking } from 'react-icons/fa';
import MenuCard from '../components/MenuCard';
import ReviewCard from '../components/ReviewCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useRestaurant } from '../context/RestaurantContext';

const Home = () => {
  const { favoriteItems, reviews, reviewStats, loading, error, refreshData } = useRestaurant();
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await refreshData();
      setIsInitialLoad(false);
    };
    
    if (isInitialLoad) {
      loadData();
    }
  }, [isInitialLoad]);

  // LOADING STATE
  if (loading && isInitialLoad) {
    return <Loading />;
  }

  // ERROR STATE
  if (error && isInitialLoad) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section 
        className="relative h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/hero/home-hero.jpg')",
          backgroundColor: '#2D5016' // Fallback color
        }}
      >
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        
        {/* Contenu */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl animate-fadeIn">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6">
              Vraie cuisine familiale au cœur de Cruzeiro do Oeste
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Saveurs traditionnelles · Ambiance familiale · Réservation facile
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => navigate('/reserver')}
                className="btn-accent btn-lg"
              >
                Réserver une table
              </button>
              <button 
                onClick={() => navigate('/menu')}
                className="btn-secondary btn-lg"
              >
                Voir le menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION BIENVENUE */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom">
          <h2 className="section-title">
            Le goût que vous connaissez, l'attention que vous méritez
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
            Depuis plus de 5 ans, Saveur de la Terre est le point de rencontre des familles 
            de Cruzeiro do Oeste. Ici vous trouvez cette bonne cuisine, faite avec soin, 
            qui rappelle le déjeuner du dimanche chez mamie.
          </p>

          {/* 3 Points Clés */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Cuisine Familiale</h3>
              <p className="text-gray-600">
                Faite minute, tous les jours, avec ingrédients frais
              </p>
            </div>

            <div className="text-center card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Ambiance Familiale</h3>
              <p className="text-gray-600">
                Espace cosy où toute la famille se sent chez soi
              </p>
            </div>

            <div className="text-center card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaParking className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Parking Privé</h3>
              <p className="text-gray-600">
                Places sécurisées, accès facile au centre-ville
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATS FAVORIS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Plats qui font le succès</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Nos spécialités préférées des clients
          </p>

          {/* GESTION ÉTATS VIDES/LOADING */}
          {loading && !isInitialLoad ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-500">Chargement des plats...</p>
            </div>
          ) : favoriteItems && favoriteItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteItems.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucun plat favori pour le moment</p>
              <Link to="/menu" className="btn-primary">
                Voir tout le menu
              </Link>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-primary">
              Voir le menu complet
            </Link>
          </div>
        </div>
      </section>

      {/* AVIS CLIENTS */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Ce qu'on dit de nous</h2>
          
          {/* Stats */}
          {reviewStats && (
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`text-2xl ${
                        i < Math.round(reviewStats.averageRating) 
                          ? 'text-accent' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  {reviewStats.averageRating ? reviewStats.averageRating.toFixed(1) : '0.0'}
                </span>
              </div>
              <p className="text-gray-600">
                basé sur <span className="font-semibold">{reviewStats.totalReviews || 0}</span> avis
              </p>
            </div>
          )}

          {/* Avis */}
          {loading && !isInitialLoad ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-500">Chargement des avis...</p>
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-12">
              <p className="text-gray-500 mb-4">Aucun avis pour le moment</p>
              <Link to="/avis" className="btn-primary">
                Soyez le premier à laisser un avis
              </Link>
            </div>
          )}

          <div className="text-center">
            <Link to="/avis" className="btn-secondary">
              Lire tous les avis
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-poppins font-bold mb-6">
            Prêt à vivre l'expérience ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Réservez votre table dès maintenant et découvrez pourquoi nous sommes 
            le restaurant préféré des familles
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/reserver" className="btn-accent btn-lg">
              Réserver maintenant
            </Link>
            <Link to="/contact" className="btn-secondary btn-lg">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;