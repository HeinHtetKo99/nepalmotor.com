import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleTestDriveSubmission } from "@/lib/submit-test-drive";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleTestDriveSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
