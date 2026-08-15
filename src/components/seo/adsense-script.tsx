"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-2776939895882412";

export function AdSenseScript() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ADSENSE_CLIENT) return null;

  return (
    <>
      <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
      {ready ? (
        <Script
          id="adsense-loader"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      ) : null}
    </>
  );
}
