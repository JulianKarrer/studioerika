import { useLayoutEffect, useState } from 'react';

export const useIsMobile = ()=> {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = ()=> {
      setIsMobile(window.innerWidth < 900);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return ()=> window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};