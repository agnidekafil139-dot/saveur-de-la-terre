import mongoose from 'mongoose';
const contactSchema = new mongoose.Schema({
  name: {
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
  subject: {
    type: String,
    required: [true, 'Le sujet est requis'],
    enum: {
      values: ['reservation', 'menu', 'evenement', 'suggestion', 'reclamation', 'carriere', 'autre'],
      message: 'Sujet invalide'
    }
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
    minlength: [10, 'Le message doit contenir au moins 10 caractères'],
    maxlength: [1000, 'Le message ne peut pas dépasser 1000 caractères']
  },
  status: {
    type: String,
    enum: ['nouveau', 'lu', 'repondu'],
    default: 'nouveau'
  },
  replied: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
// Index pour recherche rapide
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
const Contact = mongoose.model('Contact', contactSchema);
export default Contact;