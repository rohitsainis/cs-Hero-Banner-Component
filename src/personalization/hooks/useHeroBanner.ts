import { useEffect, useState } from 'react';
import { usePersonalizeContext } from '../PersonalizeProvider';

export type HeroBannerEntry = any;

type UseHeroBannerParams = {
  contentTypeUid: string; 
  entryUid: string;
};

export function useHeroBanner({ contentTypeUid, entryUid }: UseHeroBannerParams) {
  const { stack, loading: ctxLoading, error: ctxError } = usePersonalizeContext();

  const [entry, setEntry] = useState<HeroBannerEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('useHeroBanner effect:', {
      stackDefined: !!stack,
      ctxLoading,
      ctxError,
      contentTypeUid,
      entryUid,
    });

    if (ctxError) {
      setError(ctxError);
      setLoading(false);
      return;
    }

    const run = async () => {
      if (!stack) {
        console.log('No Contentstack stack available, skipping fetch');
        setLoading(false);
        setError(new Error('Contentstack stack is not initialized'));
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log('Fetching from Contentstack...', { contentTypeUid, entryUid });
        const Entry = stack.ContentType(contentTypeUid).Entry(entryUid);

        Entry.toJSON()
          .fetch()
          .then((result: any) => {
            console.log('CS entry result:', result);
            setEntry(result);
            setLoading(false);
          })
          .catch((err: any) => {
            console.error('CS fetch error:', err);
            setError(err);
            setLoading(false);
          });
      } catch (e: any) {
        console.error('CS fetch exception:', e);
        setError(e);
        setLoading(false);
      }
    };

    if (!ctxLoading) {
      run();
    }
  }, [stack, contentTypeUid, entryUid, ctxLoading, ctxError]);

  return {
    entry,
    loading,
    error,
  };
}
