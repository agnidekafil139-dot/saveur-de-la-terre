import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

// @desc    Créer un nouveau message de contact
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });
    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
      data: contact
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: messages
      });
    }
    res.status(400).json({
      success: false,
      message: "Erreur lors de l'envoi du message",
      error: error.message
    });
  }
};
// @desc    Obtenir tous les messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des messages',
      error: error.message
    });
  }
};
// @desc    Mettre à jour le statut d'un message
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const { status, replied } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, replied },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: error.message
    });
  }
};