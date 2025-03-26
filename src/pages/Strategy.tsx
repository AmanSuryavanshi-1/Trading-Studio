
import React from "react";
import { Navbar } from "@/components/ui/navigation/Navbar";
import { StrategyBuilder } from "@/components/strategy/StrategyBuilder";

const Strategy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <StrategyBuilder />
      </main>
    </div>
  );
};

export default Strategy;
