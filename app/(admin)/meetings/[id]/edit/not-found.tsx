import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
    return (
        <section>
            <h1>Meeting Not Found</h1>
            <p>The meeting you are trying to reach has not been created.</p>
            <div>
                <Link href="/meetings">Back to Meetings</Link>
            </div>
        </section>
    );
}