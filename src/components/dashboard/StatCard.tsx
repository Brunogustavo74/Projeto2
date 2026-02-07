import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "blocked" | "primary";
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  const variantStyles = {
    default: "bg-card border-border/50",
    success: "bg-success/5 border-success/20",
    warning: "bg-warning/5 border-warning/20",
    blocked: "bg-muted border-border",
    primary: "bg-primary/5 border-primary/20",
  };
  
  const iconStyles = {
    default: "bg-secondary text-foreground-secondary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    blocked: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-card overflow-hidden",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-foreground-secondary truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold font-display text-foreground truncate">{value}</p>
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-foreground-muted truncate">{subtitle}</p>
          )}
        </div>
        
        <div className={cn("p-2 sm:p-2.5 rounded-lg flex-shrink-0", iconStyles[variant])}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-2 sm:mt-3 flex items-center gap-1">
          <span className={cn(
            "text-[10px] sm:text-xs font-medium",
            trend.isPositive ? "text-success" : "text-destructive"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
          <span className="text-[10px] sm:text-xs text-foreground-muted truncate">vs mês anterior</span>
        </div>
      )}
    </motion.div>
  );
}
