# Plan de migration vers TanStack Start (rendu serveur)

Objectif : chaque URL publique (y compris un article publié à l'instant depuis l'admin) reçoit son vrai HTML complet dès la première requête. Plus de prérendu au build. Le design, les textes, les animations, notify-lead et les policies restent inchangés.

## 1. Étapes dans l'ordre et fichiers touchés

La migration se lance avec l'outil intégré (menu "/" puis "Migrate to TanStack Start"). Il commence par vérifier que le build actuel passe, puis enchaîne :

1. **Inventaire** (aucun fichier modifié) : routes de `src/routes.tsx`, les providers de `src/App.tsx`, le code d'init de `src/main.tsx` (fonts, préchargement des images du héro), les ajouts de `index.html` (Search Console, favicons, preload des polices, Plausible), le thème de `src/index.css` et `tailwind.config.ts`, les accès navigateur au niveau module.
2. **Socle** : `vite.config.ts`, `tsconfig.json`, `components.json`, `eslint.config.js` remplacés ; ajout de `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/lib/error-page.ts`, `src/lib/error-capture.ts`, `src/lib/lovable-error-reporting.ts`, `src/styles.css`.
3. **Thème** : toutes les variables (couleurs des pôles, classes glass, métriques de repli des polices, styles `.blog-scope`, galerie) reportées de `src/index.css` et `tailwind.config.ts` vers `src/styles.css` (passage Tailwind v4), puis balayage des classes renommées (`shadow-sm`, `rounded`, `outline-none`, `ring`).
4. **Dépendances** : `package.json` fusionné (React 19, TanStack Router/Start). Les scripts `prerender`, `generate-sitemap` et le build SSR sont retirés.
5. **Suppression des anciens points d'entrée** : `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`, `src/vite-env.d.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `tailwind.config.ts`, `postcss.config.js`, `vitest.config.ts`, `src/test/`, `src/entry-server.tsx`, `src/routes.tsx`, `scripts/prerender.ts`, `scripts/generate-sitemap.ts`, `public/sitemap.xml`.
6. **Routes** : création de `src/routes/` (un fichier par URL, voir tableau), `__root.tsx` (providers, en-tête HTML global, page d'erreur, page 404), `_site.tsx` (layout public : Header, Footer, transitions), `admin.tsx` (layout admin protégé par `AdminRoute`).
7. **Liens** : les imports `react-router-dom` (`Link`, `NavLink`, `useNavigate`, `useParams`, `useLocation`, `useOutlet`, `useSearchParams`) des pages et composants passent à TanStack Router ou à une petite couche de compatibilité. Touche notamment Header, MegaMenu, MobileDrawer, Footer, RootLayout, ScrollToTop, SEO, les pages et l'admin.
8. **SEO** : `react-helmet-async` remplacé par la fonction `head()` de chaque route (fichiers `src/components/seo/*` convertis en fonctions qui renvoient les balises).
9. **Blog serveur, sitemap, 404** (voir sections 3, 4 et 7).
10. **Vérifications** : build, types, puis requête réelle sur chaque URL pour contrôler statut HTTP et HTML.

## 2. URL et balises identiques

| URL actuelle | Fichier de route |
|---|---|
| `/` | `_site.index.tsx` |
| `/expertises`, `/contact`, `/partenaires`, `/mentions-legales`, `/politique-confidentialite` | `_site.<nom>.tsx` |
| `/pole/:slug` | `_site.pole.$slug.index.tsx` |
| `/pole/:slug/:subSlug` | `_site.pole.$slug.$subSlug.tsx` |
| `/blog`, `/blog/:slug` | `_site.blog.index.tsx`, `_site.blog.$slug.tsx` |
| `/admin/login`, `/admin`, `/admin/blog`, `/admin/blog/new`, `/admin/blog/:id/edit`, `/admin/profil` | `admin.*.tsx` |

- **Barre finale** : le routeur est réglé en `trailingSlash: "never"`, identique à aujourd'hui. Les canonicals restent sans barre finale (sauf `/`).
- **Titre, description, canonical, Open Graph, Twitter, robots, `lang="fr"`** : le composant `SEO` actuel devient un utilitaire `seoHead({ title, description, canonicalPath, ogImage, ogType, noindex, jsonLd })` qui produit exactement les mêmes balises et le même format de titre (suffixe " — Corse Drone" ajouté seulement s'il manque). Chaque route l'appelle dans `head()` avec les mêmes valeurs que ses props actuelles.
- **JSON-LD** : le même objet est émis en `<script type="application/ld+json">` via `head()` (LocalBusiness de l'accueil avec `CONTACT.phoneLink`, Article et BreadcrumbList du blog, FAQ si présente).
- **Balises globales** d'`index.html` (vérification Search Console, favicons, apple-touch-icon, preload Fraunces/Geist 600, script Plausible) reportées dans `__root.tsx`.
- **Contrôle automatique** : avant la bascule, un script capture pour chaque URL publique le `<head>` du site actuel publié ; après migration, la même capture sur la prévisualisation ; les deux sont comparées balise par balise.

## 3. Blog lu côté serveur

- Chaque route blog a un `loader` qui interroge la base avec la même requête qu'aujourd'hui (`blog_posts` + auteur + catégorie, `status = published`) et remplit le cache React Query (`ensureQueryData` avec les mêmes clés `["blog","posts","published"]`, `["blog","post",slug]`).
- Les hooks `useBlogPosts` et `useBlogPost` restent inchangés : côté navigateur ils trouvent les données déjà présentes, sans nouveau chargement ni saut de mise en page.
- `head()` de `/blog/$slug` utilise les données du loader : titre SEO, meta description, image de couverture en og:image, date, auteur, JSON-LD Article.
- Article inexistant ou non publié : le loader renvoie `notFound()`, donc un vrai 404.
- Lecture publique avec la clé anonyme uniquement, les policies actuelles s'appliquent comme aujourd'hui.

## 4. Sitemap et robots.txt

- Nouvelle route serveur `src/routes/sitemap[.]xml.ts` : liste les pages statiques (celles de `STATIC_ROUTES` actuel) plus tous les articles publiés lus en base à chaque requête, avec `lastmod` = date de mise à jour. En-tête `Content-Type: application/xml` et cache court (ex. 1 heure).
- `public/sitemap.xml` supprimé pour ne pas masquer la route.
- `public/robots.txt` conservé tel quel (il pointe déjà vers `https://corse-drone.com/sitemap.xml`).

## 5. Admin et authentification

Reste côté navigateur, sans changement de comportement :
- Connexion, session et rafraîchissement du jeton (client de la base existant, stockage local du navigateur).
- `AuthContext`, `AdminRoute`, `useAuth`, toutes les pages admin, l'éditeur, l'import, la galerie, les envois d'images.
- Brouillons locaux (`useDraftPersistence`), protections contre le rechargement au changement d'onglet.

Ce qui change :
- Les routes admin sont rendues sans contenu côté serveur (écran de chargement), puis l'app vérifie la session dans le navigateur comme aujourd'hui. Elles reçoivent `noindex`.
- `AuthProvider` ne lit plus la session pendant le rendu serveur, seulement une fois dans le navigateur.
- Aucune table, aucun rôle, aucune policy modifiés.

## 6. Code qui suppose un navigateur

| Élément | Risque au rendu serveur | Parade |
|---|---|---|
| Préchargement des images du héro (`main.tsx`, `document.createElement`) | plantage si exécuté au chargement du module | remplacé par des balises `<link rel="preload">` dans `head()` de l'accueil |
| Lenis (`SmoothScrollProvider`) | `window` absent | création dans un `useEffect` uniquement |
| `useScrollReveal` / IntersectionObserver | absent côté serveur | observateur créé dans `useEffect` ; contenu rendu visible dans le HTML serveur pour les robots (état initial masqué appliqué seulement une fois l'app démarrée, sans flash) |
| Plausible (`usePlausibleTracking`, `lib/analytics.ts`) | `window.plausible` absent | appels protégés par `typeof window !== "undefined"`, dans `useEffect` |
| Brouillons en stockage local | `localStorage` absent | lecture uniquement dans `useEffect` (pages admin non rendues côté serveur) |
| Carrousel du héro (timers, clavier) | minuteries et écouteurs côté serveur | démarrage dans `useEffect` ; premier slide rendu en statique |
| Compteurs (`useCountUp`, `AnimatedStatValue`) | `requestAnimationFrame` absent | valeur finale rendue côté serveur, animation au montage |
| `LaunchAlertPopup`, `useHeaderState`, `use-mobile`, `BackToTop`, `BlogTOC` | lecture de `window`/`sessionStorage` | déjà partiellement protégés ; revue systématique et protection en `useEffect` |
| Lightbox de la galerie | librairie navigateur | chargement dynamique au premier clic |

Le rendu serveur et le premier rendu navigateur doivent être identiques : aucune valeur aléatoire ni dépendante de la date ou de la taille d'écran dans le rendu initial.

## 7. Pages introuvables

- `notFoundComponent` de `__root.tsx` affiche la page `NotFound` actuelle (en français, avec Header et Footer), statut HTTP 404, `noindex`.
- S'applique aux URL inconnues, aux articles absents et aux pôles ou sous-pôles inexistants (`notFound()` dans le loader).

## 8. Coût, risques et limites

**Crédits (estimation, non garantie)** : la migration automatique elle-même, puis les ajustements spécifiques (SEO par route, blog serveur, sitemap, protections navigateur, report du thème). Ordre de grandeur : 1 message long pour la migration, puis 3 à 6 messages de corrections et vérifications. Le coût réel dépend du nombre d'erreurs de typage révélées par le passage en mode strict (le projet est aujourd'hui en mode souple) et des écarts visuels à corriger.

**Risques** :
- Écarts visuels après le passage à Tailwind v4 (couleurs de pôles, glass, ombres, arrondis).
- Vague d'erreurs de typage (mode strict obligatoire).
- Animations Framer Motion et Lenis : comportements légèrement différents au premier affichage.
- React 19 : quelques librairies (éditeur, lightbox, formulaires) peuvent demander une mise à jour.
- Plus de prérendu : chaque visite exécute un rendu serveur, dépendant de la disponibilité de la base pour le blog.

**Non garanti** :
- Délai de réindexation par Google et prise en compte immédiate du nouveau sitemap.
- Performance identique au site statique actuel sur tous les réseaux (le cache de l'hébergement limite l'écart).
- Absence totale de différence visuelle au pixel près sans vérification manuelle page par page.

## 9. Vérification et retour arrière

**Sur la prévisualisation, avant publication** :
1. Chaque URL publique renvoie 200, une URL inventée renvoie 404 avec la page française.
2. HTML brut (sans JavaScript) d'un article récent : titre, description, og:image, texte complet et JSON-LD présents.
3. `/sitemap.xml` liste les pages et tous les articles publiés, y compris un article publié juste avant le test ; `/robots.txt` inchangé.
4. Comparaison automatique du `<head>` actuel publié et de la prévisualisation, route par route.
5. Captures d'écran desktop et mobile de l'accueil, des 4 pôles, des sous-pôles, du blog et d'un article, comparées au site actuel.
6. Admin : connexion, création, import, brouillon local, publication, puis vérification que l'article apparaît aussitôt en rendu serveur et dans le sitemap.
7. Formulaire de contact : envoi réel avec une adresse valide, email reçu.

**Retour arrière** : tant que rien n'est publié, le site en ligne n'est pas affecté. Si besoin, restaurer depuis l'historique du chat la version d'avant le message de migration ; le code et le mode de publication reviennent tous deux à l'état actuel. Ne publier qu'après validation complète des points ci-dessus.

## Hypothèses retenues

- Pas de barre finale sur aucune URL (comportement actuel conservé).
- Les pages admin ne sont pas rendues côté serveur (inutile pour le référencement et plus sûr pour la session).
- Le sitemap est mis en cache 1 heure ; un article publié y apparaît au plus tard après ce délai.
