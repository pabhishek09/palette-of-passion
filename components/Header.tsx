"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Artworks", href: "/artworks" },
        { name: "Workshops", href: "/workshops" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const currentPath = usePathname();

    const activeNavItem = navItems.find(item => item.href === currentPath);

    return (
        <header className="w-full">
            <div className="w-full relative py-4 px-4 md:px-0">
                <div className="flex justify-center">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={256}
                        height={64}
                        priority
                    />
                </div>

                {/* hamburger button (mobile) */}
                <button
                    onClick={() => setIsOpen((s) => !s)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    className="md:hidden absolute right-4 top-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            <nav className="w-full">
                {/* Desktop nav */}
                <ul className="hidden md:flex justify-center items-center space-x-8 pb-4">
                    {navItems.map((item) => (
                        <li key={item.name} className={`px-12 py-2 rounded-md font-medium transform transition-transform duration-150 ease-out hover:scale-110 ${activeNavItem?.name === item.name ? 'underline decoration-2 underline-offset-2' : ''}`}>
                            <a href={item.href} className="text-gray-700 dark:text-white">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu (collapsible) */}
                {isOpen && (
                    <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
                        <ul className="flex flex-col items-center space-y-2 py-4">
                            {navItems.map((item) => (
                                <li key={item.name} className={`w-full text-center px-4 py-2 font-medium ${activeNavItem?.name === item.name ? 'underline underline-offset-4' : ''}`}>
                                    <a href={item.href} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-white block w-full">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
