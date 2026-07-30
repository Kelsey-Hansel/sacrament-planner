import MeetingDetails from "@/components/MeetingDetail";
import { SacramentMeeting } from "@/lib/types";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MeetingDetailsPage({ params }: Props) {
  const { id } = await params;
  const meetingId = Number.parseInt(id, 10);

  if (Number.isNaN(meetingId)) {
    return <p className="p-4">Invalid meeting ID.</p>;
  }

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";

  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/meetings/${meetingId}`, {
    cache: "no-store",
    headers: {
      "host": host
    }
  });

  if (!response.ok) {
    console.error(`API response failed with status ${response.status}`);
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