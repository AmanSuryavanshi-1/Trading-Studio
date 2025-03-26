import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/ui/navigation/Navbar";
import { Footer } from "@/components/ui/navigation/Footer";

export function Layout() {
  const { pathname } = useLocation();
  
  // Determine if current page is the homepage
  const isHomePage = pathname === "/";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {isHomePage ? (
          <Outlet />
        ) : (
          // For all other pages, use a narrower container to center content better
          <div className="mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-4xl">
            <Outlet />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
