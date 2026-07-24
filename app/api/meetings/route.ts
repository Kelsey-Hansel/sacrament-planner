import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const meetings = await getMeetings(date ?? '');

  return Response.json(meetings);
}