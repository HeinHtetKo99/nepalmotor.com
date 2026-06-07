import Script from "next/script";

const ONESIGNAL_APP_ID = "37dbdf6b-f85b-43f8-9d13-8a320031def9";

export function OneSignalInit() {
  return (
    <>
      <Script id="onesignal-init" strategy="beforeInteractive">
        {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "${ONESIGNAL_APP_ID}",
              serviceWorkerPath: "OneSignalSDKWorker.js",
              serviceWorkerParam: { scope: "/" },
              promptOptions: {
                slidedown: {
                  prompts: [{
                    type: "push",
                    autoPrompt: true,
                    delay: { pageViews: 1, timeDelay: 2 },
                    text: {
                      actionMessage: "Get updates on EV exchange offers and Nepal Motor deals.",
                      acceptButton: "Subscribe",
                      cancelButton: "Later",
                    },
                  }],
                },
              },
              notifyButton: {
                enable: true,
                position: "bottom-right",
                offset: { bottom: "5.5rem", right: "12px", left: "0px" },
              },
            });

            if (OneSignal.Notifications.permissionNative === "default") {
              setTimeout(function() {
                OneSignal.Slidedown.promptPush({
                  force: true,
                  forceSlidedownOverNative: true,
                });
              }, 2500);
            }
          });
        `}
      </Script>
      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        defer
        strategy="afterInteractive"
      />
    </>
  );
}
