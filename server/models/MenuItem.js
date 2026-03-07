import mongoose from 'mongoose';
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du plat est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: {
      values: ['entrées', 'viandes', 'volailles', 'poissons', 'pâtes', 'desserts', 'boissons'],
      message: 'Catégorie invalide'
    }
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix ne peut pas être négatif']
  },
  priceFor2: {
    type: Number,
    min: [0, 'Le prix ne peut pas être négatif']
  },
  image: {
    type: String,
    default: '/images/placeholder.jpg'
  },
  allergens: [{
    type: String,
    enum: ['gluten', 'lait', 'œuf', 'poisson', 'fruits à coque', 'soja', 'sulfites']
  }],
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isSpicy: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 20,
    min: [5, 'Le temps de préparation minimum est de 5 minutes']
  }
}, {
  timestamps: true
});
// Index pour recherche rapide
menuItemSchema.index({ category: 1, available: 1 });
menuItemSchema.index({ isFavorite: 1 });
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;