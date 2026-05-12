## Masquer la section "Ils nous ont fait confiance" sur les pages de pôle

La section concernée est `PoleUseCases` (composant `src/components/pole/PoleUseCases.tsx`), affichée dans `src/pages/PoleDetail.tsx` (lignes 83-85) quand `pole.useCases` contient au moins un élément.

Aujourd'hui, seul le pôle **Nettoyage** définit `useCases` dans `src/lib/poles.ts` (constante `NETTOYAGE_USE_CASES`). Les pôles Diagnostic, Agriculture et Transport ne l'affichent déjà pas.

### Changement proposé

Dans `src/pages/PoleDetail.tsx`, commenter le bloc de rendu de `PoleUseCases` (lignes 83-85) en gardant l'import et les données intacts :

```tsx
{/* Section "Ils nous ont fait confiance" — masquée temporairement, à réactiver quand on aura des cas clients réels */}
{/* {pole.useCases && pole.useCases.length > 0 && (
  <PoleUseCases cases={pole.useCases} />
)} */}
```

### Ce qui est conservé

- Le composant `PoleUseCases.tsx` reste en place, intact.
- Les données `NETTOYAGE_USE_CASES` et le champ `useCases` du type `Pole` restent dans `src/lib/poles.ts`.
- L'import dans `PoleDetail.tsx` reste (commentaire explicatif pour éviter une suppression accidentelle).

Réactivation future = décommenter les 3 lignes.
