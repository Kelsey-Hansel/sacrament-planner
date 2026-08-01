import { neon } from '@neondatabase/serverless';
import { SacramentMeeting } from "@/lib/types";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const isDateQuery = /^\d{4}-\d{2}-\d{2}$/.test(query);

  const selectClause = sql`
    SELECT 
      id, 
      to_char(date, 'YYYY-MM-DD') AS "date", 
      meeting_type AS "meetingType", 
      presiding, 
      conducting, 
      announcements, 
      opening_hymn AS "openingHymn", 
      opening_prayer AS "openingPrayer", 
      ward_business AS "wardBusiness", 
      stake_business AS "stakeBusiness", 
      sacrament_hymn AS "sacramentHymn", 
      speakers, 
      closing_hymn AS "closingHymn", 
      closing_prayer AS "closingPrayer"
    FROM meetings
  `;

  if (isDateQuery) {
    return await sql`
      ${selectClause}
      WHERE date = ${query}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    ` as unknown as SacramentMeeting[];
  } else {
    const searchTerm = `%${query}%`;
    return await sql`
      ${selectClause}
      WHERE presiding ILIKE ${searchTerm}
         OR conducting ILIKE ${searchTerm}
         OR meeting_type ILIKE ${searchTerm}
         OR speakers::text ILIKE ${searchTerm}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    ` as unknown as SacramentMeeting[];
  }
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting( data: Omit<SacramentMeeting, 'id'> ): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date, 
      meeting_type, 
      presiding, 
      conducting, 
      announcements, 
      opening_hymn, 
      opening_prayer, 
      ward_business, 
      stake_business, 
      sacrament_hymn, 
      speakers, 
      closing_hymn, 
      closing_prayer
    ) 
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${JSON.stringify(data.announcements ?? [])},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness ?? [])},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers)},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
    RETURNING *;
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function editMeeting( id: number, updates: Partial<SacramentMeeting> ): Promise<SacramentMeeting | null> {
  const rows = await sql`
    UPDATE meetings 
    SET
      date = COALESCE(${updates.date}, date), 
      meeting_type = COALESCE(${updates.meetingType}, meeting_type), 
      presiding = COALESCE(${updates.presiding}, presiding), 
      conducting = COALESCE(${updates.conducting}, conducting), 
      announcements = COALESCE(${updates.announcements}, announcements), 
      opening_hymn = COALESCE(${updates.openingHymn}, opening_hymn), 
      opening_prayer = COALESCE(${updates.openingPrayer}, opening_prayer), 
      ward_business = COALESCE(${updates.wardBusiness}, ward_business), 
      stake_business = COALESCE(${updates.stakeBusiness}, stake_business), 
      sacrament_hymn = COALESCE(${updates.sacramentHymn}, sacrament_hymn), 
      speakers = COALESCE(${updates.speakers}, speakers), 
      closing_hymn = COALESCE(${updates.closingHymn}, closing_hymn), 
      closing_prayer = COALESCE(${updates.closingPrayer}, closing_prayer)
    WHERE id = ${id}
    RETURNING *;
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function removeMeeting(id: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id;
  `;

  return rows.length > 0;
}