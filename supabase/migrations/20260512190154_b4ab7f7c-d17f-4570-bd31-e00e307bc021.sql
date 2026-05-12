
-- ============ ROLES ============
CREATE TYPE app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- ============ AUTHORS ============
CREATE TABLE public.blog_authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  initials TEXT NOT NULL CHECK (char_length(initials) BETWEEN 1 AND 3),
  bio TEXT,
  avatar_url TEXT,
  gradient_from TEXT NOT NULL DEFAULT '#5082AC',
  gradient_to TEXT NOT NULL DEFAULT '#3F6A8E',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============ CATEGORIES ============
CREATE TABLE public.blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============ POSTS ============
CREATE TYPE blog_post_status AS ENUM ('draft', 'published');

CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content_md TEXT NOT NULL,
  cover_image_url TEXT,
  hero_image_url TEXT,
  author_id UUID REFERENCES public.blog_authors(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  status blog_post_status NOT NULL DEFAULT 'draft',
  featured_on_home BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  reading_time_minutes INT NOT NULL DEFAULT 5,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============ INDEXES ============
CREATE INDEX blog_posts_status_idx ON public.blog_posts(status);
CREATE INDEX blog_posts_category_id_idx ON public.blog_posts(category_id);
CREATE INDEX blog_posts_author_id_idx ON public.blog_posts(author_id);
CREATE INDEX blog_posts_published_at_idx ON public.blog_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX blog_posts_featured_home_idx ON public.blog_posts(featured_on_home) WHERE featured_on_home = true;

-- ============ TRIGGER FUNCTIONS ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER blog_authors_updated_at BEFORE UPDATE ON public.blog_authors
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER blog_categories_updated_at BEFORE UPDATE ON public.blog_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.calculate_reading_time(content TEXT)
RETURNS INT LANGUAGE plpgsql IMMUTABLE SET search_path = public AS $$
DECLARE word_count INT;
BEGIN
  word_count := array_length(regexp_split_to_array(trim(content), '\s+'), 1);
  RETURN GREATEST(1, CEIL(word_count::numeric / 200));
END;
$$;

CREATE OR REPLACE FUNCTION public.set_reading_time()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.reading_time_minutes = public.calculate_reading_time(NEW.content_md);
  RETURN NEW;
END;
$$;

CREATE TRIGGER blog_posts_set_reading_time BEFORE INSERT OR UPDATE OF content_md ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_reading_time();

CREATE OR REPLACE FUNCTION public.enforce_single_home_featured()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.featured_on_home = TRUE THEN
    UPDATE public.blog_posts SET featured_on_home = FALSE
      WHERE id != NEW.id AND featured_on_home = TRUE;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER blog_posts_single_home_featured AFTER INSERT OR UPDATE OF featured_on_home ON public.blog_posts
  FOR EACH ROW WHEN (NEW.featured_on_home = TRUE)
  EXECUTE FUNCTION public.enforce_single_home_featured();

CREATE OR REPLACE FUNCTION public.set_published_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status IS DISTINCT FROM 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER blog_posts_set_published_at BEFORE UPDATE OF status ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_published_at();

-- ============ RLS ============
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admins read all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "public read authors" ON public.blog_authors
  FOR SELECT USING (true);
CREATE POLICY "admins manage authors" ON public.blog_authors
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "public read categories" ON public.blog_categories
  FOR SELECT USING (true);
CREATE POLICY "admins manage categories" ON public.blog_categories
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "public read published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');
CREATE POLICY "admins read all posts" ON public.blog_posts
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage posts" ON public.blog_posts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ STORAGE ============
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public read blog-covers" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-covers');
CREATE POLICY "admins insert blog-covers" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update blog-covers" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete blog-covers" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));

-- ============ SEED: AUTHORS ============
INSERT INTO public.blog_authors (name, role, initials, bio, gradient_from, gradient_to, sort_order) VALUES
('Pierre-François Morganti', 'Fondateur & pilote drone', 'PF',
 'Pilote drone certifié DGAC depuis 2019, je dirige Corse Drone depuis Bastia. Spécialiste en photogrammétrie, thermographie aérienne et inspections d''ouvrages. J''écris ici sur nos retours de terrain et les bonnes pratiques du métier.',
 '#5082AC', '#3F6A8E', 1),
('Logan Gaspard', 'Développeur', 'LG',
 'Développeur web et passionné de drones, j''accompagne Corse Drone sur la partie data, automatisation et restitution des missions photogrammétriques.',
 '#16A34A', '#15803D', 2),
