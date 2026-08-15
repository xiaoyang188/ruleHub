"use client";

import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";

export function RouteProgress() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      if (window.self !== window.top) return;
    } catch {
      return;
    }
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <NextTopLoader
      color="#d99178"
      height={2}
      showSpinner={false}
      shadow={false}
      zIndex={9999}
    />
  );
}
