import { FaHistory, FaTrophy, FaHeart, FaLeaf, FaUtensils, FaUsers, FaStar } from 'react-icons/fa';

const OurStory = () => {
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
              Notre Histoire
            </h1>
            <p className="text-xl md:text-2xl">
              Une passion familiale devenue tradition
            </p>
          </div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Comment tout a commencé
          </h2>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              L'histoire de <span className="font-semibold text-primary">Saveur de la Terre</span> commence 
              bien avant 2019. Pendant plus de 25 ans, Dona Maria Helena Silva a préparé des déjeuners 
              dans sa propre maison pour amis et famille.
            </p>
            
            <p>
              Un jour, son fils Carlos lui a suggéré : <em className="text-primary">"Maman, pourquoi ne pas 
              partager ton talent avec toute la ville ?"</em> L'idée a fait son chemin, et en 2019, 
              Saveur de la Terre a ouvert ses portes.
            </p>
            
            <p>
              Ce qui a commencé comme un petit restaurant avec seulement 8 tables s'est transformé 
              en <span className="font-semibold">lieu de rencontre préféré des familles de Cruzeiro do Oeste</span>.
            </p>
          </div>

          <div className="mt-12 p-8 bg-primary/5 rounded-xl border-l-4 border-primary">
            <p className="text-xl font-poppins font-semibold text-primary italic text-center">
              "De la vraie cuisine, faite avec amour, pour que vous vous sentiez comme à la maison"
            </p>
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Notre Parcours</h2>
          
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
                  <h3 className="text-xl font-bold mb-2">Les Débuts</h3>
                  <p className="text-gray-600">
                    Ouverture du restaurant avec 8 tables et un grand rêve
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
                  <h3 className="text-xl font-bold mb-2">Croissance</h3>
                  <p className="text-gray-600">
                    Agrandissement à 20 tables face au succès
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
                  <h3 className="text-xl font-bold mb-2">Reconnaissance</h3>
                  <p className="text-gray-600">
                    Prix du Meilleur Restaurant Familial de la région
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
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-gray-600">
                    Certificat d'Excellence TripAdvisor
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
                  <h3 className="text-xl font-bold mb-2">Aujourd'hui</h3>
                  <p className="text-gray-600">
                    200+ clients satisfaits chaque jour
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
          <h2 className="section-title">Nos Valeurs</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">Authenticité</h3>
              <p className="text-gray-600">
                Recettes traditionnelles, 0% congelé, 100% fait maison
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">Famille</h3>
              <p className="text-gray-600">
                Ambiance chaleureuse où tous sont les bienvenus
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-accent">Qualité</h3>
              <p className="text-gray-600">
                Ingrédients frais et locaux sélectionnés quotidiennement
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl text-success" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-success">Tradition</h3>
              <p className="text-gray-600">
                Respect des saveurs brésiliennes authentiques
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Reconnaissances & Prix</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="card text-center">
              <FaTrophy className="text-5xl text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Meilleur Restaurant Familial 2023</h3>
              <p className="text-gray-600">Association des Restaurateurs</p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-3xl text-accent" />
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2">4.8/5 étoiles</h3>
              <p className="text-gray-600">Google Reviews (200+ avis)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;