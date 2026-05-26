/** In-memory OTP store (replace with Redis/SMS provider in production). */

type OtpEntry = { code: string; expiresAt: number };

const store = new Map<string, OtpEntry>();

const OTP_TTL_MS = 10 * 60 * 1000;

export function setOtp(phone: string, code: string) {
  store.set(phone, { code, expiresAt: Date.now() + OTP_TTL_MS });
}

export function verifyOtp(phone: string, otp: string): boolean {
  const entry = store.get(phone);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    store.delete(phone);
    return false;
  }
  if (entry.code !== otp) return false;
  store.delete(phone);
  return true;
}

export function generateOtpCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}
