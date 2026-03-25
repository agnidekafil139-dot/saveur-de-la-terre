import { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { t } = useTranslation();

  const categories = [
    { id: 'all', label: t('gallery.all') },
    { id: 'ambiance', label: t('gallery.ambiance') },
    { id: 'plats', label: t('gallery.dishes') },
    { id: 'equipe', label: t('gallery.team') },
    { id: 'evenements', label: t('gallery.events') },
  ];

  const images = [
    { id: 1, src: '/images/restaurant/salle-principale.jpeg', category: 'ambiance', alt: 'Salle principale' },
    { id: 2, src: '/images/restaurant/facade.jpeg', category: 'ambiance', alt: 'Façade du restaurant' },
    { id: 3, src: '/images/menu/viandes/costela.jpeg', category: 'plats', alt: 'Costela' },
    { id: 4, src: '/images/menu/viandes/escalope-parmigiana.jpeg', category: 'plats', alt: 'Escalope Parmigiana' },
    { id: 5, src: '/images/menu/volailles/frango-caipara.jpeg', category: 'plats', alt: 'Frango Caipara' },
    { id: 6, src: '/images/menu/desserts/pudim.jpeg', category: 'plats', alt: 'Pudim' },
    { id: 7, src: '/images/team/dona-maria.jpeg', category: 'equipe', alt: 'Dona Maria - Chef' },
    { id: 8, src: '/images/restaurant/salle-principale.jpeg', category: 'evenements', alt: 'Anniversaire' },
  ];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const goToPrevious = () => {
    const newIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            {t('gallery.title')}
          </h1>
          <p className="text-xl">
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      {/* FILTRES */}
      <section className="py-8 px-4 bg-white sticky top-20 z-40 shadow-md">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="py-12 px-4">
        <div className="container-custom">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => openLightbox(image, index)}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t('gallery.viewLarge')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">
                {t('gallery.noImages')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors"
          >
            <FaTimes />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors"
          >
            <FaChevronRight />
          </button>

          <div 
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg">
              {lightboxImage.alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;