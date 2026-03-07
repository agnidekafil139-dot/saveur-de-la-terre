import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import MenuItem from '../models/MenuItem.js';
import Review from '../models/Review.js';

dotenv.config();

const menuItems = [
  // ===== VIANDES =====
  {
    name: 'Escalope Parmigiana',
    category: 'viandes',
    description: 'Escalope panée, sauce tomate maison et fromage gratiné, frites et salade',
    price: 42.00,
    priceFor2: 78.00,
    image: '/images/menu/viandes/escalope-parmigiana.jpeg',
    allergens: ['gluten', 'lait', 'œuf'],
    isFavorite: true,
    available: true,
    preparationTime: 25
  },
  {
    name: 'Côtes de Bœuf Confites',
    category: 'viandes',
    description: 'Côtes de bœuf confites 4h, riz, polenta frite et vinaigrette',
    price: 48.00,
    priceFor2: 88.00,
    image: '/images/menu/viandes/costela.jpeg',
    allergens: [],
    isFavorite: true,
    available: true,
    preparationTime: 35
  },
  {
    name: 'Picanha sur Plancha',
    category: 'viandes',
    description: '300g picanha grillée, riz, haricots tropeiro, farofa',
    price: 58.00,
    image: '/images/placeholder.jpeg',
    allergens: [],
    isFavorite: false,
    available: true,
    preparationTime: 20
  },

  // ===== VOLAILLES =====
  {
    name: 'Poulet Fermier',
    category: 'volailles',
    description: 'Poulet effiloché sauce maison, riz, pommes paille',
    price: 39.00,
    priceFor2: 72.00,
    image: '/images/menu/volailles/frango-caipira.jpeg',
    allergens: ['lait'],
    isFavorite: true,
    available: true,
    preparationTime: 25
  },
  {
    name: 'Poulet Parmigiana',
    category: 'volailles',
    description: 'Poulet pané sauce tomate et fromage fondu',
    price: 38.00,
    image: '/images/placeholder.jpeg',
    allergens: ['gluten', 'lait', 'œuf'],
    isFavorite: false,
    available: true,
    preparationTime: 25
  }
];

const reviews = [
  {
     customerName: 'Sophie Martin',
    rating: 5,
    comment: 'Cuisine exceptionnelle et service parfait !'
  },
  {
    customerName: 'Lucas Bernard',
    rating: 4,
    comment: 'Très bon restaurant, ambiance chaleureuse.'
  }
];

const importData = async () => {
  try {
    await connectDB();

    await MenuItem.deleteMany();
    await Review.deleteMany();

    await MenuItem.insertMany(menuItems);
    await Review.insertMany(reviews);

    console.log('✅ Données importées avec succès');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur import:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await MenuItem.deleteMany();
    await Review.deleteMany();

    console.log('🗑 Données supprimées');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur suppression:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}