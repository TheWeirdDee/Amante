"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-transparent">
                {/* Logo */}
                <div className="flex flex-col group cursor-pointer">
                    <h1 className="font-serif text-3xl md:text-4xl font-medium leading-none tracking-tight text-white/90">
                        Amante
                    </h1>
                    <div className="flex items-center justify-end gap-2 mt-1">
                        <div className="h-[1px] w-6 bg-brand-orange"></div>
                        <span className="text-[10px] tracking-[0.3em] font-medium uppercase text-brand-orange">
                            Comfort
                        </span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="#" className="bg-brand-orange hover:bg-orange-500 text-brand-brown font-bold text-xs px-6 py-2 rounded-full transition-all">
                        FURNITURE
                    </Link>
                    <Link href="#" className="bg-brand-orange hover:bg-orange-500 text-brand-brown font-bold text-xs px-6 py-2 rounded-full transition-all">
                        CONTACT US
                    </Link>
                    <Link href="#" className="bg-brand-orange hover:bg-orange-500 text-brand-brown font-bold text-xs px-6 py-2 rounded-full transition-all">
                        ABOUT US
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-brand-brown/95 backdrop-blur-md p-6 flex flex-col items-center space-y-4 md:hidden border-t border-brand-orange/20">
                    <Link href="#" className="text-white font-bold tracking-wider">FURNITURE</Link>
                    <Link href="#" className="text-white font-bold tracking-wider">CONTACT US</Link>
                    <Link href="#" className="text-white font-bold tracking-wider">ABOUT US</Link>
                </div>
            )}
        </nav>
    );
}
