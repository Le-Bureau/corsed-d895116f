# Diagnostic : emails notify-lead non reçus

## 1. Logs de la fonction notify-lead

| timestamp | type | ligne de log |
|---|---|---|
| — | — | **aucune invocation trouvée** |

`edge_function_logs` pour `notify-lead` : « No logs found ». La table analytique `function_edge_logs` (requêtes HTTP entrantes) renvoie également 0 ligne.

**Conclusion explicite : zéro invocation loggée. Les appels du front n'atteignent pas la fonction.**

## 2. Secrets présents

- `LOVABLE_API_KEY` — présent (géré)
- `RESEND_API_KEY` — présent **en double** : une version manuelle + une version gérée par le connecteur (collision de nom)
- `RESEND_API_KEY_1` — **absent** (or le code le lit en priorité)

## 3. Connecteur Resend

Connexion « Corse Drone Resend » (`api_key`, gateway activé) : **liée au projet**, accès OK. Expéditeur codé en dur dans la fonction : `noreply@corse-drone.com` → `contact@corse-drone.com`.

## 4. Lignes insérées (30 j) vs invocations

- `contact_submissions` : 2 lignes sur 30 j (10 au total, dernière 2026-09-02 08:57)
- `partner_applications` : 0 ligne
- Invocations loggées : 0

## 5. Diagnostic (3 lignes)

1. Les insertions passent mais la fonction n'est jamais exécutée : `supabase/config.toml` ne contient **aucun bloc `[functions.notify-lead]` avec `verify_jwt = false`**, donc les appels anonymes du formulaire sont rejetés en amont (401) et ne produisent aucun log.
2. Risque secondaire une fois l'appel passé : le code lit `RESEND_API_KEY_1` (inexistant) puis retombe sur `RESEND_API_KEY`, qui existe en double (manuel + connecteur) — la mauvaise valeur peut être injectée et faire échouer le gateway en 401.
3. **Le fix principal** : déclarer `verify_jwt = false` pour `notify-lead` dans `config.toml` et redéployer.

## Correctifs proposés (à approuver)

1. **Fix A (principal)** — ajouter dans `supabase/config.toml` :
   ```toml
   [functions.notify-lead]
   verify_jwt = false
   ```
   puis redéployer la fonction.
2. **Fix B (fiabilité clé)** — supprimer le secret `RESEND_API_KEY` manuel en doublon pour ne garder que celui géré par le connecteur (action côté Connecteurs / Project Settings), et simplifier la lecture de la clé dans la fonction.
3. **Fix C (observabilité)** — journaliser aussi les succès/échecs côté front (`console.error` existe déjà) et faire remonter le champ `skipped` dans un toast admin ou un log, pour ne plus dépendre uniquement des logs serveur.
4. **Vérification** — après déploiement : envoi test depuis /contact avec une vraie adresse, puis relecture des logs pour confirmer `notify-lead: sent type=contact`.
