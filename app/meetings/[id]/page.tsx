import MeetingDetails from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MeetingHome({ params }: Props) {
    const { id } = await params;
    const meetingId = parseInt(id, 10);
    const meetingDetails = getMeetingById(meetingId);

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