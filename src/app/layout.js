
import { Playball, Poppins } from "next/font/google";
import "./globals.css";

const playball = Playball({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-playball",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Amante Comfort | Luxury Furniture",
  description: "Experience luxury with Amante Comfort furniture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playball.variable} ${poppins.variable} font-sans bg-brand-brown text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
