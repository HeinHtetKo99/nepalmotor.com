"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

const ONESIGNAL_APP_ID = "37dbdf6b-f85b-43f8-9d13-8a320031def9";

export function OneSignalInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    OneSignal.init({ appId: ONESIGNAL_APP_ID }).catch(() => {
      // OneSignal logs SDK errors to the browser console.
    });
  }, []);

  return null;
}
