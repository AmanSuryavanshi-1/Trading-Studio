
import React from "react";
import { Navbar } from "@/components/ui/navigation/Navbar";
import { SimulationResults } from "@/components/simulator/SimulationResults";

const Simulator = () => {
  return (
    <div className="min-h-screen bg-background theme-transition">
      <Navbar />
      <main className="pt-20 pb-16">
        <SimulationResults />
      </main>
    </div>
  );
};

export default Simulator;
