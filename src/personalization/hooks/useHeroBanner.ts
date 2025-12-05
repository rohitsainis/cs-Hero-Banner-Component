import { useEffect, useState } from 'react';

// ---- Types ----

type UseHeroBannerArgs = {
  contentTypeUid: string;
  entryUid: string;            // base entry uid (your Traveler entry)
  variantAlias?: string;       // e.g. "cs_personalize_0_0"
};

type HeroBannerState = {
  entry: any | null;
  loading: boolean;
  error: Error | null;
};

// ---- Helpers ----

// Read env vars (match `main.tsx` / `.env.local` naming: `VITE_CS_*`).
const API_KEY = import.meta.env.VITE_CS_API_KEY as string;
const DELIVERY_TOKEN = import.meta.env.VITE_CS_DELIVERY_TOKEN as string;
const ENVIRONMENT = import.meta.env.VITE_CS_ENVIRONMENT as string;
const REGION =
  (import.meta.env.VITE_CS_REGION as
    | 'NA'
    | 'EU'
    | 'AZURE-NA'
    | 'AZURE-EU'
    | undefined) ?? 'NA';

function getBaseCdnDomain(region: string): string {
  switch (region) {
    case 'EU':
      return 'eu-cdn.contentstack.com';
    case 'AZURE-NA':
      return 'azure-na-cdn.contentstack.com';
    case 'AZURE-EU':
      return 'azure-eu-cdn.contentstack.com';
    default:
      return 'cdn.contentstack.io';
  }
}

// ---- Hook ----

export function useHeroBanner({
  contentTypeUid,
  entryUid,
  variantAlias,
}: UseHeroBannerArgs): HeroBannerState {
  const [entry, setEntry] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchHero() {
      try {
        setLoading(true);
        setError(null);

        const baseDomain = getBaseCdnDomain(REGION);
        const url = `https://${baseDomain}/v3/content_types/${contentTypeUid}/entries/${entryUid}?environment=${ENVIRONMENT}`;

        const headers: Record<string, string> = {
          api_key: API_KEY,
          access_token: DELIVERY_TOKEN,
          accept: 'application/json',
        };

        // This is the important bit – tell CDA which variant to return
        if (variantAlias) {
          headers['x-cs-variant-uid'] = variantAlias;
        }

        // Debug: log request details (URL + headers). Helpful to reproduce 412 responses.
        // eslint-disable-next-line no-console
        console.log('CDA request:', url, headers);

        const res = await fetch(url, { headers });

        if (!res.ok) {
          let bodyText: string;
          try {
            bodyText = await res.text();
          } catch (e) {
            bodyText = '<unable to read response body>';
          }

          throw new Error(
            `CDA request failed (${res.status} ${res.statusText}) - ${bodyText}`
          );
        }

        const json = await res.json();

        if (!cancelled) {
          setEntry(json.entry ?? null);
        }
      } catch (e: any) {
        if (!cancelled) {
          console.error('CS fetch exception:', e);
          setError(e instanceof Error ? e : new Error(String(e)));
          setEntry(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchHero();

    return () => {
      cancelled = true;
    };
  }, [contentTypeUid, entryUid, variantAlias]);

  return { entry, loading, error };
}
