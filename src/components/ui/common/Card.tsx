
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
  animation?: "none" | "hover" | "scale";
}

export function Card({
  children,
  className,
  variant = "default",
  padding = "md",
  animation = "none",
  ...props
}: CardProps) {
  const variants = {
    default: "bg-card shadow-sm",
    glass: "glass-card",
    bordered: "border border-border bg-background",
  };

  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  const animations = {
    none: "",
    hover: "hover:shadow-md transition-smooth",
    scale: "hover:scale-[1.02] transition-smooth",
  };

  return (
    <div
      className={cn(
        "rounded-lg",
        variants[variant],
        paddings[padding],
        animations[animation],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-semibold leading-tight tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pt-5", className)} {...props} />
  );
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center pt-5", className)}
      {...props}
    />
  );
}
