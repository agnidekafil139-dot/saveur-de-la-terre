import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import contactAPI from '../services/contactAPI';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { t } = useTranslation();

  const subjects = [
    { value: 'reservation', label: t('contact.subjectReservation') },
    { value: 'menu', label: t('contact.subjectMenu') },
    { value: 'evenement', label: t('contact.subjectEvent') },
    { value: 'suggestion', label: t('contact.subjectSuggestion') },
    { value: 'reclamation', label: t('contact.subjectComplaint') },
    { value: 'carriere', label: t('contact.subjectCareer') },
    { value: 'autre', label: t('contact.subjectOther') },
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
      alert(error.message || t('common.error'));
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
            {t('contact.title')}
          </h1>
          <p className="text-xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* INFOS CONTACT */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">
                {t('contact.coordinates')}
              </h2>

              <div className="space-y-6">
                {/* Adresse */}
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.address')}</h3>
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
                      {t('contact.viewOnMaps')}
                    </a>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-2xl text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.phone')}</h3>
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
                    <h3 className="font-bold text-lg mb-2">{t('contact.whatsapp')}</h3>
                    <a
                      href="https://wa.me/554499148762"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-900 font-semibold"
                    >
                      +55 44 9914-8762
                    </a>
                    <p className="text-sm text-green-600 mt-1">
                      {t('contact.fastestWay')}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-2xl text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.email')}</h3>
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
                    <h3 className="font-bold text-lg mb-3">{t('contact.hours')}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('contact.monFri')}</span>
                        <span className="font-semibold">11h - 14h / 18h - 22h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('contact.saturday')}</span>
                        <span className="font-semibold">11h - 15h / 18h - 23h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('contact.sunday')}</span>
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
                {t('contact.sendMessage')}
              </h2>

              {submitSuccess && (
                <div className="alert-success mb-6">
                  <FaCheckCircle className="text-2xl" />
                  <div>
                    <p className="font-semibold">{t('contact.successTitle')}</p>
                    <p className="text-sm">
                      {t('contact.successText')}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="card">
                {/* Nom */}
                <div className="mb-6">
                  <label className="input-label">
                    {t('contact.fullName')}
                  </label>
                  <input
                    type="text"
                    {...register('name', {
                      required: t('contact.nameRequired'),
                      minLength: { value: 2, message: t('contact.minChars2') }
                    })}
                    className={errors.name ? 'input-field-error' : 'input-field'}
                    placeholder={t('contact.namePlaceholder')}
                  />
                  {errors.name && (
                    <p className="input-error">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="input-label">
                    {t('contact.emailLabel')}
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: t('contact.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('contact.emailInvalid')
                      }
                    })}
                    className={errors.email ? 'input-field-error' : 'input-field'}
                    placeholder={t('contact.emailPlaceholder')}
                  />
                  {errors.email && (
                    <p className="input-error">{errors.email.message}</p>
                  )}
                </div>

                {/* Téléphone */}
                <div className="mb-6">
                  <label className="input-label">
                    {t('contact.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input-field"
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>

                {/* Sujet */}
                <div className="mb-6">
                  <label className="input-label">
                    {t('contact.subjectLabel')}
                  </label>
                  <select
                    {...register('subject', { required: t('contact.subjectRequired') })}
                    className={errors.subject ? 'input-field-error' : 'select-field'}
                  >
                    <option value="">{t('contact.selectSubject')}</option>
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
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    {...register('message', {
                      required: t('contact.messageRequired'),
                      minLength: { value: 10, message: t('contact.minChars10') },
                      maxLength: { value: 1000, message: t('contact.maxChars1000') }
                    })}
                    className={errors.message ? 'input-field-error' : 'textarea-field'}
                    rows="6"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="input-error">{errors.message.message}</p>
                  )}
                  <p className="input-hint">
                    {watch('message')?.length || 0} / 1000 {t('contact.characters')}
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? t('contact.sending') : t('contact.sendBtn')}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  {t('contact.responseTime')}
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
            {t('contact.findUs')}
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
              title={t('contact.findUs')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;