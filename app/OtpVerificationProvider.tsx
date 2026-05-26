"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  OtpVerificationModal,
  type OtpLoadingState,
} from "./OtpVerificationModal";

const OTP_LENGTH = 4;
const OTP_RESEND_COOLDOWN = 30;

const sendOtpEndpoint = "/api/send-otp";
const verifyOtpEndpoint = "/api/verify-otp";

type OtpContextValue = {
  request: (phone: string, onVerified: () => Promise<void>) => Promise<void>;
};

const OtpContext = createContext<OtpContextValue | null>(null);

export function OtpVerificationProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [digits, setDigits] = useState<string[]>(() =>
    Array(OTP_LENGTH).fill(""),
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<OtpLoadingState>("");
  const [resendSeconds, setResendSeconds] = useState(0);

  const pendingSubmitRef = useRef<(() => Promise<void>) | null>(null);
  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startResendCountdown = useCallback(() => {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    setResendSeconds(OTP_RESEND_COOLDOWN);
    resendTimerRef.current = setInterval(() => {
      setResendSeconds((s) => {
        if (s <= 1) {
          if (resendTimerRef.current) clearInterval(resendTimerRef.current);
          resendTimerRef.current = null;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    };
  }, []);

  const sendOtp = useCallback(
    async (phoneNumber: string) => {
      const resp = await fetch(sendOtpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      if (!resp.ok) throw new Error("Send OTP failed");
      startResendCountdown();
    },
    [startResendCountdown],
  );

  const request = useCallback(
    async (phoneNumber: string, onVerified: () => Promise<void>) => {
      pendingSubmitRef.current = onVerified;
      setPhone(phoneNumber);
      setDigits(Array(OTP_LENGTH).fill(""));
      setError("");
      setLoading("sending");
      setVisible(true);

      try {
        await sendOtp(phoneNumber);
      } catch {
        setError(
          "Failed to send OTP. Please check your number and try again.",
        );
      } finally {
        setLoading("");
      }
    },
    [sendOtp],
  );

  const handleDigitChange = useCallback((digit: string, index: number) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    setError("");
  }, []);

  const verify = useCallback(async () => {
    const code = digits.join("");
    if (code.length < OTP_LENGTH) return;

    setLoading("verifying");
    setError("");

    try {
      const resp = await fetch(verifyOtpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: code }),
      });
      const data = (await resp.json().catch(() => ({}))) as {
        valid?: boolean;
        message?: string;
      };

      if (!resp.ok) {
        throw new Error(data.message || "Verification failed");
      }

      if (data.valid) {
        const submit = pendingSubmitRef.current;
        pendingSubmitRef.current = null;
        if (resendTimerRef.current) clearInterval(resendTimerRef.current);
        resendTimerRef.current = null;
        setVisible(false);
        setLoading("");
        if (submit) await submit();
      } else {
        setDigits(Array(OTP_LENGTH).fill(""));
        setError(data.message || "Incorrect code. Please try again.");
        setLoading("");
      }
    } catch {
      setError("Verification failed. Please try again.");
      setLoading("");
    }
  }, [digits, phone]);

  const resend = useCallback(async () => {
    setDigits(Array(OTP_LENGTH).fill(""));
    setError("");
    setLoading("sending");

    try {
      await sendOtp(phone);
    } catch {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading("");
    }
  }, [phone, sendOtp]);

  const cancel = useCallback(() => {
    pendingSubmitRef.current = null;
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    resendTimerRef.current = null;
    setVisible(false);
    setLoading("");
    setError("");
    setDigits(Array(OTP_LENGTH).fill(""));
    setResendSeconds(0);
  }, []);

  return (
    <OtpContext.Provider value={{ request }}>
      {children}
      <OtpVerificationModal
        visible={visible}
        phone={phone}
        digits={digits}
        onChangeDigit={handleDigitChange}
        onVerify={verify}
        onResend={resend}
        onCancel={cancel}
        loading={loading}
        error={error}
        resendSeconds={resendSeconds}
      />
    </OtpContext.Provider>
  );
}

export function useOtpVerification() {
  const ctx = useContext(OtpContext);
  if (!ctx) {
    throw new Error(
      "useOtpVerification must be used within OtpVerificationProvider",
    );
  }
  return ctx;
}
