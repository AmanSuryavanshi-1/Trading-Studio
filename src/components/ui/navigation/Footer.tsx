import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";

const productLinks = [
  { name: "Screener", href: "/screener" },
  { name: "Strategy Builder", href: "/strategy" },
  { name: "Simulator", href: "/simulator" },
  { name: "Portfolio Analysis", href: "/portfolio" },
];

const resourceLinks = [
  { name: "Documentation", href: "/docs" },
  { name: "API Reference", href: "/api" },
  { name: "Trading Guides", href: "/guides" },
  { name: "Market Insights", href: "/insights" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Twitter", icon: <Twitter size={18} />, href: "https://twitter.com" },
  { name: "LinkedIn", icon: <Linkedin size={18} />, href: "https://linkedin.com" },
  { name: "GitHub", icon: <Github size={18} />, href: "https://github.com" },
  { name: "Facebook", icon: <Facebook size={18} />, href: "https://facebook.com" },
  { name: "Instagram", icon: <Instagram size={18} />, href: "https://instagram.com" },
];

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t border-border/40 pt-12 pb-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-2.5 text-foreground mb-4">
              <div className="w-8 h-8 text-blue-600 flex items-center justify-center">
                <img src="/assets/trading-studio.png" alt="Trading Studio" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-lg">TradingStudio</span>
            </Link>
            
            <p className="text-muted-foreground max-w-md mt-4 mb-6">
              An advanced trading analysis platform for developing, backtesting, and 
              optimizing investment strategies with sophisticated tools and real-time data.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-border/40 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} TradingStudio. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-6 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
