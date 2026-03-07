import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import menuAPI from '../services/menuAPI';
import reviewAPI from '../services/reviewAPI';

const RestaurantContext = createContext();

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [loading, setLoading] = useState(true); // TRUE par défaut
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false); // ← NOUVEAU

  // ✅ useCallback pour éviter re-création à chaque render
  const fetchMenuItems = useCallback(async () => {
    try {
      const data = await menuAPI.getAll();
      setMenuItems(data);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setMenuItems([]);
    }
  }, []);

  const fetchFavoriteItems = useCallback(async () => {
    try {
      const data = await menuAPI.getFavorites();
      setFavoriteItems(data);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setFavoriteItems([]);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      const data = await reviewAPI.getAll();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    }
  }, []);

  const fetchReviewStats = useCallback(async () => {
    try {
      const stats = await reviewAPI.getStats();
      setReviewStats(stats);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setReviewStats(null);
    }
  }, []);

  // ✅ refreshData avec useCallback
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        fetchMenuItems(),
        fetchFavoriteItems(),
        fetchReviews(),
        fetchReviewStats()
      ]);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  }, [fetchMenuItems, fetchFavoriteItems, fetchReviews, fetchReviewStats]);

  // ✅ useEffect qui se déclenche UNE SEULE FOIS
  useEffect(() => {
    if (!isInitialized) {
      refreshData();
      setIsInitialized(true);
    }
  }, [isInitialized, refreshData]);

  const value = {
    menuItems,
    favoriteItems,
    reviews,
    reviewStats,
    loading,
    error,
    refreshData
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

RestaurantProvider.propTypes = {
  children: PropTypes.node.isRequired
};