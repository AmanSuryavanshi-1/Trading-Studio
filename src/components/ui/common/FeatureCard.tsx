
import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  animationDelay?: number;
}

export function FeatureCard({
  title,
  description,
  icon,
  animationDelay = 0,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-smooth opacity-0 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "forwards" }}
      {...props}
    >
      {icon && (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
