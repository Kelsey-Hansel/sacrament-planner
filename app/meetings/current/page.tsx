import MeetingDetails from "@/components/MeetingDetail";
import { getMeetings } from "@/lib/meetings-db";


  const currentDate = new Date();
  const upcomingSunday = new Date(currentDate);

  const daysUntilSunday = (7 - currentDate.getDay()) % 7 || 7;
  upcomingSunday.setDate(currentDate.getDate() + daysUntilSunday);

  const currentSunday = upcomingSunday.toLocaleDateString("en-CA")

export default async function CurrentMeeting() {
    

    const upcomingMeeting = getMeetings(currentSunday);
    const currentMeeting = upcomingMeeting[0];
    return (
    <section className="p-4">
      <div>
        <h1 className="text-3xl font-bold p-2">Current Meeting</h1>
        <p className="p-2">The meeting details for {currentSunday}.</p>
        <MeetingDetails meeting={currentMeeting} />
      </div>
    </section>
    
  );
}