('Joan Cacciari', 'Développeur', 'JC',
 'Développeur web et accompagnant terrain, je participe aux missions de captation et au traitement des livrables côté outils internes.',
 '#8B5CF6', '#7C3AED', 3);

-- ============ SEED: CATEGORIES ============
INSERT INTO public.blog_categories (slug, name, color, description, sort_order) VALUES
('nettoyage', 'Nettoyage', '#5082AC', 'Toitures, façades, panneaux solaires.', 1),
('diagnostic', 'Diagnostic', '#14B8A6', 'Inspections visuelles et thermiques.', 2),
('agriculture', 'Agriculture', '#16A34A', 'Imagerie multispectrale, suivi de cultures.', 3),
('transport', 'Transport', '#F59E0B', 'Portage et logistique par drone.', 4),
('cas-clients', 'Cas clients', '#8B5CF6', 'Retours de chantiers concrets.', 5),
('actualites-drone', 'Actualités drone', '#DC2626', 'Réglementation, technologies, secteur.', 6),
('actualites-boite', 'Actualités Corse Drone', '#475569', 'La vie de l''entreprise.', 7);

-- ============ SEED: POSTS ============
INSERT INTO public.blog_posts (slug, title, excerpt, content_md, cover_image_url, author_id, category_id, status, featured_on_home, published_at) VALUES
(
  'releve-thermique-ajaccio-3000m2',
  'Relevé thermique sur 3000 m² à Ajaccio : ce que les images ont révélé',
  'Mission terrain pour un syndic de copropriété : cartographier les déperditions thermiques d''un ensemble résidentiel avant rénovation énergétique. Méthodologie, résultats et chiffrage des travaux à prévoir.',
  $md$Mission terrain pour un syndic de copropriété ajaccien : cartographier les déperditions thermiques d'un ensemble résidentiel de 3000 m² avant rénovation énergétique.

## Contexte

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula, sapien quis tincidunt vehicula, magna ipsum tincidunt nisi, sit amet ultricies justo lorem ut massa. Suspendisse potenti.

## Méthodologie

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. **Donec rhoncus** placerat felis, vitae bibendum justo placerat sit amet.

- Premier point clé de la démarche
- Deuxième point sur l'équipement utilisé
- Troisième point sur la restitution

## Résultats

Vivamus vehicula, lectus a feugiat malesuada, lorem leo viverra dui, eu bibendum velit massa eget tortor. Nulla facilisi.

## En conclusion

Si ce sujet vous concerne, [contactez-nous](/contact) pour étudier votre besoin précisément.
$md$,
  'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=900&fit=crop&q=80',
  (SELECT id FROM public.blog_authors WHERE initials = 'PF'),
  (SELECT id FROM public.blog_categories WHERE slug = 'cas-clients'),
  'published', TRUE, '2026-05-08T00:00:00Z'
),
(
  'diagnostic-toiture-drone-bastia',
  'Diagnostic de toiture par drone à Bastia : retour d''expérience',
  'Un immeuble de 6 étages, des tuiles centenaires, et la nécessité de cartographier l''état du toit sans monter dessus. Voici comment on a procédé.',
  $md$Quand le syndic de la résidence des Orangers à Bastia nous a contactés en mars, le problème était classique : une fuite récurrente sur les combles d'un immeuble haussmannien de 6 étages, et personne ne savait exactement d'où elle venait. Le couvreur avait fait une première intervention l'année précédente, mais le problème était revenu après les premières pluies d'automne.

L'idée d'envoyer un drone faire une cartographie complète de la toiture est venue après deux devis de nacelle à plus de 4 800 euros, juste pour aller jeter un œil.

## Le contexte de la mission

La toiture en question fait environ 480 m². Tuiles canal traditionnelles, exposées plein sud-ouest, donc particulièrement battues par les vents marins et les averses méditerranéennes. L'immeuble est dans un secteur historique de Bastia, donc impossible de monter un échafaudage sans autorisation longue et coûteuse.

Notre brief tenait en trois lignes : **identifier l'origine de la fuite**, **cartographier l'état général**, et **fournir au syndic un document exploitable** pour demander des devis précis à plusieurs couvreurs.

## Préparation du vol

Avant chaque mission de diagnostic toiture, on fait trois choses : une étude de site, une vérification réglementaire (zone, hauteurs, riverains), et une checklist équipement. C'est le triptyque qui fait la différence entre une mission propre et une mission ratée.

### Équipement utilisé

- **DJI Mavic 3 Enterprise** avec capteur 4/3 CMOS pour les vues détaillées
- Caméra thermique **H20T** pour repérer les ponts thermiques et les zones d'infiltration
- Tablette terrain avec DJI Pilot 2, missions planifiées la veille
- Backup batteries (6 au total pour cette mission)

<figure>
  <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=750&fit=crop&q=85" alt="Drone DJI prêt au décollage sur le toit terrasse" />
  <figcaption>Mise en route du Mavic 3 Enterprise depuis la terrasse de l'immeuble voisin. Le décollage en hauteur évite les zones de turbulence en bas du bâtiment.</figcaption>
</figure>

<div class="callout">
  <div class="callout__icon">i</div>
  <p>L'imagerie thermique est souvent l'élément décisif pour les diagnostics de toiture. Une infiltration invisible à l'œil nu apparaît clairement comme une zone froide sur un cliché infrarouge pris en fin d'après-midi.</p>
</div>

### Fenêtre météo

On a attendu une journée sèche après 48h sans pluie, pour avoir un contraste thermique maximal entre les zones saines (sèches, donc plus chaudes au soleil) et les zones humides (refroidies par évaporation). C'est un détail qui semble anodin mais qui change tout : voler par temps gris ou juste après une averse divise par trois la lisibilité des résultats.

## Le déroulé du vol

43 minutes de vol total, répartis sur deux batteries. Première passe en orthophotographie à 40 m de hauteur, avec 80% de recouvrement frontal et 70% latéral pour permettre la reconstitution photogrammétrique. Deuxième passe à 15 m pour les détails fins.

La caméra thermique a tourné en parallèle. Au total, **312 photos visibles et 187 thermiques** ont été remontées au bureau pour traitement.

<figure class="wide">
  <img src="https://images.unsplash.com/photo-1444858345-8c2c2c0fbafd?w=1600&h=900&fit=crop&q=85" alt="Vue aérienne d'une toiture en tuiles canal à Bastia" />
  <figcaption>Vue d'ensemble obtenue après orthorectification des 312 clichés visibles. Résolution finale : 1,2 cm par pixel au sol.</figcaption>
</figure>

> Le drone ne remplace pas le couvreur. Mais il transforme radicalement la façon dont on prépare son intervention : précision, sécurité, et économie.
> <cite>— Note interne après mission</cite>

## L'analyse des images

De retour au bureau, traitement dans Pix4Dmapper pour la photogrammétrie (modèle 3D de la toiture), puis exploration manuelle des images thermiques sur DJI Thermal Analysis Tool.

<div class="image-grid">
  <figure>
    <img src="https://images.unsplash.com/photo-1572985788098-7e58c2683043?w=800&h=600&fit=crop&q=85" alt="Vue visible de la noue nord-ouest" />
    <figcaption>Vue visible · noue nord-ouest</figcaption>
  </figure>
  <figure>
    <img src="https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c1?w=800&h=600&fit=crop&q=85" alt="Vue thermique de la même zone montrant l'infiltration" />
    <figcaption>Vue thermique · zone froide visible</figcaption>
  </figure>
</div>

Deux découvertes principales :

1. Une **zone d'infiltration franche** au niveau du noue nord-ouest, là où deux pans de toit se rejoignent. La signature thermique était sans ambiguïté : 4°C de moins que les zones adjacentes, sur un rayon d'environ 1,2 m.
2. Une **quinzaine de tuiles déplacées ou fissurées** ailleurs, sans infiltration active immédiate mais à surveiller. Plusieurs étaient invisibles à l'œil nu depuis la rue.

## Ce que ça a permis d'éviter

Avec le rapport en main (40 pages avec orthophoto, modèle 3D, vues thermiques annotées), le syndic a pu demander trois devis ciblés. Résultat : intervention finale à 2 100 €, contre les 4 800 € initialement estimés pour une simple visite en nacelle.

Et surtout, l'intervention du couvreur a duré une demi-journée au lieu des deux jours qui auraient été nécessaires avec une inspection à l'aveugle. Les tuiles à risque ont aussi été remplacées dans la foulée, ce qui évite probablement une autre fuite dans les 12 prochains mois.

## Pour conclure

Ce genre de mission, c'est ce qu'on aime faire. Un problème concret, une méthodologie qui marche, des chiffres qui parlent au client. Si vous gérez un syndic, une copropriété ou un patrimoine immobilier en Corse, n'hésitez pas à [nous contacter](/contact) avant de commander une nacelle. Dans 80% des cas, on apporte une réponse plus précise pour moins cher.
$md$,
  'https://images.unsplash.com/photo-1572985788098-7e58c2683043?w=1600&h=900&fit=crop&q=85',
  (SELECT id FROM public.blog_authors WHERE initials = 'PF'),
  (SELECT id FROM public.blog_categories WHERE slug = 'diagnostic'),
  'published', FALSE, '2026-05-05T00:00:00Z'
),
(
  'inspection-panneaux-solaires-hiver',
  'Pourquoi inspecter ses panneaux solaires en hiver',
  'Contraste thermique optimal, points chauds visibles, micro-fissures détectables : l''hiver est le bon moment pour un audit complet de votre installation.',
  $md$L'hiver offre des conditions idéales pour réaliser un audit thermique complet d'une installation photovoltaïque.

## Contexte

Le froid amplifie le contraste entre les cellules saines et les cellules défaillantes, rendant les points chauds bien plus lisibles à la caméra thermique. C'est aussi une période creuse côté production, donc l'idéal pour intervenir sans pénaliser le rendement.

## Méthodologie

On combine une passe visible haute résolution et une passe thermique à 25 m d'altitude. **Chaque module** est analysé individuellement pour repérer les anomalies.

- Cartographie complète de la centrale
- Détection des points chauds (hot spots)
- Repérage des micro-fissures et défauts de connexion

## Résultats

Sur une installation de 800 panneaux, on identifie en moyenne 3 à 5% de modules sous-performants. Le ROI d'un remplacement ciblé est généralement atteint en moins d'un an.

## En conclusion

Si ce sujet vous concerne, [contactez-nous](/contact) pour étudier votre besoin précisément.
$md$,
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop&q=80',
  (SELECT id FROM public.blog_authors WHERE initials = 'LG'),
  (SELECT id FROM public.blog_categories WHERE slug = 'diagnostic'),
  'published', FALSE, '2026-05-01T00:00:00Z'
),
(
  'nettoyage-facades-hauteur-methodes',
  'Nettoyage de façades en hauteur : nos méthodes éprouvées',
  'Pression, dosage, sécurité : tour d''horizon des techniques que l''on applique sur les façades inaccessibles depuis l''échafaudage.',
  $md$Pression, dosage des produits, sécurisation du périmètre : retour sur les méthodes que l'on applique en façade depuis quatre ans.

## Contexte

Les façades en hauteur posent toujours les mêmes défis : accessibilité, sécurité des passants, protection du bâti. Le drone change la donne sur les trois plans.

## Méthodologie

On adapte la pression et le produit à la nature du support : pierre, crépi, métal. **Toujours** un test sur 1 m² avant la passe complète.

- Étude préalable du support et des polluants
- Choix du produit (biocide, désincrustant, neutre)
- Périmètre de sécurité au sol

## Résultats

Une façade R+5 traitée en une journée, là où l'échafaudage demanderait 5 à 7 jours. Pas d'arrêt de circulation, pas de gêne pour les occupants.

## En conclusion

Si ce sujet vous concerne, [contactez-nous](/contact) pour étudier votre besoin précisément.
$md$,
  'https://images.unsplash.com/photo-1597008641621-cefdcf718025?w=800&h=450&fit=crop&q=80',
  (SELECT id FROM public.blog_authors WHERE initials = 'PF'),
  (SELECT id FROM public.blog_categories WHERE slug = 'nettoyage'),
  'published', FALSE, '2026-04-27T00:00:00Z'
),
(
  'reglementation-drone-2026-pros',
  'Nouvelle réglementation drone 2026 : ce qui change pour les pros',
  'Mise à jour des catégories Open et Specific, élargissement des scénarios standards STS, nouvelles obligations d''enregistrement : on fait le point.',
  $md$La nouvelle réglementation drone 2026 redessine les catégories Open et Specific et élargit les scénarios STS.

## Contexte

L'AESA a publié fin 2025 une mise à jour majeure du cadre réglementaire européen, transposée en France début 2026. Pour les pros, plusieurs changements concrets entrent en vigueur.

## Méthodologie

On a passé en revue les nouveaux textes et identifié les points qui touchent directement les missions terrain.

- Évolution des catégories Open / Specific
- Nouveaux scénarios STS-03 et STS-04
- Obligations d'enregistrement renforcées

## Résultats

Pour la majorité de nos missions, l'impact reste mesuré. En revanche, les opérations en zone urbaine dense bénéficient d'un cadre plus clair.

## En conclusion

Si ce sujet vous concerne, [contactez-nous](/contact) pour étudier votre besoin précisément.
$md$,
  'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=450&fit=crop&q=80',
  (SELECT id FROM public.blog_authors WHERE initials = 'JC'),
  (SELECT id FROM public.blog_categories WHERE slug = 'actualites-drone'),
  'published', FALSE, '2026-04-22T00:00:00Z'
),
(
  'dji-matrice-400-investissement',
  'On a investi dans le DJI Matrice 400 : ce que ça change pour vos missions',
  'Capacité de charge multipliée par deux, autonomie de 59 minutes, précision RTK : présentation de notre nouveau bras armé en photogrammétrie.',
  $md$Le DJI Matrice 400 rejoint notre flotte. Présentation de ses capacités et de ce que cela ouvre comme nouveaux scénarios de mission.

## Contexte

Après quatre ans sur Mavic 3 Enterprise et Matrice 30T, on franchit un cap avec le Matrice 400. L'investissement est conséquent, mais les nouvelles missions accessibles le justifient.

## Méthodologie

On a testé l'appareil pendant six semaines avant la mise en production, sur des missions de photogrammétrie large échelle et de portage.

- 59 minutes d'autonomie en vol
- 6 kg de charge utile
- Précision RTK centimétrique

## Résultats

Sur une mission type de cartographie de 50 hectares, on passe de 4 vols à 1 seul. Gain de temps, gain de fiabilité.

## En conclusion

Si ce sujet vous concerne, [contactez-nous](/contact) pour étudier votre besoin précisément.
$md$,
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=450&fit=crop&q=80',
  (SELECT id FROM public.blog_authors WHERE initials = 'PF'),
  (SELECT id FROM public.blog_categories WHERE slug = 'actualites-boite'),
  'published', FALSE, '2026-04-18T00:00:00Z'
),
(
  'analyse-multispectrale-vignes-14ha',
  'Analyse multispectrale de vignes : suivi de vigueur sur 14 hectares',
  'Capteurs NDVI, NDRE et red edge embarqués : comment on aide les vignerons corses à anticiper les zones de stress hydrique avant qu''elles ne soient visibles à l''œil nu.',
  $md$Suivi de vigueur sur 14 hectares de vignes en Balagne avec capteurs NDVI, NDRE et red edge.

## Contexte

Le domaine viticole nous a contactés en début de saison pour mettre en place un suivi régulier de l'état hydrique et sanitaire des parcelles, sur l'ensemble du cycle végétatif.

## Méthodologie

Trois passages dans la saison, à des stades phénologiques clés. **Capteur multispectral** MicaSense RedEdge-P pour la précision.

- Indices NDVI, NDRE, GNDVI
- Cartographie de vigueur parcelle par parcelle
- Détection précoce des zones de stress

## Résultats

Identification de deux zones de stress hydrique 3 semaines avant que ce soit visible au sol. Adaptation de l'irrigation localisée, économie d'eau de l'ordre de 15%.

## En conclusion

Si ce sujet vous concerne, [contactez-nous](/contact) pour étudier votre besoin précisément.
$md$,
  'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=450&fit=crop&q=80',
  (SELECT id FROM public.blog_authors WHERE initials = 'LG'),
  (SELECT id FROM public.blog_categories WHERE slug = 'agriculture'),
  'published', FALSE, '2026-04-14T00:00:00Z'
),
(
  'transport-materiel-cap-corse',
  'Transport de matériel en zone montagneuse : retours du Cap Corse',
  'Trois missions de portage drone sur des refuges isolés. Météo capricieuse, charge utile à optimiser, planification millimétrée : les leçons retenues.',
  $md$Trois missions de portage drone en moyenne montagne sur le Cap Corse, dans des conditions météo serrées.

## Contexte

Approvisionnement de refuges isolés en matériel technique, dans des zones où l'hélicoptère est trop coûteux et le portage humain trop lent.

## Méthodologie

On a planifié chaque mission à partir de relevés météo détaillés, avec des fenêtres de vol courtes mais sûres.

- Charge utile optimisée à 4 kg
- Vols en visuel direct, distances < 1 km
- Backup au sol pour chaque mission

## Résultats

Trois missions menées à bien sans incident. Économie estimée pour le client : 60% par rapport à l'hélicoptère, 80% de gain de temps par rapport au portage humain.

## En conclusion

Si ce sujet vous concerne, [contactez-nous](/contact) pour étudier votre besoin précisément.
$md$,
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop&q=80',
  (SELECT id FROM public.blog_authors WHERE initials = 'JC'),
  (SELECT id FROM public.blog_categories WHERE slug = 'transport'),
  'published', FALSE, '2026-04-09T00:00:00Z'
);
