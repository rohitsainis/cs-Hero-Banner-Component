import React from 'react';
import { PersonalizedHeroBanner } from './personalization/components/PersonalizedHeroBanner';
import { resolveVariant } from './personalization/resolveVariant';

const HERO_CONTENT_TYPE_UID = 'herobanner';
const FALLBACK_HERO_ENTRY_UID = 'blt299367f0c8134855';

const HERO_EXPERIENCE_ID = 'homepage_hero';

const App: React.FC = () => {
  return (
    <div>
      <PersonalizedHeroBanner
        experienceId={HERO_EXPERIENCE_ID}
        contentTypeUid={HERO_CONTENT_TYPE_UID}
        fallbackEntryUid={FALLBACK_HERO_ENTRY_UID}
        travelType="Budget" 
        resolveVariant={resolveVariant}
      />
    </div>
  );
};

export default App;
