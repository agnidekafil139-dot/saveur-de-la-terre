import { FaHistory, FaTrophy, FaHeart, FaLeaf, FaUtensils, FaUsers, FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const OurStory = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section 
        className="relative h-96 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/hero/story-hero.jpg')",
          backgroundColor: '#2D5016'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-4">
              {t('ourStory.title')}
            </h1>
            <p className="text-xl md:text-2xl">
              {t('ourStory.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            {t('ourStory.howItStarted')}
          </h2>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              {t('ourStory.story1Text')}
            </p>
            
            <p>
              {t('ourStory.story2Text')}
            </p>
            
            <p>
              {t('ourStory.story3Text')}
            </p>
          </div>

          <div className="mt-12 p-8 bg-primary/5 rounded-xl border-l-4 border-primary">
            <p className="text-xl font-poppins font-semibold text-primary italic text-center">
              "{t('ourStory.mainQuote')}"
            </p>
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('ourStory.journeyTitle')}</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* 2019 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">2019</span>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <FaHistory className="text-white text-xl" />
                </div>
                <div className="flex-1 card">
                  <h3 className="text-xl font-bold mb-2">{t('ourStory.year2019')}</h3>
                  <p className="text-gray-600">
                    {t('ourStory.year2019Desc')}
                  </p>
                </div>
              </div>

              {/* 2020 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">2020</span>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <div className="flex-1 card">
                  <h3 className="text-xl font-bold mb-2">{t('ourStory.year2020')}</h3>
                  <p className="text-gray-600">
                    {t('ourStory.year2020Desc')}
                  </p>
                </div>
              </div>

              {/* 2022 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">2022</span>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <FaTrophy className="text-white text-xl" />
                </div>
                <div className="flex-1 card">
                  <h3 className="text-xl font-bold mb-2">{t('ourStory.year2022')}</h3>
                  <p className="text-gray-600">
                    {t('ourStory.year2022Desc')}
                  </p>
                </div>
              </div>

              {/* 2023 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">2023</span>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-success rounded-full flex items-center justify-center">
                  <FaStar className="text-white text-xl" />
                </div>
                <div className="flex-1 card">
                  <h3 className="text-xl font-bold mb-2">{t('ourStory.year2023')}</h3>
                  <p className="text-gray-600">
                    {t('ourStory.year2023Desc')}
                  </p>
                </div>
              </div>

              {/* 2025 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">2025</span>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <FaHeart className="text-white text-xl" />
                </div>
                <div className="flex-1 card">
                  <h3 className="text-xl font-bold mb-2">{t('ourStory.year2025')}</h3>
                  <p className="text-gray-600">
                    {t('ourStory.year2025Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom">
          <h2 className="section-title">{t('ourStory.valuesTitle')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{t('ourStory.authenticity')}</h3>
              <p className="text-gray-600">
                {t('ourStory.authenticityDesc')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">{t('ourStory.family')}</h3>
              <p className="text-gray-600">
                {t('ourStory.familyDesc')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-accent">{t('ourStory.quality')}</h3>
              <p className="text-gray-600">
                {t('ourStory.qualityDesc')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl text-success" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-success">{t('ourStory.tradition')}</h3>
              <p className="text-gray-600">
                {t('ourStory.traditionDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('ourStory.awardsTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="card text-center">
              <FaTrophy className="text-5xl text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('ourStory.bestRestaurant')}</h3>
              <p className="text-gray-600">{t('ourStory.restaurantAssoc')}</p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-3xl text-accent" />
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2">{t('ourStory.stars')}</h3>
              <p className="text-gray-600">{t('ourStory.googleReviews')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;