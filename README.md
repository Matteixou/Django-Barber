# Django Barber — Site Vitrine

Site web professionnel pour **Django Barber**, salon de coiffure situé au **9 rue Gaston Cantini, 94800 Villejuif**.

---

## Stack technique

- **React + Vite** — Framework et bundler
- **GSAP + ScrollTrigger** — Animations au scroll
- **Three.js / React Three Fiber** — Modèle 3D interactif (Hero)
- **motion/react** — Animations de popups
- **Tailwind CSS v4** — Styles utilitaires
- **Lenis** — Smooth scroll
- **SplitType** — Animations de texte lettre par lettre
- **Calendly Widget** — Prise de rendez-vous en ligne

---

## Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```
VITE_GOOGLE_API_KEY=AIzaSy...votre_clé_ici
VITE_PLACE_ID=ChIJ93-YLf1z5kcRP4gk5EMCA94
VITE_CALENDLY_URL=https://calendly.com/votre-username/reservation-coupe
```

> ⚠️ Ne jamais commiter le fichier `.env` — il est protégé par le `.gitignore`.

Sur **Vercel**, ajouter ces trois variables dans **Settings → Environment Variables**.

---

## Lancer le projet en local

```bash
npm install
npm run dev
```

Le site s'ouvre sur : **http://localhost:5173**

---

## Build de production

```bash
npm run build
```

Les fichiers compilés se trouvent dans le dossier `dist/`.

---

## Structure du projet

```
src/
├── components/
│   ├── Navbar.jsx          → Barre de navigation fixe + menu mobile
│   ├── Preloader.jsx       → Écran de chargement animé
│   ├── Hero.jsx            → Page d'accueil avec modèle 3D
│   ├── Marquee.jsx         → Bande de texte défilant
│   ├── About.jsx           → Section "Notre histoire"
│   ├── Stats.jsx           → Chiffres clés animés
│   ├── Skills.jsx          → Section "Savoir-faire"
│   ├── Gallery.jsx         → Galerie photos avec lightbox
│   ├── Experience.jsx      → Section "L'expérience Django"
│   ├── GoogleReviews.jsx   → Avis Google en temps réel
│   ├── Pricing.jsx         → Section tarifs
│   ├── Contact.jsx         → Contact, adresse & horaires
│   ├── Footer.jsx          → Pied de page
│   ├── Cursor.jsx          → Curseur personnalisé
│   ├── Grain.jsx           → Texture grain overlay
│   └── MagneticButton.jsx  → Bouton à effet magnétique
├── icons/
│   └── SocialIcons.jsx     → Icônes réseaux sociaux (Instagram, Snapchat, TikTok)
├── hooks/
│   └── useLenis.js         → Smooth scroll
└── utils/
    └── calendly.js         → Intégration Calendly (RDV en ligne)
```

---

## Configuration Google Reviews

1. Aller sur [console.cloud.google.com](https://console.cloud.google.com)
2. Créer un projet → activer **Maps JavaScript API** et **Places API**
3. Créer une clé API → la restreindre à ton domaine
4. Renseigner `VITE_GOOGLE_API_KEY` et `VITE_PLACE_ID` dans le `.env`

> Google offre 200$/mois de crédit gratuit — largement suffisant pour un salon de coiffure.

---

## Configuration Calendly

1. Créer un compte sur [calendly.com](https://calendly.com)
2. Créer un événement "En privé" (ex: Coupe — 30 min)
3. Copier le lien de l'événement
4. Le renseigner dans `VITE_CALENDLY_URL` du `.env`

Les disponibilités se gèrent directement depuis l'app Calendly, sans toucher au code.

---

## Informations du salon

| | |
|---|---|
| **Nom** | Django Barber |
| **Adresse** | 9 rue Gaston Cantini, 94800 Villejuif |
| **Instagram** | [@niame___](https://www.instagram.com/niame___/) |
| **Snapchat** | [@niame_iss](https://www.snapchat.com/add/niame_iss) |
| **TikTok** | [@django94200](https://www.tiktok.com/@django94200) |
