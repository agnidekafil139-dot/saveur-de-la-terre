import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaCheckCircle } from 'react-icons/fa';
import contactAPI from '../services/contactAPI';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const subjects = [
    { value: 'reservation', label: 'Réservation' },
    { value: 'menu', label: 'Question sur le menu' },
    { value: 'event', label: 'Événement privé' },
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'complaint', label: 'Réclamation' },
    { value: 'career', label: 'Opportunités de carrière' },
    { value: 'other', label: 'Autre' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await contactAPI.send(data);
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      alert(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl">
            Nous sommes là pour vous aider !
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* INFOS CONTACT */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">
                Nos Coordonnées
              </h2>

              <div className="space-y-6">
                {/* Adresse */}
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Adresse</h3>
                    <p className="text-gray-600 mb-2">
                      Rua das Flores, 123<br />
                      Cruzeiro do Oeste - PR<br />
                      CEP: 87400-000
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-700 font-semibold text-sm"
                    >
                      Voir sur Google Maps →
                    </a>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-2xl text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Téléphone</h3>
                    <a
                      href="tel:+55 44 9914-8762"
                      className="text-gray-600 hover:text-primary font-semibold"
                    >
                      +55 44 9914-8762 </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="card flex items-start gap-4 border-2 border-green-200 bg-green-50">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                    <a
                      href="https://wa.me/554499148762"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-900 font-semibold"
                    >
                      +55 44 9914-8762
                    </a>
                    <p className="text-sm text-green-600 mt-1">
                      ⚡ Moyen le plus rapide !
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-2xl text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">E-mail</h3>
                    <a
                      href="mailto:contact@saveurdelaterre.com"
                      className="text-gray-600 hover:text-primary font-semibold break-all"
                    >
                      contact@saveurdelaterre.com
                    </a>
                  </div>
                </div>

                {/* Horaires */}
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-2xl text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-3">Horaires</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lundi - Vendredi</span>
                        <span className="font-semibold">11h - 14h / 18h - 22h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Samedi</span>
                        <span className="font-semibold">11h - 15h / 18h - 23h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dimanche</span>
                        <span className="font-semibold">11h - 15h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULAIRE */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">
                Envoyez-nous un message
              </h2>

              {submitSuccess && (
                <div className="alert-success mb-6">
                  <FaCheckCircle className="text-2xl" />
                  <div>
                    <p className="font-semibold">Message envoyé avec succès !</p>
                    <p className="text-sm">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="card">
                {/* Nom */}
                <div className="mb-6">
                  <label className="input-label">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    {...register('name', {
                      required: 'Le nom est requis',
                      minLength: { value: 2, message: 'Minimum 2 caractères' }
                    })}
                    className={errors.name ? 'input-field-error' : 'input-field'}
                    placeholder="Ex: Maria Silva"
                  />
                  {errors.name && (
                    <p className="input-error">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="input-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'L\'email est requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalide'
                      }
                    })}
                    className={errors.email ? 'input-field-error' : 'input-field'}
                    placeholder="exemple@email.com"
                  />
                  {errors.email && (
                    <p className="input-error">{errors.email.message}</p>
                  )}
                </div>

                {/* Téléphone */}
                <div className="mb-6">
                  <label className="input-label">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input-field"
                    placeholder="++55 44 9914-8762"
                  />
                </div>

                {/* Sujet */}
                <div className="mb-6">
                  <label className="input-label">
                    Sujet *
                  </label>
                  <select
                    {...register('subject', { required: 'Le sujet est requis' })}
                    className={errors.subject ? 'input-field-error' : 'select-field'}
                  >
                    <option value="">Sélectionner un sujet</option>
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="input-error">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="input-label">
                    Message *
                  </label>
                  <textarea
                    {...register('message', {
                      required: 'Le message est requis',
                      minLength: { value: 10, message: 'Minimum 10 caractères' },
                      maxLength: { value: 1000, message: 'Maximum 1000 caractères' }
                    })}
                    className={errors.message ? 'input-field-error' : 'textarea-field'}
                    rows="6"
                    placeholder="Écrivez votre message ici..."
                  />
                  {errors.message && (
                    <p className="input-error">{errors.message.message}</p>
                  )}
                  <p className="input-hint">
                    {watch('message')?.length || 0} / 1000 caractères
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Nous répondons généralement sous 2 heures pendant nos horaires d'ouverture
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CARTE */}
      <section className="py-12 px-4 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Comment nous trouver
          </h2>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.097705057389!2d-53.05!3d-23.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzEyLjAiUyA1M8KwMDMnMDAuMCJX!5e0!3m2!1sen!2sbr!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation du restaurant"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;