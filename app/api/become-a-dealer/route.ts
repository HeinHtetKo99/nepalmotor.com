import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleBecomeADealerSubmission } from "@/lib/submit-become-a-dealer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleBecomeADealerSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
