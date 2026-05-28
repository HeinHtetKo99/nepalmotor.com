export type SparrowSmsResult = { ok: true } | { ok: false; reason: string };

/**
 * Sparrow SMS v2: https://api.sparrowsms.com/v2/sms/
 * POST form-urlencoded: token, from, to (10-digit), text
 * Success when JSON response has response_code === 200
 */
export function normalizeSparrowToken(raw: string | undefined): string {
  if (!raw) return "";
  let t = raw.trim();
  const label = t.match(/^(.+?)\s*\([^)]+\)\s*$/);
  if (label) t = label[1].trim();
  return t;
}

function normalizeSmsPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "").slice(-10);
  return digits.length === 10 ? digits : null;
}

export async function sendSparrowSms(
  to: string,
  text: string,
): Promise<SparrowSmsResult> {
  const token = normalizeSparrowToken(process.env.SPARROW_SMS_TOKEN);
  const from = (process.env.SPARROW_SMS_FROM ?? "Demo").trim();
  const phone = normalizeSmsPhone(to);

  if (!phone) {
    return { ok: false, reason: "Invalid recipient phone number." };
  }

  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Sparrow SMS dev] to ${phone}: ${text}`);
    }
    return { ok: true };
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[Sparrow SMS] sending from "${from}" with token ${token.slice(0, 4)}…${token.slice(-2)} (len ${token.length})`,
    );
  }

  try {
    const params = new URLSearchParams();
    params.set("token", token);
    params.set("from", from);
    params.set("to", phone);
    params.set("text", text);

    const resp = await fetch("https://api.sparrowsms.com/v2/sms/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const rawBody = await resp.text();
    let data: {
      response_code?: number;
      response?: string;
    } | null = null;
    try {
      data = JSON.parse(rawBody) as {
        response_code?: number;
        response?: string;
      };
    } catch {
      data = null;
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`[Sparrow SMS] HTTP ${resp.status} →`, data ?? rawBody);
    }

    if (!resp.ok || !data || data.response_code !== 200) {
      const reason =
        (data && (data.response || `code ${data.response_code}`)) ||
        rawBody.slice(0, 200) ||
        `HTTP ${resp.status}`;
      console.error("Sparrow SMS rejected:", reason);
      return { ok: false, reason };
    }

    return { ok: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : "Network error";
    console.error("Sparrow SMS request failed:", reason);
    return { ok: false, reason };
  }
}
