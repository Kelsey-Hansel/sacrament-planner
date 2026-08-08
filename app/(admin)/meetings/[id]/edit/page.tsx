import React from "react";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

export default async function AdminEdit(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return <section className="text-black"><h1>Loading...</h1></section>;
  }

  const initialData = await getMeetingById(id);

  if (!initialData) {
	  notFound();
  }

  return (
    <section className="text-black">
      <h1>Edit Meeting</h1>
      <form action={updateMeeting.bind(null, id)}>
          <label htmlFor="date">Date</label>
          <input 
            id="date" 
            name="date" 
            type="date" 
            required 
            defaultValue={initialData.date} 
          />

          <label htmlFor="meetingType">Meeting Type</label>
          <select 
            id="meetingType" 
            name="meetingType" 
            required 
            defaultValue={initialData.meetingType ?? 'regular'}
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>

          <label htmlFor="presiding">Presiding</label>
          <input 
            id="presiding" 
            name="presiding" 
            required 
            defaultValue={initialData.presiding} 
          />

          <label htmlFor="conducting">Conducting</label>
          <input 
            id="conducting" 
            name="conducting" 
            required 
            defaultValue={initialData.conducting} 
          />

          <label htmlFor="announcements">Announcements</label>
          <textarea 
            id="announcements" 
            name="announcements" 
            rows={3} 
            defaultValue={initialData.announcements ? JSON.stringify(initialData.announcements) : '["Ward announcements"]'} 
          />

          <label htmlFor="openingHymn">Opening Hymn</label>
          <textarea 
            id="openingHymn" 
            name="openingHymn" 
            rows={2} 
            required 
            defaultValue={initialData.openingHymn ? JSON.stringify(initialData.openingHymn) : '{"number":1,"title":"The Spirit of God"}'} 
          />

          <label htmlFor="openingPrayer">Opening Prayer</label>
          <input 
            id="openingPrayer" 
            name="openingPrayer" 
            required 
            defaultValue={initialData.openingPrayer} 
          />

          <label htmlFor="wardBusiness">Ward Business</label>
          <textarea 
            id="wardBusiness" 
            name="wardBusiness" 
            rows={3} 
            defaultValue={initialData.wardBusiness ? JSON.stringify(initialData.wardBusiness) : '[{"description":"Ward business item"}]'} 
          />

          <input 
            id="stakeBusiness" 
            name="stakeBusiness" 
            type="checkbox" 
            value="true" 
            defaultChecked={initialData.stakeBusiness ?? false} 
          />
          <label htmlFor="stakeBusiness">Stake Business</label>

          <label htmlFor="sacramentHymn">Sacrament Hymn</label>
          <textarea 
            id="sacramentHymn" 
            name="sacramentHymn" 
            rows={2} 
            required 
            defaultValue={initialData.sacramentHymn ? JSON.stringify(initialData.sacramentHymn) : '{"number":2,"title":"Praise to the Man"}'} 
          />

          <label htmlFor="speakers">Speakers</label>
          <textarea 
            id="speakers" 
            name="speakers" 
            rows={4} 
            required 
            defaultValue={initialData.speakers ? JSON.stringify(initialData.speakers) : '[{"name":"Alec Jensen","topic":"Faith","type":"speaker"}]'} 
          />

          <label htmlFor="closingHymn">Closing Hymn</label>
          <textarea 
            id="closingHymn" 
            name="closingHymn" 
            rows={2} 
            required 
            defaultValue={initialData.closingHymn ? JSON.stringify(initialData.closingHymn) : '{"number":3,"title":"Now Let Us Rejoice"}'} 
          />

          <label htmlFor="closingPrayer">Closing Prayer</label>
          <input 
            id="closingPrayer" 
            name="closingPrayer" 
            required 
            defaultValue={initialData.closingPrayer} 
          />

        <button type="submit">Save Meeting</button>
      </form>
    </section>
  );
}
