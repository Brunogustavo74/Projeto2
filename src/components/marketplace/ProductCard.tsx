import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  onClick?: () => void;
}

export function ProductCard({
  title,
  price,
  image,
  category,
  seller,
  isVerified = false,
  isFeatured = false,
  onClick,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card border border-border/50 cursor-pointer transition-all duration-300",
        isFeatured && "ring-1 ring-primary/30 shadow-glow-sm"
      )}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background-secondary">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-background/80 backdrop-blur-sm text-foreground-secondary border border-border/30">
            {category}
          </span>
        </div>
        
        {/* Digital Product Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-primary/20 backdrop-blur-sm text-primary border border-primary/30">
            Digital
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-foreground-secondary">
          <span>{seller}</span>
          {isVerified && (
            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold font-display text-foreground">
            R$ {price.toFixed(2)}
          </span>
          <div className="px-3 py-1 text-xs font-medium rounded-full bg-success/10 text-success border border-success/20">
            Seguro
          </div>
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-primary/20" />
    </motion.div>
  );
}
