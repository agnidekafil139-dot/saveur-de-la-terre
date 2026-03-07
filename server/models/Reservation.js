import mongoose from 'mongoose';
const reservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email invalide']
  },
  phone: {
    type: String,
    required: [true, 'Le téléphone est requis'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'La date est requise']
  },
  time: {
    type: String,
    required: [true, 'L\'heure est requise'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide (HH:MM)']
  },
  numberOfGuests: {
    type: Number,
    required: [true, 'Le nombre de personnes est requis'],
    min: [1, 'Minimum 1 personne'],
    max: [20, 'Maximum 20 personnes']
  },
  specialRequest: {
    type: String,
    maxlength: [500, 'La demande spéciale ne peut pas dépasser 500 caractères']
  },
  occasion: {
    type: String,
    enum: ['aucune', 'anniversaire', 'celebration', 'premiere_visite', 'autre'],
    default: 'aucune'
  },
  status: {
    type: String,
    enum: ['en_attente', 'confirmée', 'annulée', 'terminée'],
    default: 'en_attente'
  },
  confirmationSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
// Index pour recherche rapide par date
reservationSchema.index({ date: 1, time: 1 });
reservationSchema.index({ email: 1 });
reservationSchema.index({ status: 1 });
const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;