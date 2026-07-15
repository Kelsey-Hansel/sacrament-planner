import { SacramentMeeting } from "@/lib/types";

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-07-19",
        meetingType: "regular",
        presiding: "James Adams",
        conducting: "Will Montgomery",
        announcements: ["We have a ward Temple trip scheduled for the last Saturday of the month. Please sign up if you are interested."],
        openingHymn: { number: 2, title: "The Spirit of God" },
        openingPrayer: "Sam Bush",
        wardBusiness: [
            { description: "We have recieved some records for the following members: Elizabeth and Nathan Brown. Please join us in welcoming them."},
        ],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
        speakers: [
            { name: "Alice Johnson", topic: "Blessings of Temple Attendance", type: "speaker" },
            { name: "Bob Smith", topic: "Finding Christ in Everything We Do", type: "speaker" }
        ],
        closingHymn: { number: 193, title: "I Stand All Amazed" },
        closingPrayer: "Susan Bush"
    },
    {
        id: 2,
        date: "2026-07-26",
        meetingType: "regular",
        presiding: "James Adams",
        conducting: "Will Montgomery",
        announcements: [],
        openingHymn: { number: 116, title: "Come, Follow Me" },
        openingPrayer: "Devon Vance",
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 180, title: "Father in Heaven, We Do Believe" },
        speakers: [
            { name: "Emma Sinclair", topic: "God's Love Is Not Conditional", type: "speaker" },
            { name: "Ethan Caldwell", topic: "The Importance of Personal Revelation", type: "speaker" }
        ],
        closingHymn: { number: 7, title: "Israel, Israel, God Is Calling" },
        closingPrayer: "Ava Vance"
    },
    {
        id: 3,
        date: "2026-08-02",
        meetingType: "testimony",
        presiding: "James Adams",
        conducting: "Mason Johnson",
        announcements: [],
        openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
        openingPrayer: "Marcus Hayes",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
        speakers: [
            { name: "Olivia Sterling", topic: "Piano Performance", type: "musical-number" },
        ],
        closingHymn: { number: 62, title: "All Creatures of Our God and King" },
        closingPrayer: "Mia Hayes"
    },
    {
        id: 4,
        date: "2026-08-09",
        meetingType: "regular",
        presiding: "James Adams",
        conducting: "Mason Johnson",
        announcements: ["We have a ward Temple trip scheduled for the last Saturday of the month. Please sign up if you are interested."],
        openingHymn: { number: 249, title: "Called to Serve" },
        openingPrayer: "Sophia Blackwood",
        wardBusiness: [
            { description: "Samuel Hans was baptized this week. Please join us in welcoming him."},
        ],
        stakeBusiness: false,
        sacramentHymn: { number: 183, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: "Owen Gallagher", topic: "Missionary Work", type: "speaker" },
            { name: "Lily Thorne", topic: "Every Member a Missionary", type: "speaker" }
        ],
        closingHymn: { number: 239, title: "Choose the Right" },
        closingPrayer: "Lucas Blackwood"
    },
    {
        id: 5,
        date: "2026-08-16",
        meetingType: "regular",
        presiding: "James Adams",
        conducting: "Mason Johnson",
        announcements: ["We have a ward Temple trip scheduled for the last Saturday of the month. Please sign up if you are interested."],
        openingHymn: { number: 30, title: "Come, Come, Ye Saints" },
        openingPrayer: "Ethan Caldwell",
        wardBusiness: [
            { description: "Samuel Hans has accepted a position of responsibility in the ward..."},
        ],
        stakeBusiness: true,
        sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
        speakers: [
            { name: "Ava Vance", topic: "The Power of Prayer", type: "speaker" },
            { name: "Devon Vance", topic: "Repentance and Prayer", type: "speaker" }
        ],
        closingHymn: { number: 140, title: "Did You Think to Pray?" },
        closingPrayer: "Ann Caldwell"
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) {
        return meetings.filter(meeting => meeting.date === date);
    }
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(meeting => meeting.id === id) ?? null;
}