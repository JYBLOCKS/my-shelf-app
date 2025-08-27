import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';

const options = {
  keys: ['title'],
  threshold: 0.3, // Ajusta la sensibilidad
};

export function useDebouncedSearch<T>(data: T[], query: string, delay = 300) {
  const [filtered, setFiltered] = useState<T[]>(data);
  const fuse = new Fuse(data, options);
  const debouncedFilter = useMemo(
    () =>
      debounce((q: string) => {
        setFiltered(
          q !== ''
            ? fuse.search(q.toLowerCase().trim()).map((res) => res.item)
            : data,
        );
      }, delay),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, delay],
  );

  useMemo(() => {
    debouncedFilter(query);
  }, [query, debouncedFilter]);

  return filtered;
}
