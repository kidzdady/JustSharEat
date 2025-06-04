import type { Metadata } from "next";
import { Lato, Montserrat } from 'next/font/google';
import Header from '@/components/layout/Header'; // Import the Header
import Footer from '@/components/layout/Footer'; // Import the Footer
import { AuthProvider } from '@/context/AuthContext'; // Restore AuthProvider
import { CartProvider } from '@/context/CartContext'; // Import CartProvider
import "./globals.css";

// Configure Lato font
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato', // CSS variable for Lato
  display: 'swap',
});

// Configure Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat', // CSS variable for Montserrat
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SharEat - A meal saved is a life saved",
  description: "Buy or donate surplus meals from restaurants, events, and homes across Kenya. End food waste, feed Kenya, share love.",
  // Add more metadata here: icons, open graph, etc.
  // icons: {
  //   icon: '/favicon.ico', // Example
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${montserrat.variable}`}>
      <body className="bg-background text-text-primary flex flex-col min-h-screen overflow-x-hidden"> {/* Ensure body takes full height and hides horizontal overflow */}
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="pt-4 flex-grow"> {/* Added flex-grow to ensure main content pushes footer down */}
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}