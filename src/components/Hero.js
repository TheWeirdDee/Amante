"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import sofaImg from "../../public/images/BrownSofa.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const sofaRef = useRef(null);
    const bgShapeRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                textRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.2 }
            )
                .fromTo(
                    sofaRef.current,
                    { x: 100, opacity: 0, scale: 0.9 },
                    { x: 0, opacity: 1, scale: 1, duration: 1.2 },
                    "-=0.8"
                )
                .fromTo(
                    bgShapeRef.current,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" },
                    "-=1.2"
                );

            gsap.to(sofaRef.current, {
                y: -15,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div ref={textRef} className="z-10 flex flex-col items-start">
                    <h2 className="text-white text-5xl md:text-7xl font-bold leading-tight uppercase mb-4">
                        Make <span className="font-serif italic text-brand-orange">Luxury</span> Your <br />
                        Home <span className="text-3xl md:text-5xl font-light">With Our 50%</span> <br />
                        Discount Offer
                    </h2>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <button className="bg-brand-orange text-brand-brown px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-brand-brown transition-colors duration-300">
                            Buy Now
                        </button>
                        <button className="border border-brand-orange text-brand-orange px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-brand-orange hover:text-brand-brown transition-colors duration-300">
                            Explore
                        </button>
                    </div>
                </div>

                {/* Right Content */}
                <div className="relative z-10 flex justify-center items-center h-[50vh] md:h-auto">
                    <div
                        ref={bgShapeRef}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl"
                    ></div>

                    {/* Sofa Image */}
                    <div ref={sofaRef} className="relative w-full aspect-[4/3]">
                        <div className="absolute top-0 right-0 z-20 bg-brand-orange/90 text-brand-brown text-xs font-bold px-4 py-2 uppercase transform translate-x-4 -translate-y-4">
                            L-Shape Full Family Sofa
                        </div>
                        <Image
                            src="/images/BrownSofa.png" // Path relative to the public folder
                            alt="Luxury Brown Sofa"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}