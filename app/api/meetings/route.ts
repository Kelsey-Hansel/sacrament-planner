import { getMeetings } from "@/lib/meetings-db";

export async function GET() {
  const meetings = getMeetings();
  return Response.json(meetings);
}