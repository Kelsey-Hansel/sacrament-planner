import { SacramentMeeting } from "@/lib/types";
import Link from "next/link";

interface MeetingCardProps {
    meetings: SacramentMeeting[];
}

export default function MeetingCard({ meetings }: MeetingCardProps) {
    return (
        <section className="grid gap-4 p-8 md:grid-cols-2 text-white"> {meetings.map((meeting) => (
            <article key={meeting.id} className="p-10 border border-blue-600 bg-sky-500 rounded">
                <h3 className="text-xl font-bold">Sacrament Meeting on {meeting.date}</h3>
                <p className="text-gray-300">The meeting will be a {meeting.meetingType} meeting.</p>
                <Link className=" hover:underline" href={`/meetings/${meeting.id}`}>View Meeting Details</Link>
            </article>
            ))}
        </section>
    );
}