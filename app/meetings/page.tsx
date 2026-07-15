import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

const meetingsDetails = getMeetings();

export default function MeetingHome() {
  return (
    <section className="p-4">
      <div>
        <h1 className="text-3xl font-bold p-2">All Meetings</h1>
        <p className="p-2">See all meetings.</p>
              <MeetingCard meetings={meetingsDetails} />
      </div>
    </section>
    
  );
}