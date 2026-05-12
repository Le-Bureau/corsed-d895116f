## Objectif

Remplacer la barre d'onglets horizontale (scroll sur mobile) du formulaire de contact par une **grille de cartes cliquables** où tous les sujets sont visibles d'un coup, sans scroll.

## Mise en page

- **Mobile (< 640px)** : 2 colonnes
- **Tablet (≥ 640px)** : 3 colonnes
- **Desktop (≥ 1024px)** : 4 colonnes
- 7 sujets actuels → la dernière ligne se complète naturellement

## Anatomie d'une carte

Chaque carte contient :
- Une **pastille de couleur** (le `dot` actuel) en haut à gauche, avec le glow quand sélectionnée
- Le **label du sujet** (ex. « Nettoyage par drone »), 2 lignes max
- Une bordure fine + fond très clair
- État sélectionné : bordure et fond teintés à la couleur d'accent du sujet, légère élévation

Comportement :
- Clic = sélection (même logique `setValue("requestType", …)` qu'aujourd'hui)
- Hover : léger lift + bordure qui s'assombrit
- `role="radiogroup"` / `role="radio"` + `aria-checked` (sémantique plus juste qu'un tablist pour ce cas)
- Garde la même variable CSS `--contact-accent` qui pilote déjà la teinte du formulaire

## Ce qui disparaît

- Le scroll horizontal et le dégradé de fade mobile
- La barre soulignée sous l'onglet actif (remplacée par la teinte de la carte)
- Le bloc `tablist` actuel dans `ContactForm.tsx`

## Ce qui ne change pas

- Schéma de données, validation, soumission
- Le système de couleurs `REQUEST_TYPE_COLORS` (réutilisé tel quel)
- La synchronisation de l'accent avec le reste du formulaire (bouton, focus, lien RGPD)

## Détails techniques

- Fichier modifié : `src/components/contact/ContactForm.tsx`
  - Remplacer le composant `TabButton` par un `RequestCard`
  - Remplacer le wrapper `tablist` + scroll par une `<div>` en `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5`
- Le label « Sujet de votre demande » sera affiché au-dessus de la grille (petit label mono comme les autres champs) puisqu'on n'a plus la barre d'onglets contextuelle
- Erreur `requestType` affichée sous la grille
