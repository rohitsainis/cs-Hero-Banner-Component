// src/personalization/hooks/usePersonalizedHeroBanner.ts

import { useEffect, useState } from 'react';
import { useHeroBanner } from './useHeroBanner';
import type {
  PersonalizeVariantResolver,
  TravelType,
} from '../personalizeTypes';

type UsePersonalizedHeroBannerArgs = {
  experienceId: string;
  contentTypeUid: string;
  fallbackEntryUid: string;
  resolveVariant?: PersonalizeVariantResolver;
  travelType?: TravelType;
};

export function usePersonalizedHeroBanner({
  experienceId,
  contentTypeUid,
  fallbackEntryUid,
  resolveVariant,
  travelType,
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

        const result = await resolveVariant({
          experienceId,
          travelType,
        });

        if (!cancelled) {
          setVariantAlias(result.variantAlias);
        }
      } catch (e: any) {
        if (!cancelled) {
          console.error('Error resolving variant', e);
          setResolverError(e);
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
  }, [experienceId, travelType, resolveVariant]);

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
