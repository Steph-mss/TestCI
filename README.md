# TP Ecommerce

Ceci est un projet simple de e-commerce en Node.js qui gère un panier d'achat.

## Fonctionnalités

- Ajouter des articles au panier
- Retirer des articles du panier
- Payer les articles du panier

## Installation

1.  Clonez le dépôt.
2.  Installez les dépendances :
    ```bash
    npm install
    ```

## Lancer les tests

Pour lancer les tests, utilisez la commande suivante :

```bash
npm test
```

Ceci lancera la suite de tests définie dans `testEcommerce.js`.

## Intégration Continue

Ce projet utilise GitHub Actions pour l'Intégration Continue. Le pipeline de CI est défini dans `.github/workflows/ci.yml`. Il lance les tests à chaque push et pull request sur la branche `main`.