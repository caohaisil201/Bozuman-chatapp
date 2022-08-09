import { useEffect, useRef } from 'react';

function usePrevious(value:any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default usePrevious;
