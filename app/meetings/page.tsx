import MeetingCard from "@/components/MeetingCard";
import { SacramentMeeting } from "@/lib/types";

type Props = {
  searchParams?: Promise<{
    date?: string | string[];
  }>;
};

export default async function MeetingHome({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const date =
    typeof resolvedSearchParams?.date === "string"
      ? resolvedSearchParams.date
      : Array.isArray(resolvedSearchParams?.date)
        ? resolvedSearchParams.date[0]
        : undefined;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://localhost:3000");

  const url = new URL(`${baseUrl}/api/meetings`);

  if (date) {
    url.searchParams.set("date", date);
  }

  const response = await fetch(url, {
    cache: "no-store",
  });

  const meetingsDetails: SacramentMeeting[] = await response.json();

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