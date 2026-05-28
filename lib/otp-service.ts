import { NextResponse } from "next/server";
import { generateOtpCode, setOtp, verifyOtp } from "./otp-store";
import { CORS_HEADERS } from "./api-cors";
import { normalizeSparrowToken, sendSparrowSms } from "./sparrow-sms";

/**
 * Shared OTP service used by the Next.js API routes.
 * The same endpoints serve the website (browser fetch) and the mobile
 * app (React Native fetch to https://www.nepalmotor.com/api/...).
 */

export const OTP_LENGTH = 4;

export { CORS_HEADERS } from "./api-cors";

function jsonResponse<T extends object>(body: T, status = 200) {
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

function normalizePhone(raw: string | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "").slice(-10);
  return digits.length === 10 ? digits : null;
}

type SmsResult = { ok: true } | { ok: false; reason: string };

async function sendSms(phone: string, code: string): Promise<SmsResult> {
  const token = normalizeSparrowToken(process.env.SPARROW_SMS_TOKEN);
  const text = `Your NEPAL Motor verification code is ${code}. It expires in 10 minutes.`;

  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[OTP dev] ${phone}: ${code}`);
    }
    return { ok: true };
  }

  return sendSparrowSms(phone, text);
}

export async function handleSendOtp(request: Request) {
  let body: { phone?: string };
  try {
    body = (await request.json()) as { phone?: string };
  } catch {
    return jsonResponse(
      { success: false, message: "Invalid JSON body." },
      400,
    );
  }

  const phone = normalizePhone(body.phone);
  if (!phone) {
    return jsonResponse(
      {
        success: false,
        message: "A valid 10-digit phone number is required.",
      },
      400,
    );
  }

  const code = generateOtpCode();
  setOtp(phone, code);

  const result = await sendSms(phone, code);
  if (!result.ok) {
    // Dev fallback: when SMS sending fails but OTP_DEV_FALLBACK=true and we
    // are not in production, log the code to the server console and respond
    // as if it was sent. Lets the rest of the flow be tested even while the
    // SMS provider account is being set up.
    const devFallback =
      process.env.NODE_ENV !== "production" &&
      process.env.OTP_DEV_FALLBACK === "true";

    if (devFallback) {
      console.warn(
        `[OTP fallback] Sparrow failed (${result.reason}). Code for ${phone}: ${code}`,
      );
      return jsonResponse({
        success: true,
        message: "Verification code sent.",
      });
    }

    return jsonResponse(
      {
        success: false,
        message:
          "We couldn't send the verification code. Please try again in a moment.",
        // `reason` is only included in non-production builds so client devs
        // can see exactly what Sparrow returned.
        ...(process.env.NODE_ENV !== "production"
          ? { reason: result.reason }
          : {}),
      },
      502,
    );
  }

  return jsonResponse({
    success: true,
    message: "Verification code sent.",
  });
}

export async function handleVerifyOtp(request: Request) {
  let body: { phone?: string; otp?: string };
  try {
    body = (await request.json()) as { phone?: string; otp?: string };
  } catch {
    return jsonResponse(
      { success: false, valid: false, message: "Invalid JSON body." },
      400,
    );
  }

  const phone = normalizePhone(body.phone);
  const otp = body.otp?.replace(/\D/g, "") ?? "";

  if (!phone) {
    return jsonResponse(
      {
        success: false,
        valid: false,
        message: "A valid 10-digit phone number is required.",
      },
      400,
    );
  }

  if (otp.length !== OTP_LENGTH) {
    return jsonResponse(
      {
        success: false,
        valid: false,
        message: `Enter the ${OTP_LENGTH}-digit code.`,
      },
      400,
    );
  }

  const valid = verifyOtp(phone, otp);

  return jsonResponse({
    success: valid,
    valid,
    message: valid
      ? "Phone verified."
      : "Incorrect or expired code. Please try again.",
  });
}

export function handleOtpOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
