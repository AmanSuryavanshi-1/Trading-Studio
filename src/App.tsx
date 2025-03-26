import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrategyProvider } from "@/context/StrategyContext";
import { ThemeProvider } from "@/components/ui/theme/ThemeProvider";

import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import Strategy from "./pages/Strategy";
import Portfolio from "./pages/Portfolio";
import Simulator from "./pages/Simulator";
import Screener from "./pages/Screener";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StrategyProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/strategy" element={<Strategy />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/simulator" element={<Simulator />} />
                <Route path="/screener" element={<Screener />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </StrategyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
