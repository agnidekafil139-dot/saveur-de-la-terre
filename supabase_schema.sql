-- ================================================
-- SUPABASE SCHEMA: Saveur de la Terre
-- Script idempotent (peut être relancé sans erreur)
-- ================================================

-- ============ NETTOYAGE ============
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============ MENU ITEMS ============
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('entrées', 'viandes', 'volailles', 'poissons', 'pâtes', 'desserts', 'boissons')),
  description VARCHAR(500) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  price_for_2 DECIMAL(10,2) CHECK (price_for_2 >= 0),
  image VARCHAR(500) DEFAULT '/images/placeholder.jpeg',
  allergens TEXT[] DEFAULT '{}',
  is_vegetarian BOOLEAN DEFAULT false,
  is_spicy BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
  preparation_time INTEGER DEFAULT 20 CHECK (preparation_time >= 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherche rapide
CREATE INDEX idx_menu_items_category ON menu_items(category, available);
CREATE INDEX idx_menu_items_favorite ON menu_items(is_favorite);

-- ============ REVIEWS ============
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment VARCHAR(500) NOT NULL,
  visit_date TIMESTAMPTZ DEFAULT now(),
  approved BOOLEAN DEFAULT true,
  helpful INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherche rapide
CREATE INDEX idx_reviews_approved ON reviews(approved, created_at DESC);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- ============ RESERVATIONS ============
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(5) NOT NULL,
  number_of_guests INTEGER NOT NULL CHECK (number_of_guests >= 1 AND number_of_guests <= 20),
  special_request VARCHAR(500),
  occasion VARCHAR(50) DEFAULT 'aucune' CHECK (occasion IN ('aucune', 'anniversaire', 'celebration', 'premiere_visite', 'autre')),
  status VARCHAR(20) DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'confirmée', 'annulée', 'terminée')),
  confirmation_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherche rapide
CREATE INDEX idx_reservations_date ON reservations(date, time);
CREATE INDEX idx_reservations_email ON reservations(email);
CREATE INDEX idx_reservations_status ON reservations(status);

-- ============ CONTACTS ============
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(50) NOT NULL CHECK (subject IN ('reservation', 'menu', 'evenement', 'suggestion', 'reclamation', 'carriere', 'autre')),
  message VARCHAR(1000) NOT NULL,
  status VARCHAR(20) DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'lu', 'repondu')),
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherche rapide
CREATE INDEX idx_contacts_status ON contacts(status, created_at DESC);
CREATE INDEX idx_contacts_email ON contacts(email);

-- ============ ROW LEVEL SECURITY (RLS) ============

-- Enable RLS on all tables
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- MENU: Everyone can read
CREATE POLICY "Menu items are viewable by everyone" ON menu_items
  FOR SELECT USING (true);

-- REVIEWS: Everyone can read approved reviews, everyone can insert
CREATE POLICY "Approved reviews are viewable by everyone" ON reviews
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can create a review" ON reviews
  FOR INSERT WITH CHECK (true);

-- RESERVATIONS: Anyone can insert (create reservation)
CREATE POLICY "Anyone can create a reservation" ON reservations
  FOR INSERT WITH CHECK (true);

-- Allow reading reservations for availability check
CREATE POLICY "Reservations readable for availability" ON reservations
  FOR SELECT USING (true);

-- CONTACTS: Anyone can insert (send message)
CREATE POLICY "Anyone can send a contact message" ON contacts
  FOR INSERT WITH CHECK (true);

-- ============ AUTO-UPDATE updated_at ============
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============ PERMISSIONS (pour que PostgREST puisse voir les tables) ============
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON menu_items TO anon, authenticated;
GRANT SELECT, INSERT ON reviews TO anon, authenticated;
GRANT SELECT, INSERT ON reservations TO anon, authenticated;
GRANT INSERT ON contacts TO anon, authenticated;

-- ============ SEED DATA ============

