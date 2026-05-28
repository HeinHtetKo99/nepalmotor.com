import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleVehicleListingSubmission } from "@/lib/submit-vehicle-listing";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleVehicleListingSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
