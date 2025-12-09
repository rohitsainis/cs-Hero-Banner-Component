import React from 'react';
import { PersonalizedHeroBanner } from './personalization/components/PersonalizedHeroBanner';
import { resolveVariant } from './personalization/resolveVariant';

const App: React.FC = () => {
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
};

export default App;
