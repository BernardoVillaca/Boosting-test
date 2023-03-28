import { useEffect, useState } from "react";


export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value === '') return setDebouncedValue('')
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);

  }, [value]);

  return debouncedValue;
}