-- ─── ENTRÉES ───
INSERT INTO menu_items (name, category, description, price, price_for_2, image, allergens, is_vegetarian, is_spicy, is_favorite, available, preparation_time) VALUES
  ('Pastéis de Queijo', 'entrées', 'Pastéis croustillants farcis au fromage de Minas, servis avec salade de roquette et sauce citron vert', 18.00, 32.00, '/images/menu/entrees/pasteis-de-queijo.png', ARRAY['gluten', 'lait'], true, false, true, true, 15),
  ('Coxinha de Frango', 'entrées', 'Croquettes de poulet effiloché en forme de goutte, panées et frites, sauce chimichurri', 16.00, 28.00, '/images/menu/entrees/coxinha.png', ARRAY['gluten', 'œuf'], false, false, true, true, 15),
  ('Salade Tropicale', 'entrées', 'Mélange de feuilles fraîches, mangue, avocat, cœur de palmier et vinaigrette passion', 14.00, NULL, '/images/placeholder.jpeg', ARRAY[]::TEXT[], true, false, false, true, 10),
  ('Bolinho de Bacalhau', 'entrées', 'Beignets de morue traditionnels, croustillants à l''extérieur et fondants à l''intérieur', 19.00, 34.00, '/images/placeholder.jpeg', ARRAY['gluten', 'poisson', 'œuf'], false, false, false, true, 20);

-- ─── VIANDES ───
INSERT INTO menu_items (name, category, description, price, price_for_2, image, allergens, is_vegetarian, is_spicy, is_favorite, available, preparation_time) VALUES
  ('Escalope Parmigiana', 'viandes', 'Escalope panée, sauce tomate maison et fromage gratiné, frites et salade', 42.00, 78.00, '/images/menu/viandes/escalope-parmigiana.jpeg', ARRAY['gluten', 'lait', 'œuf'], false, false, true, true, 25),
  ('Côtes de Bœuf Confites', 'viandes', 'Côtes de bœuf confites 4h, riz, polenta frite et vinaigrette', 48.00, 88.00, '/images/menu/viandes/costela.jpeg', ARRAY[]::TEXT[], false, false, true, true, 35),
  ('Picanha sur Plancha', 'viandes', '300g picanha grillée, riz, haricots tropeiro, farofa', 58.00, NULL, '/images/placeholder.jpeg', ARRAY[]::TEXT[], false, false, false, true, 20),
  ('Feijoada Complète', 'viandes', 'Le plat national brésilien : haricots noirs mijotés avec viandes variées, riz, farofa, chou vert et orange', 44.00, 80.00, '/images/placeholder.jpeg', ARRAY[]::TEXT[], false, false, true, true, 40);

-- ─── VOLAILLES ───
INSERT INTO menu_items (name, category, description, price, price_for_2, image, allergens, is_vegetarian, is_spicy, is_favorite, available, preparation_time) VALUES
  ('Poulet Fermier', 'volailles', 'Poulet effiloché sauce maison, riz, pommes paille', 39.00, 72.00, '/images/menu/volailles/frango-caipira.jpeg', ARRAY['lait'], false, false, true, true, 25),
  ('Poulet Parmigiana', 'volailles', 'Poulet pané sauce tomate et fromage fondu, frites et salade', 38.00, NULL, '/images/placeholder.jpeg', ARRAY['gluten', 'lait', 'œuf'], false, false, false, true, 25);

-- ─── POISSONS ───
INSERT INTO menu_items (name, category, description, price, price_for_2, image, allergens, is_vegetarian, is_spicy, is_favorite, available, preparation_time) VALUES
  ('Saumon Grillé', 'poissons', 'Filet de saumon grillé, salsa de mangue, riz pilaf et légumes vapeur', 46.00, 84.00, '/images/menu/poissons/saumon-grille.png', ARRAY['poisson'], false, false, true, true, 25),
  ('Moqueca de Crevettes', 'poissons', 'Ragoût de crevettes au lait de coco, poivrons et coriandre, servi avec riz blanc', 52.00, 96.00, '/images/menu/poissons/moqueca-crevettes.png', ARRAY['crustacés', 'lait de coco'], false, true, true, true, 30),
  ('Tilapia à la Plancha', 'poissons', 'Filet de tilapia grillé, purée de manioc, sauce vierge aux herbes', 38.00, 70.00, '/images/placeholder.jpeg', ARRAY['poisson'], false, false, false, true, 20);

-- ─── PÂTES ───
INSERT INTO menu_items (name, category, description, price, price_for_2, image, allergens, is_vegetarian, is_spicy, is_favorite, available, preparation_time) VALUES
  ('Penne Bolognese', 'pâtes', 'Penne al dente avec sauce bolognaise maison, parmesan râpé et basilic frais', 34.00, 62.00, '/images/placeholder.jpeg', ARRAY['gluten', 'lait'], false, false, false, true, 20),
  ('Lasagne Maison', 'pâtes', 'Lasagne gratinée aux trois fromages, bœuf mijoté et béchamel', 38.00, NULL, '/images/placeholder.jpeg', ARRAY['gluten', 'lait', 'œuf'], false, false, true, true, 30),
  ('Spaghetti aux Fruits de Mer', 'pâtes', 'Spaghetti avec crevettes, moules et calamars, sauce tomate-safran', 44.00, 82.00, '/images/placeholder.jpeg', ARRAY['gluten', 'crustacés', 'mollusques'], false, false, false, true, 25);

