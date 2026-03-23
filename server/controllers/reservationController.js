import mongoose from 'mongoose';
import Reservation from '../models/Reservation.js';

// @desc    Créer une nouvelle réservation
// @route   POST /api/reservations
// @access  Public
export const createReservation = async (req, res) => {
  try {
    const { 
      customerName, 
      email, 
      phone, 
      date, 
      time, 
      numberOfGuests, 
      specialRequest, 
      occasion 
    } = req.body;

    const reservationDate = new Date(date);

    // Vérifier la disponibilité (max 50 personnes par créneau)
    const existingReservations = await Reservation.find({
      date: reservationDate,
      time: time,
      status: { $ne: 'annulée' }
    });

    const totalGuests = existingReservations.reduce((acc, reservation) => {
      return acc + reservation.numberOfGuests;
    }, 0);

    if (totalGuests + Number(numberOfGuests) > 50) {
      return res.status(400).json({
        success: false,
        message: 'Désolé, ce créneau est complet. Veuillez choisir un autre horaire.'
      });
    }

    // Créer la réservation
    const reservation = await Reservation.create({
      customerName,
      email,
      phone,
      date: reservationDate,
      time,
      numberOfGuests: Number(numberOfGuests),
      specialRequest,
      occasion
    });

    res.status(201).json({
      success: true,
      message: 'Réservation créée avec succès ! Vous recevrez une confirmation par email.',
      data: reservation
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
      message: 'Erreur lors de la création de la réservation',
      error: error.message
    });
  }
};


// @desc    Obtenir toutes les réservations
// @route   GET /api/reservations
// @access  Private/Admin (temporairement public pour test)
export const getReservations = async (req, res) => {
  try {
    const { date, status } = req.query;

    let filter = {};

    if (date) {
      filter.date = new Date(date);
    }

    if (status) {
      filter.status = status;
    }

    const reservations = await Reservation.find(filter)
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des réservations',
      error: error.message
    });
  }
};


// @desc    Vérifier la disponibilité
// @route   GET /api/reservations/availability
// @access  Public
export const checkAvailability = async (req, res) => {
  try {
    const { date, time } = req.query;
    const reservationDate = new Date(date);

    const existingReservations = await Reservation.find({
      date: reservationDate,
      time: time,
      status: { $ne: 'annulée' }
    });

    const totalGuests = existingReservations.reduce((acc, reservation) => {
      return acc + reservation.numberOfGuests;
    }, 0);

    const availableSeats = 50 - totalGuests;

    res.status(200).json({
      success: true,
      totalGuests,
      availableSeats,
      isAvailable: availableSeats > 0
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification de disponibilité',
      error: error.message
    });
  }
};

// @desc    Supprimer une réservation
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    await reservation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Réservation supprimée avec succès'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression',
      error: error.message
    });
  }
};

// @desc    Mettre à jour une réservation
// @route   PUT /api/reservations/:id
// @access  Private/Admin
export const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    // Mise à jour des champs envoyés
    Object.assign(reservation, req.body);

    const updatedReservation = await reservation.save();

    res.status(200).json({
      success: true,
      message: 'Réservation mise à jour avec succès',
      data: updatedReservation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: error.message
    });
  }
};