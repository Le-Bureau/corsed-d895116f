import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    plausible?: (event: string, options?: Record<string, unknown>) => void;
  }
}

export function usePlausibleTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.plausible === "function") {
      window.plausible("pageview");
    }
  }, [location.pathname]);
}
