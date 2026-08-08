import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacrament Planner All Meetings Page",
  description: "Sacrament Meeting Planner for LDS Wards, view all the meetings currently in the planner.",
};

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function MeetingsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query ?? "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="p-4">
      <div>
        <h1 className="text-3xl font-bold p-2">All Meetings</h1>
        <p className="p-2">See all meetings.</p>

        <MeetingSearch />
        <MeetingCard meetings={meetings} />
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}