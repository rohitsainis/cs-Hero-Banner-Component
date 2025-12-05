// src/personalization/hooks/usePersonalizedHeroBanner.ts

import { useEffect, useState } from 'react';
import { useHeroBanner } from './useHeroBanner';
import type { PersonalizeVariantResolver } from '../personalizeTypes';

type UsePersonalizedHeroBannerArgs = {
  experienceId: string;
  contentTypeUid: string;
  fallbackEntryUid: string;
  resolveVariant?: PersonalizeVariantResolver;
};

export function usePersonalizedHeroBanner({
  experienceId,
  contentTypeUid,
  fallbackEntryUid,
  resolveVariant,
}: UsePersonalizedHeroBannerArgs) {
  const [variantAlias, setVariantAlias] = useState<string | undefined>();
  const [resolverLoading, setResolverLoading] = useState<boolean>(false);
  const [resolverError, setResolverError] = useState<Error | null>(null);

  // 1. Ask Personalize which variant alias is active
  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!resolveVariant) return;

      try {
        setResolverLoading(true);
        setResolverError(null);

        const result = await resolveVariant({ experienceId });

        if (!cancelled) {
          setVariantAlias(result.variantAlias);
        }
      } catch (e: any) {
        if (!cancelled) {
          console.error('Error resolving variant:', e);
          setResolverError(e instanceof Error ? e : new Error(String(e)));
          setVariantAlias(undefined);
        }
      } finally {
        if (!cancelled) {
          setResolverLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [experienceId, resolveVariant]);

  // 2. Fetch the hero entry (with variant if we got one)
  const { entry, loading: heroLoading, error: heroError } = useHeroBanner({
    contentTypeUid,
    entryUid: fallbackEntryUid,
    variantAlias,
  });

  return {
    entry,
    loading: resolverLoading || heroLoading,
    error: resolverError ?? heroError,
    variantAlias,
  };
}
