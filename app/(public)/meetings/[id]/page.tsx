import MeetingDetails from "@/components/MeetingDetail";
import { SacramentMeeting } from "@/lib/types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MeetingDetailsPage({ params }: Props) {
  const { id } = await params;
  const meetingId = Number.parseInt(id, 10);

  if (Number.isNaN(meetingId)) {
    return <p className="p-4">Invalid meeting ID.</p>;
  }

const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://localhost:3000");


  const response = await fetch(`${baseUrl}/api/meetings/${meetingId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return <p className="p-4">Meeting not found.</p>;
  }

  const meetingDetails: SacramentMeeting = await response.json();

  return (
    <section className="p-4">
      <div>
        <h1 className="text-3xl font-bold p-2">Individual Meeting</h1>
        <p className="p-2">Individual Meeting details.</p>
        <MeetingDetails meeting={meetingDetails} />
      </div>
    </section>
  );
}