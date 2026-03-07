import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  rating: {
    type: Number,
    required: [true, 'La note est requise'],
    min: [1, 'La note minimum est 1'],
    max: [5, 'La note maximum est 5']
  },
  comment: {
    type: String,
    required: [true, 'Le commentaire est requis'],
    minlength: [10, 'Le commentaire doit contenir au moins 10 caractères'],
    maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères']
  },
  visitDate: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
// Index pour recherche rapide
reviewSchema.index({ approved: 1, createdAt: -1 });
reviewSchema.index({ rating: 1 });
const Review = mongoose.model('Review', reviewSchema);
export default Review;