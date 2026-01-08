import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  DollarSign, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Ban,
  ChevronRight,
  Shield,
  TrendingUp
} from "lucide-react";

// Mock data
const pendingVendors = [
  {
    id: "v1",
    name: "João Silva",
    email: "joao@email.com",
    requestedAt: "Há 2 horas",
    document: "123.456.789-00",
  },
  {
    id: "v2",
    name: "Maria Santos",
    email: "maria@email.com",
    requestedAt: "Há 5 horas",
    document: "987.654.321-00",
  },
];

const pendingProducts = [
  {
    id: "p1",
    title: "Conta Valorant - Imortal",
    seller: "ProGamer",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    submittedAt: "Há 1 hora",
  },
  {
    id: "p2",
    title: "Gift Card PlayStation R$100",
    seller: "CardMaster",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop",
    submittedAt: "Há 3 horas",
  },
];

const recentDisputes = [
  {
    id: "d1",
    orderId: "ord_abc123",
    buyer: "Comprador123",
    seller: "VendedorX",
    product: "Conta LoL Diamond",
    amount: 149.99,
    status: "open",
    reason: "Produto não entregue",
    openedAt: "Há 6 horas",
  },
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "vendors" | "products" | "transactions" | "disputes">("overview");
  
  const tabs = [
    { id: "overview", label: "Visão Geral" },
    { id: "vendors", label: "Vendedores" },
    { id: "products", label: "Anúncios" },
    { id: "transactions", label: "Transações" },
    { id: "disputes", label: "Disputas" },
  ];
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Painel Administrativo
              </h1>
            </div>
            <p className="text-foreground-secondary">
              Gerencie toda a plataforma em um só lugar
            </p>
          </div>
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
                title="Usuários Totais"
                value="2.458"
                icon={Users}
                trend={{ value: 8, isPositive: true }}
                variant="primary"
              />
              <StatCard
                title="Vendedores Ativos"
                value="342"
                icon={TrendingUp}
                variant="default"
              />
              <StatCard
                title="Volume de Vendas"
                value="R$ 89.450"
                subtitle="Este mês"
                icon={DollarSign}
                trend={{ value: 15, isPositive: true }}
                variant="success"
              />
              <StatCard
                title="Disputas Abertas"
                value="3"
                icon={AlertTriangle}
                variant="warning"
              />
            </div>
            
            {/* Pending Items Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Vendors */}
              <div className="rounded-xl bg-card border border-border/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-warning" />
                    Vendedores Pendentes
                  </h3>
                  <Badge variant="warning">{pendingVendors.length}</Badge>
                </div>
                
                <div className="space-y-3">
                  {pendingVendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-background-secondary/50 hover:bg-background-secondary transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{vendor.name}</p>
                        <p className="text-sm text-foreground-secondary">{vendor.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="success" size="sm">
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedTab("vendors")}
                  className="w-full mt-4 text-primary text-sm font-medium hover:underline flex items-center justify-center gap-1"
                >
                  Ver todos vendedores
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Pending Products */}
              <div className="rounded-xl bg-card border border-border/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    Anúncios para Aprovar
                  </h3>
                  <Badge variant="pending">{pendingProducts.length}</Badge>
                </div>
                
                <div className="space-y-3">
                  {pendingProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background-secondary/50 hover:bg-background-secondary transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{product.title}</p>
                        <p className="text-sm text-foreground-secondary">Por {product.seller}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="success" size="sm">
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedTab("products")}
                  className="w-full mt-4 text-primary text-sm font-medium hover:underline flex items-center justify-center gap-1"
                >
                  Ver todos anúncios
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Active Disputes */}
            <div className="rounded-xl bg-card border border-destructive/20 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Disputas Ativas
                </h3>
                <Badge variant="destructive">{recentDisputes.length}</Badge>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left px-3 py-2 text-sm font-medium text-foreground-secondary">Pedido</th>
                      <th className="text-left px-3 py-2 text-sm font-medium text-foreground-secondary">Produto</th>
                      <th className="text-left px-3 py-2 text-sm font-medium text-foreground-secondary">Comprador</th>
                      <th className="text-left px-3 py-2 text-sm font-medium text-foreground-secondary">Vendedor</th>
                      <th className="text-left px-3 py-2 text-sm font-medium text-foreground-secondary">Valor</th>
                      <th className="text-left px-3 py-2 text-sm font-medium text-foreground-secondary">Motivo</th>
                      <th className="text-left px-3 py-2 text-sm font-medium text-foreground-secondary">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDisputes.map((dispute) => (
                      <tr key={dispute.id} className="border-b border-border/30 last:border-0">
                        <td className="px-3 py-3 text-sm text-foreground">#{dispute.orderId.slice(-6)}</td>
                        <td className="px-3 py-3 text-sm text-foreground">{dispute.product}</td>
                        <td className="px-3 py-3 text-sm text-foreground-secondary">{dispute.buyer}</td>
                        <td className="px-3 py-3 text-sm text-foreground-secondary">{dispute.seller}</td>
                        <td className="px-3 py-3 text-sm font-medium text-foreground">R$ {dispute.amount.toFixed(2)}</td>
                        <td className="px-3 py-3 text-sm text-foreground-secondary">{dispute.reason}</td>
                        <td className="px-3 py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Analisar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Vendors Tab */}
        {selectedTab === "vendors" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-card border border-border/50 p-5"
          >
            <h3 className="font-semibold text-foreground mb-4">Solicitações de Vendedor</h3>
            
            <div className="space-y-4">
              {pendingVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-background-secondary/50 border border-border/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{vendor.name}</p>
                      <p className="text-sm text-foreground-secondary truncate">{vendor.email}</p>
                      <p className="text-xs text-foreground-muted mt-1">CPF: {vendor.document}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="gap-1 flex-1 sm:flex-none">
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">Ver</span>
                    </Button>
                    <Button variant="success" size="sm" className="gap-1 flex-1 sm:flex-none">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Aprovar</span>
                    </Button>
                    <Button variant="destructive" size="sm" className="gap-1 flex-1 sm:flex-none">
                      <XCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Recusar</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Products Tab */}
        {selectedTab === "products" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-card border border-border/50 p-5"
          >
            <h3 className="font-semibold text-foreground mb-4">Anúncios Pendentes</h3>
            
            <div className="space-y-4">
              {pendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background-secondary/50 border border-border/30"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{product.title}</p>
                    <p className="text-sm text-foreground-secondary">Por {product.seller}</p>
                    <p className="text-lg font-bold font-display text-foreground mt-1">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      Revisar
                    </Button>
                    <Button variant="success" size="sm" className="gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Aprovar
                    </Button>
                    <Button variant="destructive" size="sm" className="gap-1">
                      <XCircle className="w-4 h-4" />
                      Recusar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Transactions Tab */}
        {selectedTab === "transactions" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-card border border-border/50 overflow-hidden"
          >
            <div className="p-4 border-b border-border/50">
              <h3 className="font-semibold text-foreground">Todas as Transações</h3>
            </div>
            <div className="p-8 text-center text-foreground-secondary">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-foreground-muted" />
              <p>Sistema de transações será integrado com Stripe/Mercado Pago</p>
            </div>
          </motion.div>
        )}
        
        {/* Disputes Tab */}
        {selectedTab === "disputes" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {recentDisputes.map((dispute) => (
              <div
                key={dispute.id}
                className="p-5 rounded-xl bg-card border border-destructive/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <span className="font-semibold text-foreground">Disputa #{dispute.id.slice(-4)}</span>
                      <Badge variant="destructive">Aberta</Badge>
                    </div>
                    <p className="text-sm text-foreground-secondary">Aberta {dispute.openedAt}</p>
                  </div>
                  <span className="text-xl font-display font-bold text-foreground">
                    R$ {dispute.amount.toFixed(2)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-background-secondary/50">
                    <p className="text-xs text-foreground-muted mb-1">Produto</p>
                    <p className="text-sm font-medium text-foreground">{dispute.product}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background-secondary/50">
                    <p className="text-xs text-foreground-muted mb-1">Comprador</p>
                    <p className="text-sm font-medium text-foreground">{dispute.buyer}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background-secondary/50">
                    <p className="text-xs text-foreground-muted mb-1">Vendedor</p>
                    <p className="text-sm font-medium text-foreground">{dispute.seller}</p>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 mb-4">
                  <p className="text-xs text-foreground-muted mb-1">Motivo da Disputa</p>
                  <p className="text-sm text-foreground">{dispute.reason}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Eye className="w-4 h-4" />
                    Ver Detalhes
                  </Button>
                  <Button variant="success" className="gap-1">
                    Favor Comprador
                  </Button>
                  <Button variant="warning" className="gap-1">
                    Favor Vendedor
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
