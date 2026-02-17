"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: 1,
        name: "L-Shape Full Family Sofa",
        price: "$650",
        // Assumes your image is in public/images/GraySofa.png
        image: "/images/GraySofa.png",
        tag: "NEW",
    },
    {
        id: 2,
        name: "Mini 2 Seater",
        price: "$750",
        // Assumes your image is in public/images/RedSofa.png
        image: "/images/RedSofa.png",
        tag: "NEW",
    },
    {
        id: 3,
        name: "Royal Blue Full Family Sofa",
        price: "$800",
        // Assumes your image is in public/images/BlueSofa.png
        image: "/images/BlueSofa.png",
        tag: "NEW",
    },
];

export default function Products() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Background strip animation
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

            // Products staggering
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
                    <div className="flex flex-col justify-center space-y-6">
                        <h3 className="text-brand-brown text-3xl font-bold uppercase leading-tight">
                            Why We Are Best <br /> In Our Town
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim
                            dictum orci id sit dui morbi. Pellentesque luctus felis cras adipiscing aliquet
                            eget facilisis odio.
                            <br /><br />
                            In tortor, et proin placerat interdum massa amet nisi. Nisi sit tellus eget
                            facilisis adipiscing egestas libero.
                        </p>
                        <button className="bg-brand-brown text-white w-fit px-8 py-3 text-xs font-bold uppercase hover:bg-brand-orange transition-colors duration-300">
                            Contact Us
                        </button>
                    </div>

                    {/* Products Row */}
                    <div className="relative">
                        {/* Decorative Background Strip */}
                        <div className="bg-strip absolute top-1/2 left-0 w-full h-32 bg-brand-cream -translate-y-1/2 -z-0 rounded-l-full"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    ref={(el) => (cardsRef.current[index] = el)}
                                    className="flex flex-col items-center group cursor-pointer"
                                >
                                    <div className="relative w-full aspect-[4/3] mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                                        {product.tag && (
                                            <span className="absolute top-2 right-2 bg-brand-brown text-brand-orange text-[10px] font-bold px-2 py-1 z-20">
                                                {product.tag}
                                            </span>
                                        )}
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
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