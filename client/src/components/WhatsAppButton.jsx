import { FaWhatsapp } from 'react-icons/fa';
const WhatsAppButton = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    "Bonjour ! J'aimerais faire une réservation au restaurant Saveur de la Terre."
  );
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full 
                 shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 z-50
                 flex items-center justify-center group"
      aria-label="Contacter sur WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
      <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 
                     rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300">
        Réserver par WhatsApp
      </span>
    </a>
  );
};
export default WhatsAppButton;