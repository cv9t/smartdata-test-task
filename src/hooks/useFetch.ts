import { useState, useCallback } from "react";

function useFetch<R extends any[]>(callback: (...args: R) => Promise<any>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetch: typeof callback = useCallback(async (...args: R) => {
    try {
      setError(false);
      setLoading(true);
      const res = await callback(...args);
      if (res.status !== 200) {
        setError(true);
        return;
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetch, loading, error } as const;
}

export default useFetch;
