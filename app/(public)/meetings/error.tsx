'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset
}: {
    error: Error & { digest: string };
    reset: () => void
    }) {
    useEffect(() => {
        console.error("An uncaught error occurred:", error)
    }, [error]);

    return (
        <section>
            <h1>Something went wrong!</h1>
            <p>An unexpected error has shown up. Please try again.</p>
            <div>
                <button onClick={reset}>Try Again</button>
                <Link href="/meetings">Back to Meetings</Link>
            </div>
        </section>
    );
}