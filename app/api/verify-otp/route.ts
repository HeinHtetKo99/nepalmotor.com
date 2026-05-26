import { handleOtpOptions, handleVerifyOtp } from "@/lib/otp-service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleVerifyOtp(request);
}

export async function OPTIONS() {
  return handleOtpOptions();
}
