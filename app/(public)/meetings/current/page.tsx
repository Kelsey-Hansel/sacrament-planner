import MeetingDetail from "@/components/MeetingDetail";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CurrentMeeting() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const daysUntilSunday = currentDay === 0 ? 0 : 7 - currentDay;
  
  const upcomingSunday = new Date(currentDate);
  upcomingSunday.setDate(currentDate.getDate() + daysUntilSunday);
  
  const year = upcomingSunday.getFullYear();
  const month = String(upcomingSunday.getMonth() + 1).padStart(2, "0");
  const day = String(upcomingSunday.getDate()).padStart(2, "0");
  const currentSunday = `${year}-${month}-${day}`;
  

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";

  const protocol = host.includes("localhost") ? "http" : "https";  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(
    `${baseUrl}/api/meetings?date=${encodeURIComponent(currentSunday)}`,
    { 
      cache: "no-store",
      headers: {
        "host": host 
      }
    }
  );

  if (!response.ok) {
    console.error(`API response failed with status ${response.status}`);
    return (
      <section className="p-4">
        <p className="text-red-500">Failed to communicate with the meetings service.</p>
      </section>
    );
  }
  
  const upcomingMeetings = await response.json();
  const currentMeeting = upcomingMeetings[0];
  
  if (!currentMeeting) {
    return (
      <section className="p-4">
        <p>No meeting scheduled for Sunday, {currentSunday}.</p>
      </section>
    );
  }
  
  return (
    <section className="p-4">
      <div>
        <h1 className="text-3xl font-bold p-2">Current Meeting</h1>
        <p className="p-2">The meeting details for {currentSunday}.</p>
        <MeetingDetail meeting={currentMeeting} />
      </div>
    </section>
  );
}
