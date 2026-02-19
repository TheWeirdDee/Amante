"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Products({ products, theme, onProductClick, isGray = false, isRed = false, isBlue = false, isAnimating = false }) {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);


    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".bg-strip", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.5,
                ease: "power2.out",
            });

            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-white py-24 px-6 md:px-12 overflow-hidden">

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">

                    {/* Description */}
                    <div className="flex flex-col justify-center space-y-4">
                        <h3 className="text-3xl font-bold uppercase leading-tight transition-colors duration-500" style={{ color: theme.primary }}>
                            Why We Are Best <br /> In Our Town
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim
                            dictum orci id sit dui morbi. Pellentesque luctus felis cras adipiscing aliquet
                            eget facilisis odio.
                            <br />
                            In tortor, et proin placerat interdum massa amet nisi. Nisi sit tellus eget
                            facilisis adipiscing egestas libero.
                        </p>
                        <button
                            className="w-fit px-8 py-3 text-xs font-bold uppercase transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: isGray ? "#262626" : isRed ? "#901317" : theme.primary,
                                color: isGray ? "#A5A5A5" : isRed ? "#FFA53C" : "white"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = isGray ? "#A5A5A5" : isRed ? "#FFA53C" : theme.secondary;
                                e.currentTarget.style.color = isGray ? "#262626" : isRed ? "#901317" : "white";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = isGray ? "#262626" : isRed ? "#901317" : theme.primary;
                                e.currentTarget.style.color = isGray ? "#A5A5A5" : isRed ? "#FFA53C" : "white";
                            }}
                        >
                            Contact Us
                        </button>
                    </div>

                    {/* Products Row */}
                    <div className="relative">
                        {/* Decorative Background Strip */}
                        <div
                            className="bg-strip hidden md:block absolute top-25 left-[-12px] w-[770px] h-10 -translate-y-1/2 -z-0 rounded-l-full transition-colors duration-500"
                            style={{ backgroundColor: `${theme.secondary}4D` }}
                        ></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    ref={(el) => (cardsRef.current[index] = el)}
                                    className="flex flex-col items-center group cursor-pointer"
                                    style={{
                                        pointerEvents: isAnimating ? "none" : "auto",
                                        opacity: isAnimating ? 0.6 : 1,
                                        transition: "opacity 0.3s ease"
                                    }}
                                    onClick={() => onProductClick(product)}
                                >
                                    <div className="relative w-full aspect-[4/3] mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                                        {product.tag && (
                                            <span
                                                className="absolute top-2 right-2 text-[10px] font-bold px-2 py-1 z-20 transition-colors duration-500"
                                                style={{
                                                    backgroundColor: isGray ? "#262626" : isRed ? "#901317" : theme.primary,
                                                    color: isGray ? "#A5A5A5" : isRed ? "#FFA53C" : isBlue ? "white" : theme.secondary
                                                }}
                                            >
                                                {product.tag}
                                            </span>
                                        )}
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="product-image object-contain"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <h4 className="text-black font-bold text-xs uppercase tracking-wide text-center mb-1">
                                        {product.name}
                                    </h4>
                                    <span className="text-black font-extrabold text-lg">
                                        {product.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}