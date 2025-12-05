Contentstack Personalized Hero Banner Component (POC)

This repository contains a reusable React wrapper component for rendering a Personalized Hero Banner from Contentstack.

UI developers can install it directly from GitHub and start using it without writing Delivery API code or Personalize API code.

This POC currently supports:

✅ Contentstack Delivery SDK integration

✅ Contentstack Personalize Edge SDK integration

✅ Personalized Hero Banner rendering based on travelType

✅ Full plug-and-play usage via <PersonalizeProvider /> & <PersonalizedHeroBanner />

1. Installation (UI Project)

Install this wrapper directly from GitHub:

npm install git+https://github.com/rohitsainis/cs-Hero-Banner-Component.git


or

yarn add git+https://github.com/rohitsainis/cs-Hero-Banner-Component.git


Import components from the package:

import {
  PersonalizeProvider,
  PersonalizedHeroBanner
} from 'cs-hero-banner-component';

2. Required Contentstack Values

UI developers will need the following Contentstack values:

Value	Location in Contentstack
API Key	Stack Settings → API Keys
Delivery Token	Stack Settings → Tokens → Delivery Tokens
Environment Name	Stack Settings → Environments
Content Type UID	Content Model → Hero Banner → UID
Entry UID	Content → Hero Banner → Select Entry → UID

You can store them in .env or pass them directly as props.

3. Add Environment Variables (recommended)

Example for a Vite-based UI project:

VITE_CS_API_KEY=YOUR_API_KEY
VITE_CS_DELIVERY_TOKEN=YOUR_DELIVERY_TOKEN
VITE_CS_ENVIRONMENT=development

VITE_CS_HERO_CONTENT_TYPE_UID=herobanner
VITE_CS_HERO_ENTRY_UID=YOUR_HERO_ENTRY_UID

4. Wrap Your App with PersonalizeProvider

Add the provider at the root of your UI project (main.tsx):

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { PersonalizeProvider } from 'cs-hero-banner-component';

const apiKey = import.meta.env.VITE_CS_API_KEY;
const deliveryToken = import.meta.env.VITE_CS_DELIVERY_TOKEN;
const environment = import.meta.env.VITE_CS_ENVIRONMENT;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersonalizeProvider
      apiKey={apiKey}
      deliveryToken={deliveryToken}
      environment={environment}
    >
      <App />
    </PersonalizeProvider>
  </React.StrictMode>
);


This sets up Delivery SDK + Personalize SDK globally.

5. Render a Personalized Hero Banner

Example HomePage.tsx:

import { PersonalizedHeroBanner } from 'cs-hero-banner-component';

export default function HomePage() {
  return (
    <div>
      <PersonalizedHeroBanner
        contentTypeUid={import.meta.env.VITE_CS_HERO_CONTENT_TYPE_UID}
        entryUid={import.meta.env.VITE_CS_HERO_ENTRY_UID}
        travelType="Luxury"   // 👈 Personalization attribute (Luxury | Business | Traveller)
      />

      <div style={{ padding: 24 }}>
        <h2>Below the hero banner</h2>
        <p>This is regular page content under the hero section.</p>
      </div>
    </div>
  );
}

6. How Personalization Works (behind the scenes)

The UI developer does not need to write any logic.

Internally, the wrapper:

Accepts travelType (e.g., "Luxury", "Business", "Traveller").

Sends it to Contentstack Personalize Edge SDK as a live attribute.

Personalize returns the active variant alias (e.g., cs_personalize_0_1).

Wrapper calls Delivery SDK with that variant.

Correct personalized hero banner is rendered.

You only pass travelType — everything else is automatic.

7. Optional: Dynamic travel type

You can use:

Dropdown selection

URL query params

Cookies

Lytics segments

Example:

const travelType = user?.tier === 'premium'
  ? 'Luxury'
  : 'Economy';

<PersonalizedHeroBanner
  contentTypeUid="herobanner"
  entryUid="blt123..."
  travelType={travelType}
/>

8. Running the UI App

After setup:

npm run dev


If your Contentstack credentials and travelType values are correct, your personalized hero banner will render automatically.