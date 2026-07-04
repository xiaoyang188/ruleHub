"use client";

import NextTopLoader from "nextjs-toploader";

export function RouteProgress() {
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
