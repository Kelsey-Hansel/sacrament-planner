"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={isActive ? "text-gray-400" : "text-white-600 hover:text-gray-700"}>
            {children}
        </Link>
    );
}