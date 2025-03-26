
import React from "react";
import { Navbar } from "@/components/ui/navigation/Navbar";
import { PortfolioManagement } from "@/components/portfolio/PortfolioManagement";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <PortfolioManagement />
      </main>
    </div>
  );
};

export default Portfolio;
