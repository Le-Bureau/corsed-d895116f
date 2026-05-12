## Objectif

Permettre, sur mobile et tablette, de changer de pôle dans le hero d'accueil par un geste de swipe horizontal (gauche → pôle suivant, droite → pôle précédent), en complément des boutons et de la pagination déjà présents.

## Approche

Ajouter un gestionnaire de gestes tactiles directement sur le conteneur racine de `HeroCarousel`, sans toucher au reste du carrousel (titres, animations, fond, contenu). On réutilise les fonctions `goToNext` / `goToPrev` déjà exposées par `useHeroCarousel`.

Choix technique : utiliser les `pointer events` natifs (`onPointerDown` / `onPointerMove` / `onPointerUp`) plutôt que d'ajouter une lib. Avantages :
- pas de nouvelle dépendance
- couvre touch + stylet
- compatible avec les boutons internes (les CTA stoppent la propagation naturellement car le geste se mesure au pointerup global du conteneur, et un seuil de distance évite les faux positifs sur un tap).

## Détails d'implémentation

Fichier modifié : `src/components/sections/HeroCarousel.tsx`

1. Ajouter un `useRef` pour stocker `{ startX, startY, startTime, active }` du geste en cours.
2. Sur `onPointerDown` : enregistrer la position et marquer le geste actif. Ignorer si le pointer type est `mouse` (le swipe ne concerne que touch/pen) pour ne pas perturber l'UX desktop.
3. Sur `onPointerMove` : si `Math.abs(deltaY) > Math.abs(deltaX)` et que deltaY dépasse un petit seuil, annuler le geste (l'utilisateur scrolle verticalement).
4. Sur `onPointerUp` / `onPointerCancel` :
   - si `|deltaX| >= 50px` ET `|deltaX| > |deltaY|` ET durée < 600ms → déclencher `goToNext()` (swipe vers la gauche, deltaX < 0) ou `goToPrev()` (swipe vers la droite, deltaX > 0).
   - sinon : ne rien faire (c'est un tap ou un mouvement non concluant).
5. Ne PAS ajouter `touch-action: none` sur le conteneur — on garde le scroll vertical natif. Le filtrage logique deltaY>deltaX suffit.
6. Aucune modification visuelle, aucune modification du hook `useHeroCarousel`, aucun impact desktop.

## Hors scope

- Pas d'animation de "drag" suivant le doigt en temps réel (le carrousel a une orchestration complexe titre+fond+contenu+stat ; un drag interactif demanderait un refacto important). Le swipe déclenche directement la transition existante, identique à un clic sur les flèches.
- Pas de changement sur les boutons, la pagination, ou la barre de progression.
