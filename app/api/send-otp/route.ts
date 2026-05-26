import { handleOtpOptions, handleSendOtp } from "@/lib/otp-service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleSendOtp(request);
}

export async function OPTIONS() {
  return handleOtpOptions();
}
