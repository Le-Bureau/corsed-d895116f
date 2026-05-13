# Import d'articles markdown depuis /admin/blog

Permettre aux admins de coller ou téléverser un fichier `.md` avec frontmatter YAML, le valider, puis pré-remplir l'éditeur de création.

## 1. Dépendance

Installer `gray-matter` pour parser frontmatter YAML + corps markdown.

## 2. Nouveau module : `src/lib/admin/importArticle.ts`

- Type `ParsedArticle` (champs frontmatter + content).
- Type `ValidationError` et `ValidationResult` (ok + data résolue ou liste d'erreurs).
- `validateImport(source, categories, authors, checkSlug)` :
  1. Parse via gray-matter (try/catch → erreur "Frontmatter YAML invalide").
  2. Détecte absence de frontmatter (pas de `---`) → erreur dédiée.
  3. Vérifie champs requis : title, slug, excerpt, category, author, status.
  4. Valide enum status (draft/published).
  5. Coerce booléens (`true`/`false` strings → bool, sinon erreur).
  6. Résout category par slug (sinon erreur listant les slugs dispo).
  7. Résout author par initiales (sinon erreur listant les initiales dispo).
  8. Vérifie content non vide après frontmatter.
  9. `checkSlug(parsed.slug)` → si pris, **warning** (`slugAvailable=false`), pas erreur bloquante.
  10. Calcule wordCount + readingTime (réutilise `getReadingTime` de `blogHelpers`).
- Constante `ARTICLE_TEMPLATE_MD` (le modèle complet) + helper `downloadTemplate()` (Blob download "modele-article-corse-drone.md").

## 3. Nouveau composant : `src/components/admin/ImportArticleDialog.tsx`

shadcn `Dialog` (max-w-3xl), 3 stages contrôlés par state local (`'input' | 'validation' | 'success'`).

**Stage `input`** :
- Tabs [Coller le texte | Téléverser un fichier].
  - Coller : `Textarea` font-mono ~12 rows avec placeholder snippet.
  - Téléverser : zone drag-drop `<input type=file accept=".md,.markdown">`, validation taille ≤ 200 KB, lit via `FileReader`.
- Section `Collapsible` "Voir le format attendu" : affiche le template, bouton "Copier" (clipboard) + bouton "Télécharger le modèle .md".
- Footer : Annuler + "Analyser" (disabled tant que vide).

**Stage `validation`** :
- Si succès : icône check verte + récap (titre, slug + badge dispo/⚠ pris, catégorie pill, auteur, status, à la une, cover preview ou "à ajouter", `{n} mots · ~{m} min`, SEO override présent/absent). Footer : Retour + "Ouvrir dans l'éditeur".
- Si échec : icône alerte + liste à puces des erreurs actionnables. Footer : Retour seul.

**Stage `success`** : ferme le dialog et `navigate('/admin/blog/new', { state: { imported: parsedData } })`.

Le dialog consomme `useBlogCategories`, `useBlogAuthors`, et `slugExists` pour la validation.

## 4. Bouton entrée dans `src/pages/admin/AdminBlogList.tsx`

Header : ajouter à côté de "Nouvel article" un bouton secondaire `variant="outline"` "Importer" (icône `Upload`). Click → ouvre `ImportArticleDialog` (state local `importOpen`).

## 5. Pré-remplissage dans `src/pages/admin/AdminBlogEditor.tsx`

- Lire `useLocation().state?.imported` au mount (mode create uniquement, ref pour éviter re-application).
- Si présent :
  - `reset()` avec valeurs importées (author_id et category_id résolus depuis la validation).
  - `slugManuallyEditedRef.current = true` pour ne pas écraser.
  - Si `slugAvailable === false` dans le payload : vider le slug, remettre `slugManuallyEditedRef.current = false` (pour que l'auto-slug regénère depuis le titre).
  - Activer state `importedBanner` :
    - texte normal : "Article importé. Relisez avant de publier."
    - texte alt si slug regénéré : "Le slug original était déjà utilisé. Un nouveau slug a été généré, vérifiez-le."
  - Bouton X dismiss.
- Nettoyer `location.state` après lecture (`navigate(location.pathname, { replace: true, state: {} })`) pour éviter ré-application sur reload.

## 6. Edge cases couverts

- Pas de frontmatter, content vide, YAML malformé, status invalide, category/author inconnus, slug pris, booléen invalide, URL invalide (warning seulement), content > 500 KB (warning).

## Détails techniques

- `gray-matter` côté front fonctionne en bundle Vite (utilise `js-yaml`). Pas d'edge function nécessaire.
- Aucune migration Supabase : tous les champs existent.
- Réutilise `slugExists`, `useBlogCategories`, `useBlogAuthors`, `getReadingTime`, `slugify`, `BlogPostFormValues`.
- Banner d'import = simple `div` avec border accent + bouton X (state `bannerVisible`).

## Hors scope (intouché)

Schéma Supabase, layout/toolbar/dialogs de l'éditeur, site public, AdminLayout, AdminRoute, AuthContext, /admin/profil, autres pages admin.

## Fichiers

**Créés** :
- `src/lib/admin/importArticle.ts`
- `src/components/admin/ImportArticleDialog.tsx`

**Modifiés** :
- `package.json` (ajout gray-matter)
- `src/pages/admin/AdminBlogList.tsx` (bouton Importer + dialog)
- `src/pages/admin/AdminBlogEditor.tsx` (lecture state importé + banner)
