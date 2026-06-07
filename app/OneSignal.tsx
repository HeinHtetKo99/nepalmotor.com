"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

const ONESIGNAL_APP_ID = "37dbdf6b-f85b-43f8-9d13-8a320031def9";

export function OneSignalInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      promptOptions: {
        slidedown: {
          prompts: [
            {
              type: "push",
              autoPrompt: true,
              delay: { pageViews: 1, timeDelay: 2 },
              text: {
                actionMessage:
                  "Get updates on EV exchange offers and Nepal Motor deals.",
                acceptButton: "Subscribe",
                cancelButton: "Later",
              },
            },
          ],
        },
      },
    })
      .then(() => {
        if (OneSignal.Notifications.permissionNative !== "default") return;

        // Fallback: ensure slide prompt shows on mobile after SDK is ready.
        window.setTimeout(() => {
          void OneSignal.Slidedown.promptPush({
            forceSlidedownOverNative: true,
          });
        }, 2500);
      })
      .catch(() => {
        // OneSignal logs SDK errors to the browser console.
      });
  }, []);

  return null;
}
