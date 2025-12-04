import { PersonalizedHeroBanner } from './personalization/components/PersonalizedHeroBanner';

function App() {
  // TODO: replace with your real hero_banner entry UID from Contentstack
  const heroEntryUid = 'blt299367f0c8134855';

  return (
    <div>
      <PersonalizedHeroBanner
        contentTypeUid="herobanner"
        entryUid={heroEntryUid}
      />

      <div style={{ padding: 24 }}>
        <h2>Below the hero banner content</h2>
        <p>This is just placeholder content under the hero banner.</p>
      </div>
    </div>
  );
}

export default App;
