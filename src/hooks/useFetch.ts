import { useState, useCallback } from "react";

function useFetch<T extends any[]>(callback: (...args: T) => Promise<any>) {
  const [loading, setLoading] = useState(false);

  const fetch: typeof callback = useCallback(async (...args: T) => {
    try {
      setLoading(true);
      await callback(...args);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetch, loading } as const;
}

export default useFetch;
