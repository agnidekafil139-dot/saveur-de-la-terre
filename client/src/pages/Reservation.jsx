import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCalendar, FaClock, FaUser, FaPhone, FaEnvelope, FaWhatsapp, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import reservationAPI from '../services/reservationAPI';

const Reservation = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const occasions = [
    { value: 'none', label: 'Aucune occasion spéciale' },
    { value: 'birthday', label: 'Anniversaire' },
    { value: 'celebration', label: 'Célébration' },
    { value: 'first_visit', label: 'Première visite' },
    { value: 'other', label: 'Autre' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Adapter les champs du formulaire au backend
      const payload = {
        customerName: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
        date: data.date,
        time: data.time,
        numberOfGuests: data.numberOfGuests,
        specialRequest: data.specialRequest,
        occasion: data.occasion
      };

      await reservationAPI.create(payload);
      setSubmitSuccess(true);
      reset();
      
      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center animate-fadeIn">
          <FaCheckCircle className="text-6xl text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-3">
            Réservation créée avec succès !
          </h2>
          <p className="text-gray-600 mb-6">
            Vous recevrez une confirmation par email et WhatsApp dans les prochaines minutes.
            Nous avons hâte de vous accueillir !
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="btn-primary"
          >
            Faire une autre réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-primary text-white py-12 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-3">
            Réservez votre table
          </h1>
          <p className="text-xl">
            Garantissons votre place pour profiter en toute tranquillité
          </p>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="py-12 px-4">
        <div className="container-custom max-w-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card">
            {submitError && (
              <div className="alert-danger mb-6">
                <FaExclamationTriangle className="text-xl" />
                <p>{submitError}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Nom complet */}
              <div>
                <label className="input-label">
                  Nom complet *
                </label>
                <input
                  type="text"
                  {...register('customerName', { 
                    required: 'Le nom est requis',
                    minLength: { value: 3, message: 'Minimum 3 caractères' }
                  })}
                  className={errors.customerName ? 'input-field-error' : 'input-field'}
                  placeholder="Ex: Maria Silva"
                />
                {errors.customerName && (
                  <p className="input-error">{errors.customerName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="input-label">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('customerEmail', { 
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalide'
                    }
                  })}
                  className={errors.customerEmail ? 'input-field-error' : 'input-field'}
                  placeholder="exemple@email.com"
                />
                {errors.customerEmail && (
                  <p className="input-error">{errors.customerEmail.message}</p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label className="input-label">
                  Téléphone / WhatsApp *
                </label>
                <input
                  type="tel"
                  {...register('customerPhone', { 
                    required: 'Le téléphone est requis',
                    pattern: {
                      value: /^[0-9+\s()-]{10,}$/,
                      message: 'Téléphone invalide'
                    }
                  })}
                  className={errors.customerPhone ? 'input-field-error' : 'input-field'}
                  placeholder="+55 44 99876-5432"
                />
                {errors.customerPhone && (
                  <p className="input-error">{errors.customerPhone.message}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="input-label">
                  Date *
                </label>
                <input
                  type="date"
                  {...register('date', { 
                    required: 'La date est requise',
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return selectedDate >= today || 'Date invalide';
                    }
                  })}
                  className={errors.date ? 'input-field-error' : 'input-field'}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <p className="input-error">{errors.date.message}</p>
                )}
              </div>

              {/* Horaire */}
              <div>
                <label className="input-label">
                  Horaire *
                </label>
                <select
                  {...register('time', { required: 'L\'horaire est requis' })}
                  className={errors.time ? 'input-field-error' : 'select-field'}
                >
                  <option value="">Sélectionner un horaire</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.time && (
                  <p className="input-error">{errors.time.message}</p>
                )}
              </div>

              {/* Nombre de personnes */}
              <div>
                <label className="input-label">
                  Nombre de personnes *
                </label>
                <select
                  {...register('numberOfGuests', { required: 'Requis' })}
                  className={errors.numberOfGuests ? 'input-field-error' : 'select-field'}
                >
                  <option value="">Sélectionner</option>
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'personne' : 'personnes'}
                    </option>
                  ))}
                </select>
                {errors.numberOfGuests && (
                  <p className="input-error">{errors.numberOfGuests.message}</p>
                )}
                <p className="input-hint">
                  Pour plus de 20 personnes, contactez-nous directement
                </p>
              </div>
            </div>

            {/* Occasion spéciale */}
            <div className="mt-6">
              <label className="input-label">
                Occasion spéciale ?
              </label>
              <select
                {...register('specialOccasion')}
                className="select-field"
              >
                {occasions.map((occasion) => (
                  <option key={occasion.value} value={occasion.value}>
                    {occasion.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Demandes spéciales */}
            <div className="mt-6">
              <label className="input-label">
                Demandes spéciales
              </label>
              <textarea
                {...register('specialRequests', {
                  maxLength: { value: 500, message: 'Maximum 500 caractères' }
                })}
                className="textarea-field"
                rows="4"
                placeholder="Allergies, préférences de table, chaise haute, etc."
              />
              {errors.specialRequests && (
                <p className="input-error">{errors.specialRequests.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full btn-lg"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                * Champs obligatoires
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                Après l'envoi, vous recevrez une confirmation par email ou WhatsApp
              </p>
            </div>
          </form>

          {/* Autres moyens */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-primary">
              Autres moyens de réserver
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="https://wa.me/554499148762"
                target="_blank"
                rel="noopener noreferrer"
                className="card text-center hover:shadow-xl transition-all"
              >
                <FaWhatsapp className="text-5xl text-green-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2">WhatsApp</h4>
                <p className="text-sm text-gray-600 mb-2">Moyen le plus rapide !</p>
                <p className="text-primary font-semibold">+55 44 9914-8762</p>
              </a>

              <a
                href="tel:+554499876543 2"
                className="card text-center hover:shadow-xl transition-all"
              >
                <FaPhone className="text-5xl text-primary mx-auto mb-3" />
                <h4 className="font-bold mb-2">Téléphone</h4>
                <p className="text-sm text-gray-600 mb-2">Appelez directement</p>
                <p className="text-primary font-semibold">+55 44 9914-8762</p>
              </a>

              <a
                href="mailto:contact@saveurdelaterre.com"
                className="card text-center hover:shadow-xl transition-all"
              >
                <FaEnvelope className="text-5xl text-secondary mx-auto mb-3" />
                <h4 className="font-bold mb-2">E-mail</h4>
                <p className="text-sm text-gray-600 mb-2">Réponse sous 2h</p>
                <p className="text-primary font-semibold text-sm">contact@gmail.com</p>
              </a>
            </div>
          </div>

          {/* Politique d'annulation */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-bold text-lg mb-3 text-blue-900">
              Politique d'annulation
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✅ Annulation gratuite jusqu'à 2h avant</li>
              <li>✅ Tolérance de 15 minutes de retard</li>
              <li>⚠️ Passé ce délai, votre table pourra être libérée</li>
              <li>📞 En cas d'imprévu, contactez-nous</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservation;