import { normalizeSparrowToken, sendSparrowSms } from "@/lib/sparrow-sms";

const DEFAULT_NOTIFY_TO = ["9852024365", "9852031716"] as const;

export type FormNotifyKind =
  | "exchange"
  | "sell"
  | "buy"
  | "testDrive"
  | "dealer";

const FORM_SMS_TITLES: Record<FormNotifyKind, string> = {
  exchange: "Exchange to EV",
  sell: "Sell Used Car",
  buy: "Buy Used Car",
  testDrive: "TestDrive",
  dealer: "Become a Dealer",
};

function resolveNotifyPhones(): string[] {
  const raw = process.env.FORM_NOTIFY_SMS_TO?.trim();
  const source = raw ?? DEFAULT_NOTIFY_TO.join(",");
  const phones = source
    .split(/[,;\s]+/)
    .map((part) => part.replace(/\D/g, "").slice(-10))
    .filter((digits) => digits.length === 10);
  const unique = [...new Set(phones)];
  return unique.length > 0 ? unique : [...DEFAULT_NOTIFY_TO];
}

export function buildFormSubmissionNotifyText(
  kind: FormNotifyKind,
  fullName: string,
  phone: string,
): string {
  const title = FORM_SMS_TITLES[kind];
  return `${title} Form has been submitted by ${fullName}, ${phone} - Nepal Motor`;
}

/** Best-effort admin SMS after a form is saved successfully; never throws. */
export async function notifyFormSubmission(params: {
  kind: FormNotifyKind;
  fullName: string;
  phone: string;
}): Promise<void> {
  const text = buildFormSubmissionNotifyText(
    params.kind,
    params.fullName,
    params.phone,
  );

  const token = normalizeSparrowToken(process.env.SPARROW_SMS_TOKEN);
  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Form notify dev] ${text}`);
    }
    return;
  }

  for (const to of resolveNotifyPhones()) {
    const result = await sendSparrowSms(to, text);
    if (!result.ok) {
      console.error(`[Form notify] Sparrow SMS failed for ${to}:`, result.reason);
    }
  }
}
