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
            });
          });
        `}
      </Script>
      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        strategy="afterInteractive"
      />
    </>
  );
}
