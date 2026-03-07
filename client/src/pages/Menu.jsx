import { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import MenuCard from '../components/MenuCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useRestaurant } from '../context/RestaurantContext';
import { useDebounce } from 'use-debounce';

const Menu = () => {
  const { menuItems, loading, error, refreshData } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const categories = [
    { id: 'all', label: 'Tous les plats', icon: '🍽️' },
    { id: 'meats', label: 'Viandes', icon: '🥩' },
    { id: 'poultry', label: 'Volailles', icon: '🍗' },
    { id: 'fish', label: 'Poissons', icon: '🐟' },
    { id: 'pasta', label: 'Pâtes', icon: '🍝' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
  ];

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const filteredItems = useMemo(() => {
    let filtered = menuItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
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

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={refreshData} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Notre Menu
          </h1>
          <p className="text-xl md:text-2xl mb-2">
            Tout préparé frais tous les jours
          </p>
          <p className="text-gray-200">
            Découvrez nos spécialités de cuisine familiale brésilienne
          </p>
        </div>
      </section>

      {/* RECHERCHE & FILTRES */}
      <section className="py-8 px-4 bg-white sticky top-20 z-40 shadow-md">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un plat..."
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label="Rechercher un plat"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Effacer la recherche"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
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
                aria-label={`Filtrer par ${category.label}`}
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
          {/* Counter */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              <span className="font-bold text-primary">{filteredItems.length}</span>{' '}
              {filteredItems.length === 1 ? 'plat trouvé' : 'plats trouvés'}
              {selectedCategory !== 'all' && (
                <span>
                  {' '}dans <span className="font-semibold">
                    {categories.find(c => c.id === selectedCategory)?.label}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Plate Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-4">
                Aucun plat trouvé
              </p>
              <p className="text-gray-400 mb-8">
                Essayez de modifier vos critères de recherche
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="btn-primary"
                aria-label="Réinitialiser les filtres"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;