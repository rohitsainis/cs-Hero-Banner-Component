// src/App.tsx

import React from 'react';
import { PersonalizedHeroBanner } from './personalization/components/PersonalizedHeroBanner';
import { resolveVariant } from './personalization/resolveVariant';

// This is your hero content type and base (Traveler) entry UID
const HERO_CONTENT_TYPE_UID = 'herobanner';
const FALLBACK_HERO_ENTRY_UID = 'blt299367f0c8134855';

// Any string is fine here for now; we only log it
const HERO_EXPERIENCE_ID = 'homepage_hero';

const App: React.FC = () => {
  return (
    <div>
      <PersonalizedHeroBanner
        experienceId={HERO_EXPERIENCE_ID}
        contentTypeUid={HERO_CONTENT_TYPE_UID}
        fallbackEntryUid={FALLBACK_HERO_ENTRY_UID}
        travelType="Economy" // 👈 now controlled from UI
        resolveVariant={resolveVariant}
      />
    </div>
  );
};

export default App;
