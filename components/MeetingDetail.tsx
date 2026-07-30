import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting | null;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  if (!meeting) {
    return "Meeting not found";
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Sacrament Meeting on {meeting.date}
      </h2>

      <ul className="mt-6 space-y-3 text-slate-700">
        <li>
          <span className="font-medium text-slate-900">Presiding:</span>{" "}
          {meeting.presiding}
        </li>
        <li>
          <span className="font-medium text-slate-900">Conducting:</span>{" "}
          {meeting.conducting}
        </li>
        <li>
          <span className="font-medium text-slate-900">Opening Hymn:</span>{" "}
          {meeting.openingHymn.title}
        </li>
        <li>
          <span className="font-medium text-slate-900">Opening Prayer:</span>{" "}
          {meeting.openingPrayer}
        </li>

        {meeting.wardBusiness?.length ? (
          <li>
            <div className="rounded-lg bg-slate-50 p-3">
              <h3 className="font-semibold text-slate-900">Ward Business</h3>
              <ul className="mt-2 ml-4 list-disc space-y-1">
                {meeting.wardBusiness.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ul>
            </div>
          </li>
        ) : null}

        {meeting.stakeBusiness ? (
          <li>
            <span className="font-medium text-slate-900">Stake Business:</span>{" "}
            Yes
          </li>
        ) : null}

        <li>
          <span className="font-medium text-slate-900">Sacrament Hymn:</span>{" "}
          {meeting.sacramentHymn.title}
        </li>

        <li>
          <div className="rounded-lg bg-slate-50 p-3">
            <h3 className="font-semibold text-slate-900">Speakers</h3>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              {meeting.speakers.map((speaker, index) => (
                <li key={index}>
                  {speaker.name} - {speaker.topic} ({speaker.type})
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li>
          <span className="font-medium text-slate-900">Closing Hymn:</span>{" "}
          {meeting.closingHymn.title}
        </li>
        <li>
          <span className="font-medium text-slate-900">Closing Prayer:</span>{" "}
          {meeting.closingPrayer}
        </li>
      </ul>
    </div>
  );
}