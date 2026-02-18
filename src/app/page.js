"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { useState, useRef } from "react";

// Initial Data
const initialProducts = [
  {
    id: 1,
    name: "L-Shape Full Family Sofa",
    price: "$650",
    image: "/images/GraySofa.png",
    tag: "NEW",
    theme: { primary: "#262626", secondary: "#505050" }
  },
  {
    id: 2,
    name: "Mini 2 Seater",
    price: "$750",
    image: "/images/RedSofa.png",
    tag: "NEW",
    theme: { primary: "#901317", secondary: "#B83034" }
  },
  {
    id: 3,
    name: "Royal Blue Full Family Sofa",
    price: "$800",
    image: "/images/BlueSofa.png",
    tag: "NEW",
    theme: { primary: "#1B3B6F", secondary: "#3E64A3" }
  },
];

const initialHeroProduct = {
  id: 0,
  name: "L-Shape Full Family Sofa",
  price: "$650",
  image: "/images/BrownSofa.png",
  tag: "NEW",
  theme: { primary: "#903C0A", secondary: "#FFA53C" }
};

export default function Home() {
  const [heroProduct, setHeroProduct] = useState(initialHeroProduct);
  const [products, setProducts] = useState(initialProducts);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref to Hero's flip trigger function
  const flipTriggerRef = useRef(null);

  const isGray = heroProduct.theme.primary === "#262626";
  const isRed = heroProduct.theme.primary === "#901317";
  const isBlue = heroProduct.theme.primary === "#1B3B6F";

  const handleProductClick = (clickedProduct) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Trigger the flip animation in Hero, passing a callback that swaps data at the midpoint
    if (flipTriggerRef.current) {
      flipTriggerRef.current(() => {
        // This runs at the midpoint of the flip (sofa is edge-on, invisible)
        const newProducts = products.map(p =>
          p.id === clickedProduct.id ? { ...heroProduct, id: p.id } : p
        );
        setHeroProduct({ ...clickedProduct });
        setProducts(newProducts);
      }, () => {
        // This runs when the full flip is complete
        setIsAnimating(false);
      });
    } else {
      // Fallback if ref not ready
      const newProducts = products.map(p =>
        p.id === clickedProduct.id ? { ...heroProduct, id: p.id } : p
      );
      setHeroProduct({ ...clickedProduct });
      setProducts(newProducts);
      setIsAnimating(false);
    }
  };

  return (
    <main
      className="min-h-screen transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: heroProduct.theme.primary }}
    >
      <Navbar
        primaryColor={heroProduct.theme.primary}
        secondaryColor={heroProduct.theme.secondary}
        isGray={isGray}
        isRed={isRed}
        isBlue={isBlue}
      />

      <Hero
        theme={heroProduct.theme}
        product={heroProduct}
        isGray={isGray}
        isRed={isRed}
        isBlue={isBlue}
        flipTriggerRef={flipTriggerRef}
      />

      <Products
        products={products}
        theme={heroProduct.theme}
        onProductClick={handleProductClick}
        isGray={isGray}
        isRed={isRed}
        isBlue={isBlue}
        isAnimating={isAnimating}
      />
    </main>
  );
}
