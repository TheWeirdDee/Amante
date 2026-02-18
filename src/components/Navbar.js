"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const LOGO_CHARS = "Amante".split("");

export default function Navbar({ primaryColor = "#FFFFFF", secondaryColor = "#FFA53C", isGray = false, isRed = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const charRefs = useRef([]);
    const logoRef = useRef(null);

    const navLinkBg = isGray ? "#A5A5A5" : isRed ? "#FFA53C" : secondaryColor;
    const navLinkText = isGray ? "#262626" : isRed ? "#901317" : "#5C3A1E";
    const comfortLineColor = isGray ? "#A5A5A5" : isRed ? "#FFA53C" : secondaryColor;

    // Entrance animation: chars drop in with stagger
    useEffect(() => {
        if (charRefs.current.length === 0) return;
        gsap.fromTo(
            charRefs.current,
            { y: -40, opacity: 0, rotateX: -90 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.7,
                stagger: 0.07,
                ease: "back.out(1.7)",
                delay: 0.1,
            }
        );
    }, []);

    // Hover: wave effect on chars
    const handleLogoEnter = () => {
        gsap.to(charRefs.current, {
            y: -6,
            duration: 0.25,
            stagger: 0.05,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
        });
    };

    return (
        <nav className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-transparent">
                {/* Logo */}
                <div
                    ref={logoRef}
                    className="flex flex-col group cursor-pointer"
                    onMouseEnter={handleLogoEnter}
                >
                    <h1
                        className="font-serif text-3xl md:text-4xl font-medium leading-none tracking-tight text-white/90 flex"
                        style={{ perspective: "400px" }}
                    >
                        {LOGO_CHARS.map((char, i) => (
                            <span
                                key={i}
                                ref={(el) => (charRefs.current[i] = el)}
                                style={{ display: "inline-block", transformOrigin: "top center" }}
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                    <div className="flex items-center justify-end gap-2">
                        <div
                            className="h-[3px] w-14 transition-colors duration-500"
                            style={{ backgroundColor: comfortLineColor }}
                        ></div>
                        <span className="text-[10px] tracking-[0.3em] font-medium uppercase text-white">
                            Comfort
                        </span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    {["FURNITURE", "CONTACT US", "ABOUT US"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="font-bold text-xs px-6 py-2 rounded-full transition-all hover:brightness-110 duration-500"
                            style={{ backgroundColor: navLinkBg, color: navLinkText }}
                        >
                            {item}
                        </Link>
                    ))}
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
                <div className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md p-6 flex flex-col items-center space-y-4 md:hidden border-t border-white/10">
                    <Link href="#" className="text-white font-bold tracking-wider">FURNITURE</Link>
                    <Link href="#" className="text-white font-bold tracking-wider">CONTACT US</Link>
                    <Link href="#" className="text-white font-bold tracking-wider">ABOUT US</Link>
                </div>
            )}
        </nav>
    );
}
