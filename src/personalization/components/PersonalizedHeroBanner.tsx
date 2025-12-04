import React from 'react';
import { useHeroBanner } from '../hooks/useHeroBanner';
import { mapHeroBannerEntryToViewModel } from '../mappers/mapHeroBanner';

type PersonalizedHeroBannerProps = {
  contentTypeUid: string;
  entryUid: string;
};

export const PersonalizedHeroBanner: React.FC<PersonalizedHeroBannerProps> = ({
  contentTypeUid,
  entryUid,
}) => {
  const { entry, loading, error } = useHeroBanner({ contentTypeUid, entryUid });

  if (loading) {
    return <div>Loading hero...</div>;
  }

  if (error) {
    console.error('Error loading hero banner', error);
    return <div>Failed to load hero banner.</div>;
  }

  if (!entry) return null;

  const vm = mapHeroBannerEntryToViewModel(entry);

  return (
    <section
      style={{
        padding: '80px 60px',
        backgroundColor: vm.backgroundColor || '#7d2dcd',
        color: vm.textColor || '#ffffff',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
        }}
      >
        {/* Left section */}
        <div style={{ flex: 1, maxWidth: '60%' }}>
          <h1
            style={{
              fontSize: '3rem',
              lineHeight: 1.2,
              marginBottom: '1rem',
              fontWeight: 700,
            }}
          >
            {vm.title}
          </h1>

          {vm.subtitle && (
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              {vm.subtitle}
            </p>
          )}
          {vm.descriptionHtml && (
            <div
              style={{ marginTop: 12 }}
              // description is HTML from CMS
              dangerouslySetInnerHTML={{ __html: vm.descriptionHtml }}
            />
          )}

        </div>

        {/* Right image */}
        {vm.backgroundImageUrl && (
          <div style={{ flex: 1, textAlign: 'right' }}>
            <img
              src={vm.backgroundImageUrl}
              alt={vm.title}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
