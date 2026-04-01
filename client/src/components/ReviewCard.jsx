import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-accent' : 'text-gray-300'}
      />
    ));
  };
  return (
    <div className="card">
      <div className="flex items-center gap-4 mb-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center 
                      justify-center font-bold text-xl flex-shrink-0">
          {review.customer_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-poppins font-semibold text-gray-900">
            {review.customer_name}
          </h4>
          <p className="text-sm text-gray-500">
            {format(new Date(review.visit_date || review.created_at), 'MMMM yyyy', { locale: fr })}
          </p>
        </div>
      </div>
      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {renderStars(review.rating)}
      </div>
      {/* Comment */}
      <p className="text-gray-700 leading-relaxed">
        "{review.comment}"
      </p>
    </div>
  );
};
export default ReviewCard;