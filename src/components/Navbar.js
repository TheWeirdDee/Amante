"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const LOGO_CHARS = "Amante".split("");

export default function Navbar({ primaryColor = "#FFFFFF", secondaryColor = "#FFA53C", isGray = false, isRed = false, isBlue = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const charRefs = useRef([]);
    const logoRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileLinkRefs = useRef([]);

    const navLinkBg = isGray ? "#A5A5A5" : isRed ? "#FFA53C" : secondaryColor;
    const navLinkText = isGray ? "#262626" : isRed ? "#901317" : isBlue ? "white" : "#5C3A1E";
    const comfortLineColor = isGray ? "#A5A5A5" : isRed ? "#FFA53C" : secondaryColor;

    // Helper to convert hex to rgba
    const hexToRgba = (hex, alpha) => {
        if (!hex) return `rgba(0, 0, 0, ${alpha})`;
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        return `rgba(${+r}, ${+g}, ${+b}, ${alpha})`;
    };

    const mobileMenuBg = hexToRgba(primaryColor, 0.95);

    // GSAP Timeline for Mobile Menu
    const menuTl = useRef(null);

    useEffect(() => {
        // Initialize timeline paused
        menuTl.current = gsap.timeline({ paused: true })
            .to(mobileMenuRef.current, {
                height: "auto",
                autoAlpha: 1,
                duration: 0.5,
                ease: "power3.inOut",
            })
            .from(mobileLinkRefs.current, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: "power2.out",
            }, "-=0.3");

        return () => {
            if (menuTl.current) menuTl.current.kill();
        };
    }, []);

    // Toggle Animation
    useEffect(() => {
        if (isOpen) {
            menuTl.current?.play();
        } else {
            menuTl.current?.reverse();
        }
    }, [isOpen]);

    // Logo Entrance Animation
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
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-transparent relative z-50">
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
                    className="md:hidden text-white z-50 relative"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className="absolute top-full left-0 w-full overflow-hidden invisible h-0 md:hidden border-t border-white/10 z-40 origin-top"
                style={{
                    backgroundColor: mobileMenuBg,
                    backdropFilter: "blur(12px)",
                }}
            >
                <div className="p-8 flex flex-col items-center space-y-6">
                    {["FURNITURE", "CONTACT US", "ABOUT US"].map((item, index) => (
                        <Link
                            key={item}
                            href="#"
                            ref={el => mobileLinkRefs.current[index] = el}
                            className="text-white font-bold tracking-wider text-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
