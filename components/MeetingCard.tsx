import { MeetingType } from "@/lib/types";
import { getMeetings } from "@/lib/meetings-db";
import Link from "next/link";

interface SacramentMeetingProps {
    id: number;
    date: string;
    meetingType: MeetingType;
}

const meetings = getMeetings();

export default function MeetingCard({ id, date, meetingType }: SacramentMeetingProps) {
    return (
        <section className="grid gap-4 p-8 md:grid-cols-2 text-white"> {meetings.map((meeting) => (
            <article className="p-10 border border-blue-600 bg-sky-500 rounded">
                <h3 className="text-xl font-bold">Sacrament Meeting on {date}</h3>
                <p className="text-gray-300">The meeting will be a {meetingType} meeting.</p>
                <Link className="text-gray-700 hover:underline" href={`/meetings/${id}`}>View Meeting Details</Link>
            </article>
            ))}
        </section>
    );
}