
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Strategy {
  id: string;
  name: string;
  status: "draft" | "completed";
  createdAt: string;
  updatedAt: string;
  // Additional fields would be added in a real app to store all strategy details
}

interface StrategyContextType {
  strategies: Strategy[];
  currentStrategy: Strategy | null;
  setCurrentStrategy: (strategy: Strategy | null) => void;
  saveStrategy: (strategy: Partial<Strategy>) => Strategy;
  deleteStrategy: (id: string) => void;
  getStrategyById: (id: string) => Strategy | undefined;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export function StrategyProvider({ children }: { children: React.ReactNode }) {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [currentStrategy, setCurrentStrategy] = useState<Strategy | null>(null);
  
  // Load strategies from local storage on mount
  useEffect(() => {
    const storedStrategies = localStorage.getItem("strategies");
    if (storedStrategies) {
      try {
        setStrategies(JSON.parse(storedStrategies));
      } catch (error) {
        console.error("Failed to parse strategies from localStorage:", error);
      }
    } else {
      // Initialize with sample strategies if none exist
      const sampleStrategies: Strategy[] = [
        {
          id: "strategy-1",
          name: "Tech Growth Strategy",
          status: "completed",
          createdAt: "2023-12-15T10:30:00.000Z",
          updatedAt: "2024-01-20T14:45:00.000Z",
        },
        {
          id: "strategy-2",
          name: "Dividend Income",
          status: "draft",
          createdAt: "2024-03-05T09:15:00.000Z",
          updatedAt: "2024-03-05T09:15:00.000Z",
        },
      ];
      setStrategies(sampleStrategies);
      localStorage.setItem("strategies", JSON.stringify(sampleStrategies));
    }
  }, []);
  
  // Save strategies to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("strategies", JSON.stringify(strategies));
  }, [strategies]);
  
  const saveStrategy = (strategyData: Partial<Strategy>): Strategy => {
    const now = new Date().toISOString();
    
    if (strategyData.id) {
      // Update existing strategy
      const updatedStrategies = strategies.map(strategy => 
        strategy.id === strategyData.id 
          ? { ...strategy, ...strategyData, updatedAt: now } 
          : strategy
      );
      
      setStrategies(updatedStrategies);
      
      const updatedStrategy = updatedStrategies.find(s => s.id === strategyData.id) as Strategy;
      return updatedStrategy;
    } else {
      // Create new strategy
      const newStrategy: Strategy = {
        id: `strategy-${Date.now()}`,
        name: strategyData.name || "Untitled Strategy",
        status: strategyData.status || "draft",
        createdAt: now,
        updatedAt: now,
        ...strategyData,
      };
      
      setStrategies([...strategies, newStrategy]);
      return newStrategy;
    }
  };
  
  const deleteStrategy = (id: string) => {
    setStrategies(strategies.filter(strategy => strategy.id !== id));
    
    if (currentStrategy?.id === id) {
      setCurrentStrategy(null);
    }
  };
  
  const getStrategyById = (id: string) => {
    return strategies.find(strategy => strategy.id === id);
  };
  
  return (
    <StrategyContext.Provider 
      value={{
        strategies,
        currentStrategy,
        setCurrentStrategy,
        saveStrategy,
        deleteStrategy,
        getStrategyById,
      }}
    >
      {children}
    </StrategyContext.Provider>
  );
}

export function useStrategy() {
  const context = useContext(StrategyContext);
  if (context === undefined) {
    throw new Error("useStrategy must be used within a StrategyProvider");
  }
  return context;
}
