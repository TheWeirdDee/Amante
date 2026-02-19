"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ theme, product, isGray = false, isRed = false, isBlue = false, flipTriggerRef }) {
    const containerRef = useRef(null);
    const sofaWrapRef = useRef(null);
    const textRef = useRef(null);
    const bgShapeRef = useRef(null);
    const floatTweenRef = useRef(null);

    useEffect(() => {
        if (flipTriggerRef) {
            flipTriggerRef.current = (onMidpoint, onComplete) => {
                const sofa = sofaWrapRef.current;
                const text = textRef.current;
                if (!sofa) return;


                if (floatTweenRef.current) floatTweenRef.current.kill();
                gsap.set(sofa, { y: 0 });

                const tl = gsap.timeline();

                tl.to(sofa, {
                    rotateY: 90,
                    duration: 0.36,
                    ease: "power2.in",
                })
                    .to(text, {
                        x: -24,
                        opacity: 0,
                        duration: 0.28,
                        ease: "power2.in",
                    }, "<")


                    .add(() => {
                        if (onMidpoint) onMidpoint();
                    })

                    .fromTo(sofa,
                        { rotateY: -90 },
                        {
                            rotateY: 0,
                            duration: 0.4,
                            ease: "power2.out",
                        }
                    )
                    .fromTo(text,
                        { x: 24, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.36,
                            ease: "power2.out",
                        },
                        "<0.04"
                    )
                    .add(() => {

                        floatTweenRef.current = gsap.to(sofa, {
                            y: -15,
                            duration: 2.5,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                        });
                        if (onComplete) onComplete();
                    });
            };
        }
    }, [flipTriggerRef]);


    useEffect(() => {
        const sofa = sofaWrapRef.current;
        const text = textRef.current;
        if (!sofa || !text) return;


        gsap.set(sofa, { rotateY: 0, scaleX: 1, y: 0, opacity: 1 });
        gsap.set(text, { x: 0, opacity: 1 });

        gsap.fromTo(sofa,
            { rotateY: -80, scaleX: 0.6, opacity: 0 },
            { rotateY: 0, scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
        );

        gsap.fromTo(Array.from(text.children),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.3 }
        );

        floatTweenRef.current = gsap.to(sofa, {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.1,
        });

        return () => {
            if (floatTweenRef.current) floatTweenRef.current.kill();
        };
    }, []);

    if (!product || !theme) return null;

    return (
        <section
            ref={containerRef}
            className="relative z-20 w-full flex items-center pt-20"
            style={{ perspective: "1200px" }}
        >
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-2 items-center">

                {/* Left Content */}
                <div ref={textRef} className="z-10 flex flex-col items-start">
                    <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight uppercase mb-4">
                        Make <span className="font-serif italic" style={{ color: isRed ? "white" : theme.secondary }}>Luxury</span> Your <br />
                        Home <span className="text-3xl md:text-5xl font-light">With Our 50%</span> <br />
                        Discount Offer
                    </h2>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <button
                            className="px-8 py-3 text-lg tracking-widest uppercase hover:brightness-110 transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: isGray ? "#A5A5A5" : isRed ? "#FFA53C" : theme.secondary,
                                color: isGray ? "#262626" : isRed ? "#901317" : isBlue ? "white" : theme.primary
                            }}
                        >
                            Buy Now
                        </button>
                        <button
                            className="border px-8 py-3 text-lg tracking-widest uppercase transition-all duration-300 hover:bg-white/10"
                            style={{
                                borderColor: isGray ? "#A5A5A5" : isRed ? "#FFA53C" : theme.secondary,
                                color: isGray ? "#A5A5A5" : isRed ? "#FFA53C" : isBlue ? "white" : theme.secondary
                            }}
                        >
                            Explore
                        </button>
                    </div>
                </div>

                <div className="relative z-10 flex justify-center items-center h-[50vh] md:h-auto translate-y-20 md:translate-y-34">
                    <div
                        ref={bgShapeRef}
                        className="absolute top-1/ 2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-3xl transition-colors duration-1000"
                        style={{ background: `radial-gradient(circle, ${theme.secondary}20 0%, transparent 70%)` }}
                    ></div>

                    <div
                        ref={sofaWrapRef}
                        className="relative w-full aspect-[4/3] hero-sofa-container"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div
                            className="absolute md:top-5 top-5 right-10 z-20 text-md font-bold px-4 md:py-3 py-2 uppercase transform translate-x-4 -translate-y-4 shadow-lg transition-colors duration-500"
                            style={{
                                backgroundColor: isGray ? "#A5A5A5" : isRed ? "#FFA53C" : theme.secondary,
                                color: isGray ? "#262626" : isRed ? "#901317" : isBlue ? "white" : theme.primary
                            }}
                        >
                            {product.name}
                        </div>
                        <Image
                            id="hero-image"
                            src={product.image}
                            alt={product.name}
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