"use client";

import Script from "next/script";
import { useEffect } from "react";

const ONESIGNAL_APP_ID = "37dbdf6b-f85b-43f8-9d13-8a320031def9";

declare global {
  interface Window {
    OneSignalDeferred?: Array<(oneSignal: OneSignalNamespace) => void | Promise<void>>;
  }
}

type OneSignalNamespace = {
  init: (options: { appId: string }) => Promise<void>;
};

export function OneSignalInit() {
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal) => {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
      });
    });
  }, []);

  return (
    <Script
      src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
      defer
      strategy="afterInteractive"
    />
  );
}
