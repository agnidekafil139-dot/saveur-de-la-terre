import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import ReviewCard from '../components/ReviewCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useRestaurant } from '../context/RestaurantContext';
import reviewAPI from '../services/reviewAPI';

const Reviews = () => {
  const { reviews, reviewStats, loading, error, refreshData } = useRestaurant();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const rating = watch('rating', 5);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await reviewAPI.create(data);
      setSubmitSuccess(true);
      reset();
      setShowForm(false);
      refreshData();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      alert(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingLabels = {
    5: 'Excellent !',
    4: 'Très bien',
    3: 'Bien',
    2: 'Moyen',
    1: 'Décevant'
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={refreshData} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Avis de nos Clients
          </h1>
          <p className="text-xl">
            Ce que nos clients disent de nous
          </p>
        </div>
      </section>

      {/* STATS */}
      {reviewStats && (
        <section className="py-12 px-4 bg-white">
          <div className="container-custom max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Note moyenne */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Note moyenne
                </h3>
                <div className="text-6xl font-bold text-primary mb-3">
                  {reviewStats.averageRating ? reviewStats.averageRating.toFixed(1) : '0.0'}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-2xl ${
                        i < Math.round(reviewStats.averageRating || 0)
                          ? 'text-accent'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  {reviewStats.totalReviews || 0} avis
                </p>
              </div>

              {/* Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center md:text-left">
                  Distribution des notes
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviewStats.distribution?.[star] || 0;
                    const percentage = reviewStats.totalReviews > 0
                      ? (count / reviewStats.totalReviews) * 100
                      : 0;

                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-12 text-sm font-semibold text-gray-700">
                          {star} <FaStar className="inline text-accent text-xs" />
                        </span>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-12 text-sm text-gray-600 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bouton laisser avis */}
            <div className="text-center mt-8">
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  Laisser un avis
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FORMULAIRE AVIS */}
      {showForm && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="container-custom max-w-2xl">
            <div className="card">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Partagez votre expérience
              </h3>

              {submitSuccess && (
                <div className="alert-success mb-6">
                  <FaCheckCircle className="text-2xl" />
                  <div>
                    <p className="font-semibold">Merci pour votre avis !</p>
                    <p className="text-sm">
                      Votre avis sera publié après modération
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Nom */}
                <div className="mb-6">
                  <label className="input-label">Votre nom *</label>
                  <input
                    type="text"
                    {...register('customerName', {
                      required: 'Le nom est requis',
                      minLength: { value: 2, message: 'Minimum 2 caractères' }
                    })}
                    className={errors.customerName ? 'input-field-error' : 'input-field'}
                    placeholder="Ex: Maria Silva"
                  />
                  {errors.customerName && (
                    <p className="input-error">{errors.customerName.message}</p>
                  )}
                </div>

                {/* Note */}
                <div className="mb-6">
                  <label className="input-label">Votre note *</label>
                  <div className="flex items-center gap-4 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="cursor-pointer">
                        <input
                          type="radio"
                          value={star}
                          {...register('rating', { required: true })}
                          className="hidden"
                        />
                        <FaStar
                          className={`text-4xl transition-colors ${
                            star <= rating ? 'text-accent' : 'text-gray-300'
                          } hover:text-accent`}
                        />
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {ratingLabels[rating]}
                  </p>
                </div>

                {/* Commentaire */}
                <div className="mb-6">
                  <label className="input-label">Votre commentaire *</label>
                  <textarea
                    {...register('comment', {
                      required: 'Le commentaire est requis',
                      minLength: { value: 10, message: 'Minimum 10 caractères' },
                      maxLength: { value: 500, message: 'Maximum 500 caractères' }
                    })}
                    className={errors.comment ? 'input-field-error' : 'textarea-field'}
                    rows="5"
                    placeholder="Parlez-nous de votre expérience..."
                  />
                  {errors.comment && (
                    <p className="input-error">{errors.comment.message}</p>
                  )}
                  <p className="input-hint">
                    {watch('comment')?.length || 0} / 500 caractères
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-1"
                  >
                    {isSubmitting ? 'Envoi...' : 'Publier mon avis'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-outline"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* TOUS LES AVIS */}
      <section className="py-12 px-4">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Tous les avis
          </h2>

          {reviews && reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-4">
                Aucun avis pour le moment
              </p>
              <p className="text-gray-400 mb-8">
                Soyez le premier à partager votre expérience !
              </p>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  Laisser le premier avis
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reviews;