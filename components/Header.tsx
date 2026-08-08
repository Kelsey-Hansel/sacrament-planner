import NavLinks from "@/components/NavLinks";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/SignOutButton";

export const dynamic = 'force-dynamic';

export default async function Header() {
    const session = await auth();
    const user = session?.user;

    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between">
            <div id="header-title" className="text-xl font-bold">
                YSA Ward | {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}
            </div>
            <nav className="flex justify-between items-center">
                <ul className="flex gap-4">
                    <li><NavLinks href="/">Home</NavLinks></li>
                    <li><NavLinks href="/meetings">All Meetings</NavLinks></li>
                    <li><NavLinks href="/meetings/current">Current Meeting</NavLinks></li>
                    {user && (
                        <SignOutButton />
                    )}
                    {!user && (
                        <li><NavLinks href="/login">Sign In</NavLinks></li>
                    )}
                </ul>
            </nav>
        </header>
  );
}