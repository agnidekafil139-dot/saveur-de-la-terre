import { useEffect, useState, useMemo } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import MenuCard from '../components/MenuCard';
import SkeletonCard from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import { useRestaurant } from '../context/useRestaurant';
import { useDebounce } from 'use-debounce';

const Menu = () => {
  const { menuItems, loading, error, refreshData } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const { t } = useTranslation();

  const categories = [
    { id: 'all', label: t('menu.all'), icon: '🍽️' },
    { id: 'viandes', label: t('menu.viandes'), icon: '🥩' },
    { id: 'volailles', label: t('menu.volailles'), icon: '🍗' },
    { id: 'poissons', label: t('menu.poissons'), icon: '🐟' },
    { id: 'pâtes', label: t('menu.pates'), icon: '🍝' },
    { id: 'desserts', label: t('menu.desserts'), icon: '🍰' },
  ];

  useEffect(() => {
    if (!loading && !error && menuItems.length === 0) {
      refreshData();
    }
  }, [loading, error, menuItems.length, refreshData]);

  const filteredItems = useMemo(() => {
    let filtered = menuItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [menuItems, selectedCategory, debouncedSearchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            {t('menu.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-2">
            {t('menu.subtitle')}
          </p>
          <p className="text-gray-200">
            {t('menu.description')}
          </p>
        </div>
      </section>

      {/* RECHERCHE & FILTRES */}
      <section className="py-8 px-4 bg-white sticky top-20 z-40 shadow-md">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('menu.search')}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label={t('menu.search')}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={t('menu.clearSearch')}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label={`${t('menu.filterBy')} ${category.label}`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-12 px-4">
        <div className="container-custom">
          {error && (
            <div className="mb-8">
              <ErrorMessage message={error} onRetry={refreshData} />
            </div>
          )}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              {loading ? (
                <span className="animate-pulse">{t('menu.loading')}</span>
              ) : (
                <>
                  <span className="font-bold text-primary">{filteredItems.length}</span>{' '}
                  {filteredItems.length === 1 ? t('menu.dishFound') : t('menu.dishesFound')}
                  {selectedCategory !== 'all' && (
                    <span>
                      {' '}{t('menu.inCategory')} <span className="font-semibold">
                        {categories.find(c => c.id === selectedCategory)?.label}
                      </span>
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-4">
                {t('menu.noDish')}
              </p>
              <p className="text-gray-400 mb-8">
                {t('menu.tryModify')}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="btn-primary"
                aria-label={t('menu.resetFilters')}
              >
                {t('menu.resetFilters')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;