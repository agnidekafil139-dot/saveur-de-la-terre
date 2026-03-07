import Review from '../models/Review.js';


// @desc    Obtenir tous les avis approuvés
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des avis',
      error: error.message
    });
  }
};


// @desc    Créer un nouvel avis
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res) => {
  try {
    const { customerName, rating, comment, visitDate } = req.body;

    // Validation simple
    if (!customerName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Nom, note et commentaire sont obligatoires'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'La note doit être comprise entre 1 et 5'
      });
    }

    const review = await Review.create({
      customerName,
      rating: Number(rating),
      comment,
      visitDate: visitDate ? new Date(visitDate) : new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Merci pour votre avis ! Il sera publié après modération.',
      data: review
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création de l\'avis',
      error: error.message
    });
  }
};


// @desc    Obtenir les statistiques des avis
// @route   GET /api/reviews/stats
// @access  Public
export const getReviewStats = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true });

    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalReviews: 0,
          averageRating: 0,
          ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        }
      });
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = Number((totalRating / totalReviews).toFixed(1));

    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };

    res.status(200).json({
      success: true,
      data: {
        totalReviews,
        averageRating,
        ratingDistribution
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du calcul des statistiques',
      error: error.message
    });
  }
};


// @desc    Approuver un avis (Admin)
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
export const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Avis approuvé avec succès',
      data: review
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'approbation de l\'avis',
      error: error.message
    });
  }
};