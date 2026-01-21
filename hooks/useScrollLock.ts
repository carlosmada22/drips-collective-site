import { useEffect } from 'react';

const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
};

export default useScrollLock;
