import { createMeeting } from '@/lib/actions';

export default function AdminNew() {
  return (
    <section className="text-black">
      <h1 className="text-2xl font-bold">Add A New Meeting</h1>
      <form action={createMeeting} >
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" required />

          <label htmlFor="meetingType">Meeting Type</label>
          <select id="meetingType" name="meetingType" required>
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>

          <label htmlFor="presiding">Presiding</label>
          <input id="presiding" name="presiding" required />

          <label htmlFor="conducting">Conducting</label>
          <input id="conducting" name="conducting" required />

          <label htmlFor="announcements">Announcements</label>
          <textarea id="announcements" name="announcements" rows={3} defaultValue='["Ward announcements"]' />

          <label htmlFor="openingHymn">Opening Hymn</label>
          <textarea id="openingHymn" name="openingHymn" rows={2} required defaultValue='{"number":1,"title":"The Spirit of God"}' />

          <label htmlFor="openingPrayer">Opening Prayer</label>
          <input id="openingPrayer" name="openingPrayer" required />

          <label htmlFor="wardBusiness">Ward Business</label>
          <textarea id="wardBusiness" name="wardBusiness" rows={3} defaultValue='[{"description":"Ward business item"}]' />

          <input id="stakeBusiness" name="stakeBusiness" type="checkbox" value="true" />
          <label htmlFor="stakeBusiness">Stake Business</label>

          <label htmlFor="sacramentHymn">Sacrament Hymn</label>
          <textarea id="sacramentHymn" name="sacramentHymn" rows={2} required defaultValue='{"number":2,"title":"Praise to the Man"}' />

          <label htmlFor="speakers">Speakers</label>
          <textarea id="speakers" name="speakers" rows={4} required defaultValue='[{"name":"Alec Jensen","topic":"Faith","type":"speaker"}]' />

          <label htmlFor="closingHymn">Closing Hymn</label>
          <textarea id="closingHymn" name="closingHymn" rows={2} required defaultValue='{"number":3,"title":"Now Let Us Rejoice"}' />

          <label htmlFor="closingPrayer">Closing Prayer</label>
          <input id="closingPrayer" name="closingPrayer" required />

        <button type="submit">Save Meeting</button>
      </form>
    </section>
  );
}