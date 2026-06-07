"use client";

import Script from "next/script";
import { useEffect } from "react";

const ONESIGNAL_APP_ID = "37dbdf6b-f85b-43f8-9d13-8a320031def9";
const ONESIGNAL_SAFARI_WEB_ID =
  "web.onesignal.auto.1cc5c601-0ab1-487a-96d1-0b685be1e018";

declare global {
  interface Window {
    OneSignalDeferred?: Array<(oneSignal: OneSignalNamespace) => void | Promise<void>>;
  }
}

type OneSignalNamespace = {
  init: (options: {
    appId: string;
    safari_web_id?: string;
    notifyButton?: { enable: boolean };
    allowLocalhostAsSecureOrigin?: boolean;
  }) => Promise<void>;
};

export function OneSignalInit() {
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal) => {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        safari_web_id: ONESIGNAL_SAFARI_WEB_ID,
        notifyButton: {
          enable: true,
        },
        ...(process.env.NODE_ENV === "development"
          ? { allowLocalhostAsSecureOrigin: true }
          : {}),
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
