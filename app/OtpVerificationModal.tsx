"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const OTP_LENGTH = 4;

function PhonePortraitIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 512 512" fill="none" aria-hidden>
      <rect
        x="128"
        y="48"
        width="256"
        height="416"
        rx="48"
        ry="48"
        stroke="#075985"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M176 176h160M176 272h160"
        stroke="#075985"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type OtpLoadingState = "" | "sending" | "verifying";

export type OtpVerificationModalProps = {
  visible: boolean;
  phone: string;
  digits: string[];
  onChangeDigit: (digit: string, index: number) => void;
  onVerify: () => void;
  onResend: () => void;
  onCancel: () => void;
  loading: OtpLoadingState;
  error: string;
  resendSeconds: number;
};

export function OtpVerificationModal({
  visible,
  phone,
  digits,
  onChangeDigit,
  onVerify,
  onResend,
  onCancel,
  loading,
  error,
  resendSeconds,
}: OtpVerificationModalProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(OTP_LENGTH).fill(null),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maskedPhone = phone
    ? `${phone.slice(0, 2)}****${phone.slice(-4)}`
    : "";

  const isComplete = digits.every((d) => d !== "");

  const handleDigitChange = useCallback(
    (text: string, index: number) => {
      const digit = text.replace(/[^0-9]/g, "").slice(-1);
      onChangeDigit(digit, index);
      if (digit && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [onChangeDigit],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !digits[index] && index > 0) {
        onChangeDigit("", index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits, onChangeDigit],
  );

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => inputRefs.current[0]?.focus());
    }
  }, [visible]);

  if (!mounted || !visible) return null;

  return createPortal(
    <div className="nm-otp-overlay" role="presentation">
      <button
        type="button"
        className="nm-otp-scrim"
        aria-label="Close verification"
        onClick={onCancel}
      />
      <div
        className="nm-otp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nm-otp-title"
      >
        <div className="nm-otp-header">
          <h2 id="nm-otp-title" className="nm-otp-title">
            Verify Your Number
          </h2>
          <button
            type="button"
            className="nm-otp-close"
            onClick={onCancel}
            aria-label="Close OTP verification"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="nm-otp-icon-wrap">
          <PhonePortraitIcon />
        </div>

        <p className="nm-otp-subtitle">
          A 4-digit verification code was sent to
        </p>
        <p className="nm-otp-phone">+977 {maskedPhone}</p>

        <div className="nm-otp-box-row">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              className={[
                "nm-otp-box",
                digit ? "nm-otp-box-filled" : "",
                error ? "nm-otp-box-error" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              value={digit}
              onChange={(e) => handleDigitChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={2}
              aria-label={`OTP digit ${i + 1}`}
            />
          ))}
        </div>

        {error ? <p className="nm-otp-error">{error}</p> : null}

        <button
          type="button"
          className={[
            "nm-otp-verify",
            !isComplete || loading ? "nm-otp-verify-disabled" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={onVerify}
          disabled={!isComplete || !!loading}
        >
          {loading === "verifying" ? "Verifying..." : "Verify & Submit"}
        </button>

        <div className="nm-otp-resend-row">
          {resendSeconds > 0 ? (
            <p className="nm-otp-resend-timer">
              Resend code in {resendSeconds}s
            </p>
          ) : (
            <button
              type="button"
              className="nm-otp-resend-link"
              onClick={onResend}
              disabled={!!loading}
            >
              {loading === "sending" ? "Sending..." : "Resend code"}
            </button>
          )}
        </div>

        <p className="nm-otp-note">
          Code expires in 10 minutes · Check your SMS messages
        </p>
      </div>
    </div>,
    document.body,
  );
}
