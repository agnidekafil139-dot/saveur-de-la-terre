import { FaStar, FaLeaf, FaFire } from 'react-icons/fa';
const MenuCard = ({ item }) => {
  return (
    <div className="card group">
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
          loading="lazy"
        />
        {item.is_favorite && (
          <div className="absolute top-2 right-2 bg-accent text-white px-3 py-1 
                        rounded-full text-xs font-semibold flex items-center gap-1">
            <FaStar /> Favoris
          </div>
        )}
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-danger text-white px-4 py-2 rounded-lg font-bold">
              Indisponible
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div>
        <h3 className="text-xl font-poppins font-bold text-primary mb-2 flex items-center gap-2">
          {item.name}
          {item.is_vegetarian && (
            <FaLeaf className="text-green-500 text-sm" title="Végétarien" />
          )}
          {item.is_spicy && (
            <FaFire className="text-red-500 text-sm" title="Épicé" />
          )}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        {item.allergens && item.allergens.length > 0 && (
          <p className="text-xs text-gray-500 italic mb-2">
            Allergènes : {item.allergens.join(', ')}
          </p>
        )}
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-2xl font-bold text-secondary">
              R$ {item.price.toFixed(2)}
            </span>
            {item.price_for_2 && (
              <span className="text-sm text-gray-500 ml-2">
                / R$ {item.price_for_2.toFixed(2)} (2p)
              </span>
            )}
          </div>
        </div>
        {item.preparation_time && (
          <p className="text-xs text-gray-500 mt-2">
            Temps de préparation : {item.preparation_time} min
          </p>
        )}
      </div>
    </div>
  );
};
export default MenuCard;