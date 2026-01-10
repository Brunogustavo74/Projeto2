import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Package
} from "lucide-react";

type OrderStatus = "pending" | "awaiting_confirmation" | "completed" | "dispute" | "cancelled";

interface OrderCardProps {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  seller: string;
  status: OrderStatus;
  date: string;
  onConfirmReceived?: () => void;
  onOpenDispute?: () => void;
}

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; variant: "pending" | "success" | "warning" | "destructive" | "blocked" }> = {
  pending: { label: "Processando", icon: Clock, variant: "pending" },
  awaiting_confirmation: { label: "Aguardando", icon: Package, variant: "warning" },
  completed: { label: "Concluído", icon: CheckCircle2, variant: "success" },
  dispute: { label: "Em Disputa", icon: AlertTriangle, variant: "destructive" },
  cancelled: { label: "Cancelado", icon: XCircle, variant: "blocked" },
};

export function OrderCard({
  id,
  productName,
  productImage,
  price,
  seller,
  status,
  date,
  onConfirmReceived,
  onOpenDispute,
}: OrderCardProps) {
  const { label, icon: StatusIcon, variant } = statusConfig[status];
  
  return (
    <div className="group rounded-xl bg-card border border-border/50 p-4 transition-all duration-300 hover:border-border hover:shadow-card">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="relative w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden bg-background-secondary flex-shrink-0">
          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1 right-1">
            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/20 text-primary">
              Digital
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-medium text-foreground truncate">{productName}</h4>
              <p className="text-sm text-foreground-secondary">Vendedor: {seller}</p>
            </div>
            <Badge variant={variant} className="flex-shrink-0 self-start">
              <StatusIcon className="w-3 h-3 mr-1" />
              <span className="truncate">{label}</span>
            </Badge>
          </div>
          
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-lg font-bold font-display text-foreground">
                R$ {price.toFixed(2)}
              </span>
              <span className="text-xs text-foreground-muted">
                #{id.slice(0, 8)}
              </span>
            </div>
            <span className="text-xs text-foreground-muted">{date}</span>
          </div>
        </div>
      </div>
      
      {/* Actions for awaiting confirmation */}
      {status === "awaiting_confirmation" && (
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-start gap-2 text-xs text-warning">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Confirme o recebimento para liberar o pagamento</span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={onOpenDispute}
                className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
              >
                Problema
              </button>
              <button
                onClick={onConfirmReceived}
                className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-lg bg-success text-success-foreground hover:bg-success/90 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
