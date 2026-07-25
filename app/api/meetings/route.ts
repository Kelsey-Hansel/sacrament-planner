import { getMeetings } from "@/lib/meetings-db";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    
    const meetings = await getMeetings(date ?? '');
    
    return Response.json(meetings, { status: 200 });
  } catch (error) {
    console.error("API Database Error:", error);
    return Response.json(
      { error: "Failed to fetch meetings from database" }, 
      { status: 500 }
    );
  }
}
