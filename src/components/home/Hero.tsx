import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarIcon, TrendingUpIcon } from "lucide-react";

export function Hero() {
  // Calculator state
  const [startDate, setStartDate] = useState("01/01/2025");
  const [endDate, setEndDate] = useState("01/03/2025");
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyGrowth, setMonthlyGrowth] = useState(5);
  
  // Calculate projected value based on inputs
  const calculateProjectedValue = () => {
    // Simple compound interest calculation for demo purposes
    const months = 2; // Simplified for demo
    const growthRate = monthlyGrowth / 100;
    const projectedValue = initialInvestment * Math.pow(1 + growthRate, months);
    return projectedValue.toFixed(2);
  };

  return (
    <section className="py-16 lg:pt-28 overflow-hidden">
      {/* Background gradients - subtle and not distracting */}
      <div className="absolute top-0 left-0 w-full h-60 bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      {/* Content container with reduced maximum width */}
      <div className="container relative max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content - Simplified heading and description */}
          <div className="flex flex-col animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              <span className="block">Simulate Your</span>
              <span className="block gradient-text">Trading Returns</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Make informed investment decisions with our powerful calculator 
              and trading analytics platform.
            </p>
            
            <div className="flex gap-4 mb-8">
              <Button className="gradient-primary">
                Get Started
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
            
            {/* Feature highlight - simplified to just one key feature */}
            <div className="flex items-center space-x-2 mt-4 p-2">
              <TrendingUpIcon size={20} className="text-primary" />
              <span className="text-sm">Advanced algorithmic analysis to maximize returns</span>
            </div>
          </div>
          
          {/* Right content - Simplified calculator */}
          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Card className="overflow-hidden bg-card/90 backdrop-blur-sm">
              <div className="p-5 border-b border-border/50">
                <h3 className="text-xl font-medium text-center">Return Calculator</h3>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Calculator inputs - simplified to focus on core functionality */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="pl-3 pr-10"
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {/* End Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">End Date</label>
                    <div className="relative">
                      <Input 
                        type="text" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="pl-3 pr-10"
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                {/* Initial Investment */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Initial Investment</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value))}
                      className="pl-7"
                    />
                  </div>
                </div>
                
                {/* Monthly Growth */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Monthly Growth (%)</label>
                  <Input 
                    type="number" 
                    value={monthlyGrowth}
                    onChange={(e) => setMonthlyGrowth(Number(e.target.value))}
                  />
                </div>
                
                {/* Result - Simplified and more prominent */}
                <div className="bg-secondary/30 dark:bg-secondary/10 rounded-lg p-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Projected Value:</span>
                    <span className="text-xl font-bold text-primary">${calculateProjectedValue()}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 pt-0">
                <Button className="w-full">
                  Run Full Simulation
                </Button>
              </div>
            </Card>
            
            {/* Subtle decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
