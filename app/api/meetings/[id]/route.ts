import { getMeetingById } from "@/lib/meetings-db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const paramsObject = await params;
    const meetingId = parseInt(paramsObject.id, 10);
    if (isNaN(meetingId)) {
      return new Response("Invalid meeting ID", { status: 400 });
    }
    const meeting = await getMeetingById(meetingId);
    if (!meeting) {
      return new Response("Meeting not found", { status: 404 });
    }
    return Response.json(meeting, { status: 200 });
  } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
}