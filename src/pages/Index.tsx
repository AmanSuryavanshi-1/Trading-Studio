
import React from "react";
import { Navbar } from "@/components/ui/navigation/Navbar";
import { Hero } from "@/components/home/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
};

export default Index;
