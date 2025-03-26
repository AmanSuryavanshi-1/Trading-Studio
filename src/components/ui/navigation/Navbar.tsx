import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Screener",
    href: "/screener",
  },
  {
    label: "Strategy",
    href: "/strategy",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "Simulator",
    href: "/simulator",
  },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-white/90 dark:bg-card/95 backdrop-blur-md shadow-sm border-b border-border/40" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container max-w-7xl flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center space-x-2.5 text-foreground"
        >
          <div className="w-8 h-8 text-blue-600 flex items-center justify-center">
            {/* <img src="/assets/trading-studio.png" alt="Trading Studio" className="w-full h-full object-contain" /> */}
          </div>
          <span className="font-semibold text-lg">TradingStudio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 relative group",
                pathname === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {item.label}
              {pathname === item.href ? (
                <span className="absolute bottom-0 left-0 right-0 mx-auto w-10 h-0.5 bg-primary rounded-full" />
              ) : (
                <span className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-8" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="font-medium">
            Sign In
          </Button>
          <Button className="font-medium" size="sm">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-card/95 backdrop-blur-md border-b border-border/40 shadow-lg animate-slide-in">
          <nav className="container py-5 flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border/30 flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Sign In
              </Button>
              <Button className="flex-1">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
