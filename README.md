# Contentstack Personalized Hero Banner Component (POC)

This repository contains a reusable **React wrapper component** for rendering a **Hero Banner** from Contentstack.  
UI developers can install it directly from GitHub and use it without writing Contentstack Delivery API calls, Personalize Edge API calls, or parsing JSON.

This POC currently supports:

* Contentstack Delivery SDK integration  
* Rendering a Hero Banner (base or personalized variant)  
* Plug-and-play usage via `<PersonalizeProvider />` and `<PersonalizedHeroBanner />`  
* Passing `travelType` from the UI to fetch personalized variants

---

## 1. Installation (UI Project)

Install this wrapper directly from GitHub:

```bash
npm install git+https://github.com/rohitsainis/cs-Hero-Banner-Component.git
```

or

```bash
yarn add git+https://github.com/rohitsainis/cs-Hero-Banner-Component.git
```
---

## 2. Required Contentstack Values

UI developers will need the following values from Contentstack:

| Value                | Where to Find                              |
| -------------------- | ------------------------------------------ |
| **API Key**          | Stack Settings → API Keys                  |
| **Delivery Token**   | Stack Settings → Tokens → Delivery Tokens  |
| **Environment Name** | Stack Settings → Environments              |
| **Content Type UID** | Content Model → Hero Banner → UID          |
| **Entry UID**        | Content → Hero Banner → Select Entry → UID |

These can be stored in `.env` or passed directly as props.

---

## 3. Add Environment Variables (recommended)

Example for a Vite-based UI project:

```env
VITE_CS_API_KEY=YOUR_API_KEY
VITE_CS_DELIVERY_TOKEN=YOUR_DELIVERY_TOKEN
VITE_CS_ENVIRONMENT=development
VITE_CS_HERO_CONTENT_TYPE_UID=herobanner
VITE_CS_HERO_ENTRY_UID=YOUR_HERO_ENTRY_UID
```

---


## 4. Render the Hero Banner on Any Page

Example `HomePage.tsx`:

```tsx
import { PersonalizedHeroBanner, resolveVariant } from 'cs-hero-banner-component';

export default function HomePage() {
  return (
    <div>
      <PersonalizedHeroBanner
        experienceId={import.meta.env.VITE_CS_HERO_EXPERIENCE_UID}
        contentTypeUid={import.meta.env.VITE_CS_HERO_CONTENT_TYPE_UID}
        fallbackEntryUid={import.meta.env.VITE_CS_HERO_FALLBACK_UID}
        travelType="luxury"
        resolveVariant={resolveVariant}
      />
    </div>
  );
}
```

---

## 5. Running the UI App

Once everything is configured:

```bash
npm run dev
```

If the Contentstack values and `travelType` match your Personalize setup, the personalized hero banner will render successfully.

---
