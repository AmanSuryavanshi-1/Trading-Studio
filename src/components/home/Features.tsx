import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, BarChart3, BrainCircuit, Sparkles } from "lucide-react";

export function Features() {
  return (
    <section className="py-20 bg-muted/5">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section header - simplified */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Key Platform Features</h2>
          <p className="text-muted-foreground">
            Optimize your trading decisions with our comprehensive toolkit
          </p>
        </div>
        
        {/* Features grid - reduced to 4 core features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FeatureCard 
            title="Market Screener" 
            description="Find ideal trading opportunities with customizable filters for any market condition."
            icon={<ChartBarIcon className="h-5 w-5" />}
            delay={100}
          />
          
          <FeatureCard 
            title="Strategy Builder" 
            description="Create and backtest custom trading strategies without coding knowledge."
            icon={<BrainCircuit className="h-5 w-5" />}
            delay={200}
          />
          
          <FeatureCard 
            title="Performance Analytics" 
            description="Visualize strategy performance with clear, actionable metrics."
            icon={<BarChart3 className="h-5 w-5" />}
            delay={300}
          />
          
          <FeatureCard 
            title="AI Insights" 
            description="Leverage AI-powered pattern recognition to identify market opportunities."
            icon={<Sparkles className="h-5 w-5" />}
            delay={400}
          />
        </div>

        {/* CTA section */}
        <div className="text-center mt-10">
          <Button size="lg" className="gradient-primary">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <Card 
      className="p-6 flex flex-col h-full border border-border/30 bg-card/50 hover:shadow-sm transition-all duration-300 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="text-primary p-2 rounded-md bg-primary/5">{icon}</div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
}
