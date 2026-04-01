import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCalendar, FaClock, FaUser, FaPhone, FaEnvelope, FaWhatsapp, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import reservationAPI from '../services/reservationAPI';

const Reservation = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { t } = useTranslation();

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const occasions = [
    { value: 'aucune', label: t('reservation.occasionNone') },
    { value: 'anniversaire', label: t('reservation.occasionBirthday') },
    { value: 'celebration', label: t('reservation.occasionCelebration') },
    { value: 'premiere_visite', label: t('reservation.occasionFirstVisit') },
    { value: 'autre', label: t('reservation.occasionOther') },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        customerName: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
        date: data.date,
        time: data.time,
        numberOfGuests: data.numberOfGuests,
        specialRequest: data.specialRequest || '',
        occasion: data.occasion || 'aucune'
      };

      await reservationAPI.create(payload);
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(error.message || t('common.error'));
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
            {t('reservation.successTitle')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('reservation.successText')}
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="btn-primary"
          >
            {t('reservation.anotherReservation')}
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
            {t('reservation.title')}
          </h1>
          <p className="text-xl">
            {t('reservation.subtitle')}
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
                  {t('reservation.fullName')}
                </label>
                <input
                  type="text"
                  {...register('customerName', { 
                    required: t('reservation.nameRequired'),
                    minLength: { value: 3, message: t('reservation.minChars3') }
                  })}
                  className={errors.customerName ? 'input-field-error' : 'input-field'}
                  placeholder={t('reservation.namePlaceholder')}
                />
                {errors.customerName && (
                  <p className="input-error">{errors.customerName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="input-label">
                  {t('reservation.email')}
                </label>
                <input
                  type="email"
                  {...register('customerEmail', { 
                    required: t('reservation.emailRequired'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('reservation.emailInvalid')
                    }
                  })}
                  className={errors.customerEmail ? 'input-field-error' : 'input-field'}
                  placeholder={t('reservation.emailPlaceholder')}
                />
                {errors.customerEmail && (
                  <p className="input-error">{errors.customerEmail.message}</p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label className="input-label">
                  {t('reservation.phone')}
                </label>
                <input
                  type="tel"
                  {...register('customerPhone', { 
                    required: t('reservation.phoneRequired'),
                    pattern: {
                      value: /^[0-9+\s()-]{10,}$/,
                      message: t('reservation.phoneInvalid')
                    }
                  })}
                  className={errors.customerPhone ? 'input-field-error' : 'input-field'}
                  placeholder={t('reservation.phonePlaceholder')}
                />
                {errors.customerPhone && (
                  <p className="input-error">{errors.customerPhone.message}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="input-label">
                  {t('reservation.date')}
                </label>
                <input
                  type="date"
                  {...register('date', { 
                    required: t('reservation.dateRequired'),
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return selectedDate >= today || t('reservation.dateInvalid');
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
                  {t('reservation.time')}
                </label>
                <select
                  {...register('time', { required: t('reservation.timeRequired') })}
                  className={errors.time ? 'input-field-error' : 'select-field'}
                >
                  <option value="">{t('reservation.selectTime')}</option>
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
                  {t('reservation.guests')}
                </label>
                <select
                  {...register('numberOfGuests', { required: t('reservation.guestsRequired') })}
                  className={errors.numberOfGuests ? 'input-field-error' : 'select-field'}
                >
                  <option value="">{t('reservation.selectGuests')}</option>
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? t('reservation.person') : t('reservation.persons')}
                    </option>
                  ))}
                </select>
                {errors.numberOfGuests && (
                  <p className="input-error">{errors.numberOfGuests.message}</p>
                )}
                <p className="input-hint">
                  {t('reservation.guestsHint')}
                </p>
              </div>
            </div>

            {/* Occasion spéciale */}
            <div className="mt-6">
              <label className="input-label">
                {t('reservation.occasion')}
              </label>
              <select
                {...register('occasion')}
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
                {t('reservation.specialRequests')}
              </label>
              <textarea
                {...register('specialRequest', {
                  maxLength: { value: 500, message: t('reservation.maxChars500') }
                })}
                className="textarea-field"
                rows="4"
                placeholder={t('reservation.specialRequestsPlaceholder')}
              />
              {errors.specialRequest && (
                <p className="input-error">{errors.specialRequest.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full btn-lg"
              >
                {isSubmitting ? t('reservation.sending') : t('reservation.confirm')}
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                {t('reservation.required')}
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                {t('reservation.afterSubmit')}
              </p>
            </div>
          </form>

          {/* Autres moyens */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-primary">
              {t('reservation.otherWays')}
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
                <p className="text-sm text-gray-600 mb-2">{t('reservation.fastestWay')}</p>
                <p className="text-primary font-semibold">+55 44 9914-8762</p>
              </a>

              <a
                href="tel:+554499876543 2"
                className="card text-center hover:shadow-xl transition-all"
              >
                <FaPhone className="text-5xl text-primary mx-auto mb-3" />
                <h4 className="font-bold mb-2">{t('contact.phone')}</h4>
                <p className="text-sm text-gray-600 mb-2">{t('reservation.callDirectly')}</p>
                <p className="text-primary font-semibold">+55 44 9914-8762</p>
              </a>

              <a
                href="mailto:contact@saveurdelaterre.com"
                className="card text-center hover:shadow-xl transition-all"
              >
                <FaEnvelope className="text-5xl text-secondary mx-auto mb-3" />
                <h4 className="font-bold mb-2">E-mail</h4>
                <p className="text-sm text-gray-600 mb-2">{t('reservation.responseUnder2h')}</p>
                <p className="text-primary font-semibold text-sm">contact@gmail.com</p>
              </a>
            </div>
          </div>

          {/* Politique d'annulation */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-bold text-lg mb-3 text-blue-900">
              {t('reservation.cancellationPolicy')}
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>{t('reservation.cancel1')}</li>
              <li>{t('reservation.cancel2')}</li>
              <li>{t('reservation.cancel3')}</li>
              <li>{t('reservation.cancel4')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservation;