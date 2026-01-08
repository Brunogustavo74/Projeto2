import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { OrderCard } from "@/components/dashboard/OrderCard";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  User,
  Settings
} from "lucide-react";

// Mock data
const mockOrders = [
  {
    id: "ord_abc123",
    productName: "Conta Valorant - Radiant + 50 Skins",
    productImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    price: 299.99,
    seller: "ProGamer",
    status: "awaiting_confirmation" as const,
    date: "Hoje, 14:30",
  },
  {
    id: "ord_def456",
    productName: "Gift Card Steam R$100",
    productImage: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=200&fit=crop",
    price: 89.90,
    seller: "CardMaster",
    status: "completed" as const,
    date: "Ontem, 10:15",
  },
  {
    id: "ord_ghi789",
    productName: "Pacote Skins CS2",
    productImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=200&h=200&fit=crop",
    price: 459.00,
    seller: "SkinTrader",
    status: "completed" as const,
    date: "3 dias atrás",
  },
];

export default function BuyerDashboard() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
              Meu Painel
            </h1>
            <p className="text-foreground-secondary">
              Bem-vindo de volta! Aqui estão suas atividades recentes.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link to="/buyer/profile">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Perfil
              </Button>
            </Link>
            <Link to="/buyer/settings">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Configurações
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total de Compras"
            value="12"
            icon={ShoppingBag}
            variant="primary"
          />
          <StatCard
            title="Aguardando"
            value="1"
            subtitle="Confirmar recebimento"
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Concluídas"
            value="10"
            icon={CheckCircle2}
            variant="success"
          />
          <StatCard
            title="Em Disputa"
            value="0"
            icon={AlertTriangle}
            variant="default"
          />
        </div>
        
        {/* Orders Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-foreground">
              Meus Pedidos
            </h2>
            <Link to="/buyer/orders" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Orders List */}
          <div className="space-y-4">
            {mockOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <OrderCard
                  {...order}
                  onConfirmReceived={() => console.log("Confirm received:", order.id)}
                  onOpenDispute={() => console.log("Open dispute:", order.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/marketplace">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <ShoppingBag className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Explorar Marketplace</h3>
              <p className="text-sm text-foreground-secondary">
                Descubra milhares de produtos digitais verificados
              </p>
            </motion.div>
          </Link>
          
          <Link to="/become-seller">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors"
            >
              <User className="w-8 h-8 text-foreground-secondary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Tornar-se Vendedor</h3>
              <p className="text-sm text-foreground-secondary">
                Comece a vender seus produtos digitais hoje
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
