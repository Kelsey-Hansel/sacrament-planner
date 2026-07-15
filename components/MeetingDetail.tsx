import { SacramentMeeting } from "@/lib/types";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingDetailProps {
    id: number;
}

async function getMeetingDetails(id: number): Promise<SacramentMeeting | null> {
    return getMeetingById(id);
}

export default async function MeetingDetail({ id }: MeetingDetailProps) {
    const meeting = await getMeetingDetails(id);
    if (!meeting) {
        return <div>Meeting not found</div>;
    }
    return (
        <div>
            <h2>Sacrament Meeting on {meeting.date}</h2>
            <p>Presiding: {meeting.presiding}</p>
            <p>Conducting: {meeting.conducting}</p>
            <p>Opening Hymn: {meeting.openingHymn.title}</p>
            <p>Opening Prayer: {meeting.openingPrayer}</p>
            {meeting.wardBusiness && (
                <div>
                    <h3>Ward Business</h3>
                    <ul>
                        {meeting.wardBusiness.map((item, index) => (
                            <li key={index}>{item.description}</li>
                        ))}
                    </ul>
                </div>
            )}
            {meeting.stakeBusiness && <p>Stake Business: Yes</p>}
            <p>Sacrament Hymn: {meeting.sacramentHymn.title}</p>
            <h3>Speakers</h3>
            <ul>
                {meeting.speakers.map((speaker, index) => (
                    <li key={index}>
                        {speaker.name} - {speaker.topic} ({speaker.type})
                    </li>
                ))}
            </ul>
            <p>Closing Hymn: {meeting.closingHymn.title}</p>
            <p>Closing Prayer: {meeting.closingPrayer}</p>
        </div>
    );
}