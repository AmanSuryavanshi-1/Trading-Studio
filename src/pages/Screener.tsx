
import React from "react";
import { Navbar } from "@/components/ui/navigation/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";

const Screener = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container max-w-4xl py-10 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Market Screener</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Screening Parameters</CardTitle>
              <CardDescription>Set criteria to filter instruments</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium">
                  Instrument Type
                  <select 
                    className="mt-1 block w-full rounded-md border-border shadow-sm py-2 px-3 bg-background"
                  >
                    <option value="all">All Instruments</option>
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
                    <option value="all">All Exchanges</option>
                    <option value="nyse">NYSE</option>
                    <option value="nasdaq">NASDAQ</option>
                    <option value="amex">AMEX</option>
                  </select>
                </label>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-3">Fundamental Filters</h4>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <span className="text-sm">Market Cap</span>
                    <select 
                      className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
                    >
                      <option value="all">Any</option>
                      <option value="mega">Mega ($200B+)</option>
                      <option value="large">Large ($10B-$200B)</option>
                      <option value="mid">Mid ($2B-$10B)</option>
                      <option value="small">Small ($300M-$2B)</option>
                      <option value="micro">Micro (Under $300M)</option>
                    </select>
                    <div></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <span className="text-sm">P/E Ratio</span>
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
                    <span className="text-sm">Dividend Yield (%)</span>
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
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-3">Technical Filters</h4>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <span className="text-sm">Price</span>
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
                    <span className="text-sm">Volume</span>
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
                    />
                    <select 
                      className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
                    >
                      <option value="daily">Daily Avg</option>
                      <option value="relative">Relative</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <span className="text-sm">Performance</span>
                    <select 
                      className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
                    >
                      <option value="day">Today</option>
                      <option value="week">1 Week</option>
                      <option value="month">1 Month</option>
                      <option value="quarter">3 Months</option>
                      <option value="year">1 Year</option>
                    </select>
                    <select 
                      className="rounded-md border-border shadow-sm py-1.5 px-3 text-sm bg-background"
                    >
                      <option value="any">Any</option>
                      <option value="up">Up</option>
                      <option value="down">Down</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>No filters applied yet. Apply filters to see results.</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No results yet</p>
                <Button>Run Screen</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Screener;
