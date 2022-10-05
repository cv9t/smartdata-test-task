import { useState, useCallback } from "react";

function useFetch<R extends any[]>(callback: (...args: R) => Promise<any>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetch: typeof callback = useCallback(async (...args: R) => {
    try {
      setLoaded(false);
      setError(false);
      setLoading(true);
      await callback(...args);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetch, loading, error, loaded } as const;
}

export default useFetch;
