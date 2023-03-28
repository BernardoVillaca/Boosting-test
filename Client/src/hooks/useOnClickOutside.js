import { useEffect } from 'react';

const useOnClickOutside = (ref, handler, excludeRef) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!excludeRef || !excludeRef.current || !excludeRef.current.contains(event.target))
      ) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, excludeRef]);
};

export default useOnClickOutside;