import { getMeetingById } from "@/lib/meetings-db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const paramsObject = await params;
    const meetingId = parseInt(paramsObject.id, 10);
    if (isNaN(meetingId)) {
      return Response.json("Invalid meeting ID", { status: 400 });
    }
    const meeting = await getMeetingById(meetingId);
    if (!meeting) {
      return Response.json("Meeting not found", { status: 404 });
    }
    return Response.json(meeting, { status: 200 });
  } catch (error) {
    return Response.json(`Internal Server Error: ${error}`, { status: 500 });
  }
}