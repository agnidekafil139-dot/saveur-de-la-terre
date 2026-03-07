import MenuItem from '../models/MenuItem.js';
// @desc    Obtenir tous les plats du menu
// @route   GET /api/menu
// @access  Public
export const getMenuItems = async (req, res) => {
  try {
    const { category, available, favorite } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (available) filter.available = available === 'true';
    if (favorite) filter.isFavorite = favorite === 'true';
    const menuItems = await MenuItem.find(filter)
      .sort({ category: 1, name: 1 });
    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du menu',
      error: error.message
    });
  }
};
// @desc    Obtenir un plat par ID
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Plat non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du plat',
      error: error.message
    });
  }
};
// @desc    Obtenir les plats favoris
// @route   GET /api/menu/favorites
// @access  Public
export const getFavoriteItems = async (req, res) => {
  try {
    const favorites = await MenuItem.find({ 
      isFavorite: true,
      available: true 
    }).limit(6);
    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des favoris',
      error: error.message
    });
  }
};