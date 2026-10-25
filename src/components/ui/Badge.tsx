import type React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "amber" | "glass";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({children, variant = "glass", className = ""}) => {
  const variantStyle = {
    glass: 'bg-white/5 border border-white/10 text-zinc-300',
    purple: 'bg-primary-base/20 border border-primary-base/40 text-purple-300 purple-glow',
    amber: 'bg-amber-500/15 border border-amber-500/30 text-amber-300',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
        text-xs font-medium backdrop-blur-md transition-all ${variantStyle[variant]} ${className}
        `}
    >
      {children}
    </span>
  )
}