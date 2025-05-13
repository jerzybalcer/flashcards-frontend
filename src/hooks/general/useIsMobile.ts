import { useState, useLayoutEffect } from "react";

export function useIsMobile() {
    const Breakpoint = 768; // px
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
      const handleResize = (): void => {
        setIsMobile(window.innerWidth < Breakpoint);
      };

      handleResize(); // Set isMobile on first render

      window.addEventListener('resize', handleResize);
      return (): void => window.removeEventListener('resize', handleResize);
    }, []);
  
    return isMobile;
}