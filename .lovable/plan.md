# Diagnostic : soumission du 2026-09-03 06:15 UTC

## 1. Ligne de log de l'invocation

| timestamp (UTC) | ligne |
|---|---|
| 2026-09-03T06:15:40Z | `booted (time: 34ms)` |
| 2026-09-03T06:15:41Z | `booted (time: 23ms)` |
| 2026-09-03T06:15:41Z | **`notify-lead: sent type=contact`** |

Aucune ligne `Resend error`, `rate limited`, `invalid body`, `missing API keys` ni `unexpected error`. La fonction a répondu **HTTP 200** avec `{ ok: true, sent: true }`.

(La table `function_edge_logs` ne renvoie rien sur la fenêtre — artefact d'indexation analytique, sans incidence : les logs de la fonction sont formels.)

## 2. Réponse de Resend

Resend a **accepté** l'envoi : le code ne logge `sent` que si `res.ok` est vrai (statut 2xx). Aucun corps d'erreur 4xx à citer — il n'y en a pas eu.

## 3. Diagnostic (2 lignes)

1. La chaîne front → fonction → Resend fonctionne : l'API a accepté le message, donc l'échec est **après** Resend, à la livraison chez Infomaniak.
2. Le formulaire a été rempli avec `test@test.com`, qui est injecté en `Reply-To` — exactement le cas déjà constaté où Infomaniak rejette avec `554 5.7.1 test@test.com is rbl blacklisted`, d'où l'absence de mail dans la boîte.

## Fix unique

Aucun correctif code n'est nécessaire pour ce symptôme. Deux options, au choix :

- **Option A (recommandée, aucun code)** — refaire le test avec une adresse email réelle dans le formulaire. Le mail arrivera.
- **Option B (durcissement, code)** — ne plus utiliser l'email saisi comme `Reply-To` brut : envoyer avec `reply_to` uniquement si le domaine de l'adresse est plausible (MX résolvable / liste noire de domaines de test comme `test.com`, `example.com`), et mettre l'adresse du demandeur dans le corps du message dans tous les cas. Cela évite qu'une saisie fantaisiste fasse rejeter tout le message par le serveur de réception.

Aucun fichier, secret ni donnée n'a été modifié, et aucun email de test n'a été envoyé.
