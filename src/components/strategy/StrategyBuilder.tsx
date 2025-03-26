
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";

type Step = "scanner" | "buy" | "sell" | "simulation";

interface StepConfig {
  id: Step;
  title: string;
  description: string;
}

const steps: StepConfig[] = [
  {
    id: "scanner",
    title: "Scanner",
    description: "Define which instruments to include in your strategy",
  },
  {
    id: "buy",
    title: "Buy Conditions",
    description: "Set up conditions that trigger buy orders",
  },
  {
    id: "sell",
    title: "Sell Conditions",
    description: "Set up conditions that trigger sell orders",
  },
  {
    id: "simulation",
    title: "Simulation",
    description: "Configure simulation parameters",
  },
];

export function StrategyBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>("scanner");
  const [isSimulating, setIsSimulating] = useState(false);
  
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const handlePreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const handleSubmit = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      // In a real app, we would navigate to results page here
    }, 2000);
  };

  const handleSaveDraft = () => {
    // In a real app, we would save the strategy to local storage
    console.log("Strategy saved as draft");
  };

  return (
    <div className="container max-w-4xl py-10 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Create Trading Strategy</h1>
      
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center relative z-10"
            >
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  currentStepIndex >= index 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <span className={cn(
                "mt-2 text-sm font-medium hidden md:block",
                currentStepIndex >= index 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              )}>
                {step.title}
              </span>
            </div>
          ))}
          
          {/* Progress Bar */}
          <div className="absolute top-5 left-0 h-0.5 bg-muted w-full -z-0">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{steps[currentStepIndex].title}</CardTitle>
          <CardDescription>{steps[currentStepIndex].description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          {currentStep === "scanner" && <ScannerStep />}
          {currentStep === "buy" && <BuyStep />}
          {currentStep === "sell" && <SellStep />}
          {currentStep === "simulation" && <SimulationStep />}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousStep}
            disabled={currentStepIndex === 0}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>
            
            {currentStepIndex < steps.length - 1 ? (
              <Button onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                isLoading={isSimulating}
              >
                Submit for Simulation
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function ScannerStep() {
  return (
    <div className="space-y-6 animate-scale-in">
      <div className="grid gap-4">
        <label className="block text-sm font-medium">
          Strategy Name
          <input 
            type="text"
            className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
            placeholder="My Trading Strategy"
          />
        </label>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium">
          Instrument Type
          <select 
            className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
          >
            <option value="stocks">Stocks</option>
            <option value="etfs">ETFs</option>
            <option value="futures">Futures</option>
            <option value="forex">Forex</option>
          </select>
        </label>
        
        <label className="block text-sm font-medium">
          Exchange
          <select 
            className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
          >
            <option value="nyse">NYSE</option>
            <option value="nasdaq">NASDAQ</option>
            <option value="amex">AMEX</option>
            <option value="all">All US Exchanges</option>
          </select>
        </label>
      </div>
      
      <div className="border rounded-md p-4">
        <h4 className="text-sm font-medium mb-3">Screening Rules</h4>
        
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="text-sm">Price Range</span>
            <input 
              type="number" 
              placeholder="Min" 
              className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            />
            <input 
              type="number" 
              placeholder="Max" 
              className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="text-sm">Market Cap</span>
            <select 
              className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            >
              <option value="all">All</option>
              <option value="mega">Mega ($200B+)</option>
              <option value="large">Large ($10B-$200B)</option>
              <option value="mid">Mid ($2B-$10B)</option>
              <option value="small">Small ($300M-$2B)</option>
              <option value="micro">Micro (Under $300M)</option>
            </select>
            <div></div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="text-sm">Growth Over</span>
            <input 
              type="number" 
              placeholder="%" 
              className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            />
            <select 
              className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            >
              <option value="day">1 Day</option>
              <option value="week">1 Week</option>
              <option value="month">1 Month</option>
              <option value="quarter">3 Months</option>
              <option value="year">1 Year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyStep() {
  return (
    <div className="space-y-6 animate-scale-in">
      <div className="border rounded-md p-4">
        <h4 className="text-sm font-medium mb-3">Buy Trigger Conditions</h4>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="condition1" 
              className="rounded border-border h-4 w-4 mr-2"
            />
            <label htmlFor="condition1" className="text-sm">
              N-DAY MOVING AVG &gt; LAST OPEN
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="condition2" 
              className="rounded border-border h-4 w-4 mr-2"
            />
            <label htmlFor="condition2" className="text-sm">
              TOP X N-DAY GAINERS
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="condition3" 
              className="rounded border-border h-4 w-4 mr-2"
            />
            <label htmlFor="condition3" className="text-sm">
              PRICE ABOVE SUPPORT LEVEL
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="condition4" 
              className="rounded border-border h-4 w-4 mr-2"
            />
            <label htmlFor="condition4" className="text-sm">
              RSI BELOW THRESHOLD
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="condition5" 
              className="rounded border-border h-4 w-4 mr-2"
            />
            <label htmlFor="condition5" className="text-sm">
              PRICE CROSSES ABOVE MA(20)
            </label>
          </div>
          
          <div className="pt-3">
            <Button variant="outline" size="sm">
              Add Custom Condition
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h4 className="text-sm font-medium mb-3">Advanced Options</h4>
        
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            Buy Order Type
            <select 
              className="mt-1 block w-full rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop">Stop</option>
              <option value="stoplimit">Stop Limit</option>
            </select>
          </label>
          
          <label className="block text-sm">
            Position Size (% of Capital)
            <input 
              type="number" 
              className="mt-1 block w-full rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
              placeholder="10"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function SellStep() {
  return (
    <div className="space-y-6 animate-scale-in">
      <div className="border rounded-md p-4">
        <h4 className="text-sm font-medium mb-3">Sell Trigger Conditions</h4>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="text-sm">Target Profit</span>
            <input 
              type="number" 
              placeholder="%" 
              className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            />
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="enableTarget" 
                className="rounded border-border h-4 w-4 mr-2"
              />
              <label htmlFor="enableTarget" className="text-sm">Enable</label>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="text-sm">Stop Loss</span>
            <input 
              type="number" 
              placeholder="%" 
              className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            />
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="enableStopLoss" 
                className="rounded border-border h-4 w-4 mr-2"
              />
              <label htmlFor="enableStopLoss" className="text-sm">Enable</label>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="text-sm">Trailing Stop</span>
            <input 
              type="number" 
              placeholder="%" 
              className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
            />
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="enableTrailing" 
                className="rounded border-border h-4 w-4 mr-2"
              />
              <label htmlFor="enableTrailing" className="text-sm">Enable</label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h4 className="text-sm font-medium mb-3">Additional Sell Conditions</h4>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="sellCondition1" 
              className="rounded border-border h-4 w-4 mr-2"
            />
            <label htmlFor="sellCondition1" className="text-sm">
              PRICE CROSSES BELOW MA(20)
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="sellCondition2" 
              className="rounded border-border h-4 w-4 mr-2"
            />
            <label htmlFor="sellCondition2" className="text-sm">
              RSI ABOVE THRESHOLD
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="sellCondition3" 
              className="rounded border-border h-4 w-4 mr-2"
            />
            <label htmlFor="sellCondition3" className="text-sm">
              TIME-BASED EXIT (DAYS HELD)
            </label>
          </div>
          
          <div className="pt-3">
            <Button variant="outline" size="sm">
              Add Custom Condition
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimulationStep() {
  return (
    <div className="space-y-6 animate-scale-in">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium">
          Starting Margin
          <input 
            type="number" 
            className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
            placeholder="10000"
          />
        </label>
        
        <label className="block text-sm font-medium">
          Maximum Positions
          <input 
            type="number" 
            className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
            placeholder="5"
          />
        </label>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium">
          Start Date
          <input 
            type="date" 
            className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
          />
        </label>
        
        <label className="block text-sm font-medium">
          End Date
          <input 
            type="date" 
            className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
          />
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Entry Priority
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input 
              type="radio" 
              name="entryPriority" 
              value="fifo" 
              className="h-4 w-4 mr-2"
              defaultChecked
            />
            <span className="text-sm">FIFO</span>
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              name="entryPriority" 
              value="highest" 
              className="h-4 w-4 mr-2"
            />
            <span className="text-sm">Highest Signal</span>
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              name="entryPriority" 
              value="equal" 
              className="h-4 w-4 mr-2"
            />
            <span className="text-sm">Equal Weight</span>
          </label>
        </div>
      </div>
      
      <div className="border rounded-md p-4">
        <h4 className="text-sm font-medium mb-3">Advanced Simulation Settings</h4>
        
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            Commission per Trade
            <input 
              type="number" 
              className="mt-1 block w-full rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
              placeholder="0.00"
            />
          </label>
          
          <label className="block text-sm">
            Slippage (%)
            <input 
              type="number" 
              className="mt-1 block w-full rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
              placeholder="0.1"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
