import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaUtensils, FaUsers, FaParking } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import MenuCard from '../components/MenuCard';
import ReviewCard from '../components/ReviewCard';
import SkeletonCard from '../components/SkeletonCard';
import SkeletonReview from '../components/SkeletonReview';
import ErrorMessage from '../components/ErrorMessage';
import { useRestaurant } from '../context/useRestaurant';

const Home = () => {
  const { favoriteItems, reviews, reviewStats, loading, error, refreshData } = useRestaurant();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section 
        className="relative h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/hero/home-hero.jpeg')",
          backgroundColor: '#2D5016'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl animate-fadeIn">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => navigate('/reserver')}
                className="btn-accent btn-lg"
              >
                {t('home.reserveTable')}
              </button>
              <button 
                onClick={() => navigate('/menu')}
                className="btn-secondary btn-lg"
              >
                {t('home.viewMenu')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION BIENVENUE */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom">
          <h2 className="section-title">
            {t('home.welcomeTitle')}
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
            {t('home.welcomeText')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{t('home.familyCuisine')}</h3>
              <p className="text-gray-600">
                {t('home.familyCuisineDesc')}
              </p>
            </div>

            <div className="text-center card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{t('home.familyAmbiance')}</h3>
              <p className="text-gray-600">
                {t('home.familyAmbianceDesc')}
              </p>
            </div>

            <div className="text-center card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaParking className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{t('home.privateParking')}</h3>
              <p className="text-gray-600">
                {t('home.privateParkingDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATS FAVORIS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('home.favoriteDishes')}</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            {t('home.favoriteSubtitle')}
          </p>

          {error && (
            <div className="mb-8">
              <ErrorMessage message={error} onRetry={refreshData} />
            </div>
          )}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : favoriteItems && favoriteItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">{t('home.noFavorites')}</p>
              <Link to="/menu" className="btn-primary">
                {t('home.viewAllMenu')}
              </Link>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-primary">
              {t('home.viewFullMenu')}
            </Link>
          </div>
        </div>
      </section>

      {/* AVIS CLIENTS */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom">
          <h2 className="section-title">{t('home.reviewsTitle')}</h2>
          
          {loading && !reviewStats ? (
            <div className="text-center mb-12 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-24 mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
            </div>
          ) : reviewStats && (
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
                {t('home.basedOn')} <span className="font-semibold">{reviewStats.totalReviews || 0}</span> {t('home.reviewsCount')}
              </p>
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...Array(3)].map((_, i) => <SkeletonReview key={i} />)}
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-12">
              <p className="text-gray-500 mb-4">{t('home.noReviews')}</p>
              <Link to="/avis" className="btn-primary">
                {t('home.firstReview')}
              </Link>
            </div>
          )}

          <div className="text-center">
            <Link to="/avis" className="btn-secondary">
              {t('home.readAllReviews')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-poppins font-bold mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('home.ctaText')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/reserver" className="btn-accent btn-lg">
              {t('home.reserveNow')}
            </Link>
            <Link to="/contact" className="btn-secondary btn-lg">
              {t('home.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;