-- ─── DESSERTS ───
INSERT INTO menu_items (name, category, description, price, price_for_2, image, allergens, is_vegetarian, is_spicy, is_favorite, available, preparation_time) VALUES
  ('Pudim', 'desserts', 'Flan brésilien au caramel onctueux, la recette de Dona Maria', 14.00, NULL, '/images/menu/desserts/pudim.jpeg', ARRAY['lait', 'œuf'], true, false, true, true, 10),
  ('Açaí Bowl', 'desserts', 'Bol d''açaí glacé avec granola, banane, fraises et noix de coco râpée', 16.00, NULL, '/images/menu/desserts/acai-bowl.png', ARRAY['fruits à coque'], true, false, true, true, 10),
  ('Tiramisu Brésilien', 'desserts', 'Tiramisu revisité au café brésilien, mascarpone et cacao amer', 15.00, NULL, '/images/menu/desserts/tiramisu.png', ARRAY['gluten', 'lait', 'œuf'], true, false, false, true, 10),
  ('Brigadeiro Gourmet', 'desserts', 'Assortiment de brigadeiros artisanaux : chocolat noir, pistache et noix de coco', 12.00, NULL, '/images/placeholder.jpeg', ARRAY['lait'], true, false, false, true, 5);

-- ─── BOISSONS ───
INSERT INTO menu_items (name, category, description, price, price_for_2, image, allergens, is_vegetarian, is_spicy, is_favorite, available, preparation_time) VALUES
  ('Caipirinha Classique', 'boissons', 'Cocktail brésilien : cachaça, citron vert, sucre et glace pilée', 12.00, NULL, '/images/placeholder.jpeg', ARRAY[]::TEXT[], true, false, true, true, 5),
  ('Jus de Fruits Frais', 'boissons', 'Jus pressé du jour : mangue, passion, goyave ou acérola', 8.00, NULL, '/images/placeholder.jpeg', ARRAY[]::TEXT[], true, false, false, true, 5),
  ('Guaraná Antarctica', 'boissons', 'Le soda brésilien iconique, servi bien frais', 5.00, NULL, '/images/placeholder.jpeg', ARRAY[]::TEXT[], true, false, false, true, 5),
  ('Café Brésilien', 'boissons', 'Espresso corsé de grains torréfiés du Minas Gerais', 4.00, NULL, '/images/placeholder.jpeg', ARRAY[]::TEXT[], true, false, false, true, 5),
  ('Água de Coco', 'boissons', 'Eau de coco naturelle, fraîche et désaltérante', 6.00, NULL, '/images/placeholder.jpeg', ARRAY[]::TEXT[], true, false, false, true, 5);

-- ─── REVIEWS ───
INSERT INTO reviews (customer_name, rating, comment, approved) VALUES
  ('Sophie Martin', 5, 'Cuisine exceptionnelle et service parfait ! La moqueca de crevettes est un délice.', true),
  ('Lucas Bernard', 4, 'Très bon restaurant, ambiance chaleureuse. Les côtes de bœuf confites sont incroyables.', true),
  ('Maria Silva', 5, 'Un vrai goût du Brésil à Paris ! Les pastéis sont aussi bons que ceux de São Paulo.', true),
  ('Jean-Pierre Dupont', 5, 'Meilleur restaurant brésilien de la région. La feijoada complète est authentique.', true),
  ('Ana Oliveira', 4, 'Très bonne cuisine, le poulet fermier est délicieux. Service attentionné.', true),
  ('Pierre Lefèvre', 5, 'Le pudim de Dona Maria est divin ! On se croirait au Brésil.', true),
  ('Isabelle Costa', 4, 'Belle découverte ! L''açaí bowl et le saumon grillé sont excellents.', true),
  ('Thomas Moreau', 5, 'Ambiance familiale et plats généreux. La caipirinha est parfaite !', true);

-- ============ RAFRAÎCHIR LE CACHE PostgREST ============
NOTIFY pgrst, 'reload schema';
