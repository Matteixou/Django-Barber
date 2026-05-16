# Django Barber — Site Vitrine

Site web professionnel pour **Django Barber**, salon de coiffure situé au **9 rue Gaston Cantini, 94800 Villejuif**.

---

## 🔑 Configuration des Avis Google (IMPORTANT)

Le site affiche automatiquement les vrais avis Google du salon. Pour que cela fonctionne, il faut configurer une clé API Google. Cette procédure est à effectuer **une seule fois**, par le propriétaire du salon.

### Étape 1 — Se connecter à Google Cloud

1. Ouvrir le navigateur et aller sur : **https://console.cloud.google.com**
2. Se connecter avec le **compte Google du propriétaire du salon** (le même que celui utilisé pour Google My Business)

---

### Étape 2 — Créer un projet

1. En haut de la page, cliquer sur le menu déroulant à côté de "Google Cloud"
2. Cliquer sur **"Nouveau projet"**
3. Donner un nom au projet, par exemple : `Django Barber Site`
4. Cliquer sur **"Créer"** et attendre quelques secondes

---

### Étape 3 — Activer les APIs nécessaires

1. Dans le menu de gauche, cliquer sur **"APIs et services"** → **"Bibliothèque"**
2. Dans la barre de recherche, taper `Maps JavaScript API`
   - Cliquer sur le résultat → Cliquer sur **"Activer"**
3. Revenir à la bibliothèque, taper `Places API`
   - Cliquer sur le résultat → Cliquer sur **"Activer"**

---

### Étape 4 — Créer la clé API

1. Dans le menu de gauche, cliquer sur **"APIs et services"** → **"Identifiants"**
2. En haut, cliquer sur **"+ Créer des identifiants"** → **"Clé API"**
3. Une clé s'affiche (elle ressemble à `AIzaSy...`). **La copier**.

---

### Étape 5 — Sécuriser la clé (recommandé)

1. Cliquer sur **"Modifier la clé"**
2. Dans la section **"Restrictions relatives aux applications"** :
   - Sélectionner **"Referrers HTTP (sites web)"**
   - Ajouter les adresses suivantes :
     - `localhost:5173/*` *(pour les tests en local)*
     - `www.votre-domaine.fr/*` *(remplacer par le vrai domaine du site)*
3. Cliquer sur **"Enregistrer"**

---

### Étape 6 — Renseigner la clé dans le projet

Ouvrir le fichier `.env` à la racine du projet et remplacer les valeurs :

```
VITE_GOOGLE_API_KEY=AIzaSy...votre_vraie_clé_ici
VITE_PLACE_ID=ChIJ93-YLf1z5kcRP4gk5EMCA94
```

> ⚠️ **Ne jamais partager ce fichier `.env` publiquement** (ne pas le mettre sur GitHub, ne pas l'envoyer par email).

---

### C'est gratuit ?

Oui. Google offre **28 500 chargements gratuits par mois**, ce qui est largement suffisant pour un salon de coiffure. Au-delà, Google demande une carte bancaire, mais il faudrait des dizaines de milliers de visiteurs par mois pour dépasser ce seuil.

---

## 🚀 Lancer le site en local (pour le développeur)

```bash
npm install
npm run dev
```

Le site s'ouvre sur : **http://localhost:5173**

---

## 🏗️ Construire le site pour la mise en ligne

```bash
npm run build
```

Les fichiers à déployer se trouvent dans le dossier `dist/`.

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── Navbar.jsx          → Barre de navigation
│   ├── Hero.jsx            → Page d'accueil (modèle 3D)
│   ├── About.jsx           → Section "À propos"
│   ├── Skills.jsx          → Section "Savoir-faire"
│   ├── Gallery.jsx         → Galerie photos
│   ├── Experience.jsx      → Expérience & témoignages
│   ├── GoogleReviews.jsx   → Avis Google en temps réel
│   ├── Contact.jsx         → Coordonnées & contact
│   └── Footer.jsx          → Pied de page
└── hooks/
    └── useLenis.js         → Animation de défilement fluide
```

---

## 📍 Informations du salon

| | |
|---|---|
| **Nom** | Django Barber |
| **Adresse** | 9 rue Gaston Cantini, 94800 Villejuif |
| **Instagram** | [@niame___](https://www.instagram.com/niame___/) |
| **Place ID Google** | `ChIJ93-YLf1z5kcRP4gk5EMCA94` |
