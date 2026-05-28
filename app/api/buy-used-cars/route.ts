import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleBuyUsedCarsSubmission } from "@/lib/submit-buy-used-cars";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleBuyUsedCarsSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
