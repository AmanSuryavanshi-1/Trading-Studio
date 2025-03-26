import React from "react";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Testimonials section - intentionally kept minimal */}
      <section className="py-16 bg-muted/10">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Trusted by Traders Worldwide</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of traders who rely on our platform for market analysis and strategy development
          </p>
          
          {/* Simple logos section - could be expanded later */}
          <div className="flex justify-center items-center gap-10 mt-10 opacity-70">
            <div className="h-8 w-24 bg-muted-foreground/20 rounded"></div>
            <div className="h-8 w-32 bg-muted-foreground/20 rounded"></div>
            <div className="h-8 w-28 bg-muted-foreground/20 rounded"></div>
          </div>
        </div>
      </section>
      
      {/* Simple CTA section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to optimize your trading?</h2>
          <a 
            href="/signup" 
            className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary hover:bg-primary/90 focus:shadow-outline focus:outline-none"
          >
            Get Started Free
          </a>
        </div>
      </section>
    </div>
  );
}
