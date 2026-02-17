
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-brown">
      <Navbar />
      <Hero />
      <Products />
    </main>
  );
}
