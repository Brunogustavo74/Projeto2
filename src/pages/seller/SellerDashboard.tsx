import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Clock,
  Lock,
  Unlock,
  Plus,
  ChevronRight,
  Eye,
  Edit,
  Pause,
  MoreVertical,
  ArrowUpRight,
  Wallet
} from "lucide-react";

// Mock data
const mockProducts = [
  {
    id: "1",
    title: "Conta Valorant - Radiant + 50 Skins",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    status: "active",
    views: 234,
    sales: 3,
  },
  {
    id: "2",
    title: "Gift Card Steam R$100",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=200&fit=crop",
    status: "active",
    views: 567,
    sales: 12,
  },
  {
    id: "3",
    title: "Pacote Skins CS2 Premium",
    price: 459.00,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=200&h=200&fit=crop",
    status: "pending",
    views: 0,
    sales: 0,
  },
];

const mockSales = [
  {
    id: "sale_1",
    product: "Conta Valorant - Radiant",
    buyer: "Comprador123",
    amount: 299.99,
    status: "awaiting_confirmation",
    date: "Hoje, 14:30",
  },
  {
    id: "sale_2",
    product: "Gift Card Steam R$100",
    buyer: "GamerPro",
    amount: 89.90,
    status: "completed",
    date: "Ontem, 18:45",
  },
];

export default function SellerDashboard() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "products" | "sales" | "balance">("overview");
  
  const tabs = [
    { id: "overview", label: "Visão Geral" },
    { id: "products", label: "Meus Anúncios" },
    { id: "sales", label: "Vendas" },
    { id: "balance", label: "Saldo" },
  ];
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
              Painel do Vendedor
            </h1>
            <p className="text-foreground-secondary">
              Gerencie seus produtos e acompanhe suas vendas
            </p>
          </div>
          
          <Link to="/seller/new-product">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Anúncio
            </Button>
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-background-secondary mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Vendas Totais"
                value="R$ 2.459,00"
                icon={DollarSign}
                trend={{ value: 12, isPositive: true }}
                variant="primary"
              />
              <StatCard
                title="Anúncios Ativos"
                value="8"
                icon={Package}
                variant="default"
              />
              <StatCard
                title="Saldo Bloqueado"
                value="R$ 299,99"
                subtitle="1 venda aguardando"
                icon={Lock}
                variant="warning"
              />
              <StatCard
                title="Saldo Disponível"
                value="R$ 1.890,00"
                subtitle="Disponível para saque"
                icon={Unlock}
                variant="success"
              />
            </div>
            
            {/* Recent Sales */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Vendas Recentes</h2>
                <button
                  onClick={() => setSelectedTab("sales")}
                  className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
                >
                  Ver todas
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Produto</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Comprador</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Valor</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Status</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockSales.map((sale) => (
                        <tr key={sale.id} className="border-b border-border/30 last:border-0 hover:bg-background-secondary/50 transition-colors">
                          <td className="px-4 py-3 text-sm text-foreground">{sale.product}</td>
                          <td className="px-4 py-3 text-sm text-foreground-secondary">{sale.buyer}</td>
                          <td className="px-4 py-3 text-sm font-medium text-foreground">R$ {sale.amount.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <Badge variant={sale.status === "completed" ? "success" : "warning"}>
                              {sale.status === "completed" ? "Concluída" : "Aguardando"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground-muted">{sale.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/seller/balance">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-success/10 via-card to-card border border-success/20 hover:border-success/40 transition-colors flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Solicitar Saque</h3>
                    <p className="text-sm text-foreground-secondary">R$ 1.890,00 disponíveis</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-success" />
                </motion.div>
              </Link>
              
              <Link to="/seller/new-product">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Criar Anúncio</h3>
                    <p className="text-sm text-foreground-secondary">Adicione um novo produto</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-foreground-muted" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
        
        {/* Products Tab */}
        {selectedTab === "products" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-border transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full sm:w-20 h-32 sm:h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground truncate">{product.title}</h3>
                      <p className="text-lg font-bold font-display text-foreground mt-1">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                    <Badge variant={product.status === "active" ? "success" : "pending"} className="self-start">
                      {product.status === "active" ? "Ativo" : "Pendente"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-foreground-secondary flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {product.views}
                      </span>
                      <span className="text-sm text-foreground-secondary">
                        {product.sales} vendas
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pause className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        
        {/* Sales Tab */}
        {selectedTab === "sales" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-card border border-border/50 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-background-secondary/50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Produto</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Comprador</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Valor</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-border/30 last:border-0 hover:bg-background-secondary/50 transition-colors">
                      <td className="px-4 py-4 text-sm text-foreground">{sale.product}</td>
                      <td className="px-4 py-4 text-sm text-foreground-secondary">{sale.buyer}</td>
                      <td className="px-4 py-4 text-sm font-medium text-foreground">R$ {sale.amount.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <Badge variant={sale.status === "completed" ? "success" : "warning"}>
                          {sale.status === "completed" ? "Concluída" : "Aguardando"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground-muted">{sale.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        
        {/* Balance Tab */}
        {selectedTab === "balance" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-card border border-warning/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-secondary">Saldo Bloqueado</p>
                    <p className="text-2xl font-display font-bold text-foreground">R$ 299,99</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-muted">
                  Este valor será liberado após o comprador confirmar o recebimento do produto ou após o prazo de segurança.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-card border border-success/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Unlock className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-secondary">Saldo Disponível</p>
                    <p className="text-2xl font-display font-bold text-foreground">R$ 1.890,00</p>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Wallet className="w-4 h-4" />
                  Solicitar Saque
                </Button>
              </div>
            </div>
            
            {/* Info */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2">Como funciona o saldo?</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-warning/10 text-warning text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span>Quando você realiza uma venda, o valor fica bloqueado por segurança.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span>O saldo é liberado quando o comprador confirma o recebimento do produto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-success/10 text-success text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span>Com o saldo disponível, você pode solicitar o saque a qualquer momento.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
