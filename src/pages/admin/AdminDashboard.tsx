import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, Package, DollarSign, AlertTriangle,
  CheckCircle2, XCircle, Clock, Eye, ChevronRight,
  Shield, TrendingUp, ShoppingCart, UserPlus, Activity
} from "lucide-react";

const revenueData = [
  { month: "Jul", receita: 12400, vendas: 84 },
  { month: "Ago", receita: 18200, vendas: 112 },
  { month: "Set", receita: 15800, vendas: 98 },
  { month: "Out", receita: 22300, vendas: 134 },
  { month: "Nov", receita: 28700, vendas: 167 },
  { month: "Dez", receita: 35100, vendas: 201 },
  { month: "Jan", receita: 41200, vendas: 245 },
];

const categoryData = [
  { name: "Contas", value: 35, color: "hsl(230, 90%, 64%)" },
  { name: "Gift Cards", value: 28, color: "hsl(260, 80%, 55%)" },
  { name: "Skins", value: 20, color: "hsl(42, 76%, 53%)" },
  { name: "E-books", value: 12, color: "hsl(122, 39%, 49%)" },
  { name: "Outros", value: 5, color: "hsl(220, 9%, 46%)" },
];

const dailyUsersData = [
  { dia: "Seg", novos: 18, ativos: 142 },
  { dia: "Ter", novos: 24, ativos: 158 },
  { dia: "Qua", novos: 12, ativos: 135 },
  { dia: "Qui", novos: 31, ativos: 172 },
  { dia: "Sex", novos: 28, ativos: 189 },
  { dia: "Sáb", novos: 42, ativos: 210 },
  { dia: "Dom", novos: 35, ativos: 195 },
];

const pendingVendors = [
  { id: "v1", name: "João Silva", email: "joao@email.com", requestedAt: "Há 2 horas" },
  { id: "v2", name: "Maria Santos", email: "maria@email.com", requestedAt: "Há 5 horas" },
  { id: "v3", name: "Carlos Lima", email: "carlos@email.com", requestedAt: "Há 1 dia" },
];

const pendingProducts = [
  { id: "p1", title: "Conta Valorant - Imortal", seller: "ProGamer", price: 199.99, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop", submittedAt: "Há 1 hora" },
  { id: "p2", title: "Gift Card PSN R$100", seller: "CardMaster", price: 95.00, image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop", submittedAt: "Há 3 horas" },
];

const recentDisputes = [
  { id: "d1", orderId: "ord_abc123", buyer: "Comprador123", seller: "VendedorX", product: "Conta LoL Diamond", amount: 149.99, reason: "Produto não entregue", openedAt: "Há 6 horas" },
];

const recentActivity = [
  { id: "a1", type: "sale", text: "Nova venda: Conta Valorant por R$ 299,99", time: "2 min atrás" },
  { id: "a2", type: "user", text: "Novo usuário registrado: pedro@email.com", time: "15 min atrás" },
  { id: "a3", type: "dispute", text: "Nova disputa aberta no pedido #abc123", time: "30 min atrás" },
  { id: "a4", type: "seller", text: "Solicitação de vendedor: João Silva", time: "1h atrás" },
  { id: "a5", type: "product", text: "Novo produto para moderação: Gift Card PSN", time: "2h atrás" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-popover border border-border/50 p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-foreground-secondary">
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen py-6 md:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">
                Painel Admin
              </h1>
            </div>
            <p className="text-sm text-foreground-secondary">Visão geral da plataforma</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link to="/admin/users"><Button variant="outline" size="sm" className="gap-1 text-xs"><Users className="w-3.5 h-3.5" />Usuários</Button></Link>
            <Link to="/admin/sellers"><Button variant="outline" size="sm" className="gap-1 text-xs"><Users className="w-3.5 h-3.5" />Vendedores</Button></Link>
            <Link to="/admin/products"><Button variant="outline" size="sm" className="gap-1 text-xs"><Package className="w-3.5 h-3.5" />Produtos</Button></Link>
            <Link to="/admin/transactions"><Button variant="outline" size="sm" className="gap-1 text-xs"><DollarSign className="w-3.5 h-3.5" />Transações</Button></Link>
            <Link to="/admin/disputes"><Button variant="outline" size="sm" className="gap-1 text-xs"><AlertTriangle className="w-3.5 h-3.5" />Disputas</Button></Link>
            <Link to="/admin/settings"><Button variant="outline" size="sm" className="gap-1 text-xs"><Shield className="w-3.5 h-3.5" />Config</Button></Link>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 md:space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <StatCard title="Usuários Totais" value="2.458" icon={Users} trend={{ value: 8, isPositive: true }} variant="primary" />
            <StatCard title="Vendedores" value="342" icon={TrendingUp} trend={{ value: 5, isPositive: true }} variant="default" />
            <StatCard title="Vendas (mês)" value="R$ 89.4k" subtitle="Este mês" icon={DollarSign} trend={{ value: 15, isPositive: true }} variant="success" />
            <StatCard title="Disputas" value="3" icon={AlertTriangle} variant="warning" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Revenue */}
            <div className="lg:col-span-2 rounded-xl bg-card border border-border/50 p-4 md:p-5">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">Receita Mensal</h3>
                  <p className="text-xs md:text-sm text-foreground-secondary">Últimos 7 meses</p>
                </div>
                <Badge className="gap-1 text-xs">
                  <TrendingUp className="w-3 h-3" />+17%
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(230, 90%, 64%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(230, 90%, 64%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 14%, 18%)" />
                  <XAxis dataKey="month" stroke="hsl(220, 9%, 46%)" fontSize={11} tickLine={false} />
                  <YAxis stroke="hsl(220, 9%, 46%)" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={35} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="receita" name="Receita (R$)" stroke="hsl(230, 90%, 64%)" strokeWidth={2} fillOpacity={1} fill="url(#colorReceita)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie */}
            <div className="rounded-xl bg-card border border-border/50 p-4 md:p-5">
              <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">Categorias</h3>
              <p className="text-xs text-foreground-secondary mb-3">Distribuição de vendas</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                    {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return <div className="rounded-lg bg-popover border border-border/50 p-2 shadow-lg"><p className="text-xs text-foreground">{payload[0].name}: {payload[0].value}%</p></div>;
                    }
                    return null;
                  }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-foreground-secondary">{cat.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Users Chart + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 rounded-xl bg-card border border-border/50 p-4 md:p-5">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">Usuários Semanais</h3>
                  <p className="text-xs md:text-sm text-foreground-secondary">Novos vs ativos</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /><span className="text-foreground-secondary hidden sm:inline">Ativos</span></div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(122, 39%, 49%)" }} /><span className="text-foreground-secondary hidden sm:inline">Novos</span></div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dailyUsersData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 14%, 18%)" />
                  <XAxis dataKey="dia" stroke="hsl(220, 9%, 46%)" fontSize={11} tickLine={false} />
                  <YAxis stroke="hsl(220, 9%, 46%)" fontSize={11} tickLine={false} width={30} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="ativos" name="Ativos" fill="hsl(230, 90%, 64%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="novos" name="Novos" fill="hsl(122, 39%, 49%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Activity */}
            <div className="rounded-xl bg-card border border-border/50 p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground text-sm md:text-base">Atividade Recente</h3>
              </div>
              <div className="space-y-2">
                {recentActivity.map((a) => {
                  const icons: Record<string, { icon: typeof ShoppingCart; color: string }> = {
                    sale: { icon: ShoppingCart, color: "text-success" },
                    user: { icon: UserPlus, color: "text-primary" },
                    dispute: { icon: AlertTriangle, color: "text-destructive" },
                    seller: { icon: Users, color: "text-warning" },
                    product: { icon: Package, color: "text-primary" },
                  };
                  const c = icons[a.type] || icons.product;
                  const Icon = c.icon;
                  return (
                    <div key={a.id} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-background-secondary/50 transition-colors">
                      <div className={`mt-0.5 ${c.color}`}><Icon className="w-3.5 h-3.5" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground leading-snug line-clamp-2">{a.text}</p>
                        <p className="text-[10px] text-foreground-muted mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pending items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Vendors */}
            <div className="rounded-xl bg-card border border-border/50 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-warning" />Vendedores Pendentes
                </h3>
                <Badge variant="warning">{pendingVendors.length}</Badge>
              </div>
              <div className="space-y-2">
                {pendingVendors.map((v) => (
                  <div key={v.id} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary/50 hover:bg-background-secondary transition-colors gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{v.name}</p>
                      <p className="text-xs text-foreground-secondary truncate">{v.email}</p>
                      <p className="text-[10px] text-foreground-muted">{v.requestedAt}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Button variant="success" size="sm" className="h-8 w-8 p-0"><CheckCircle2 className="w-4 h-4" /></Button>
                      <Button variant="destructive" size="sm" className="h-8 w-8 p-0"><XCircle className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/admin/sellers" className="w-full mt-3 text-primary text-xs font-medium hover:underline flex items-center justify-center gap-1">
                Ver todos <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Products */}
            <div className="rounded-xl bg-card border border-border/50 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-primary" />Anúncios para Aprovar
                </h3>
                <Badge>{pendingProducts.length}</Badge>
              </div>
              <div className="space-y-2">
                {pendingProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-background-secondary/50 hover:bg-background-secondary transition-colors">
                    <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{p.title}</p>
                      <p className="text-xs text-foreground-secondary truncate">Por {p.seller} • {p.submittedAt}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="w-4 h-4" /></Button>
                      <Button variant="success" size="sm" className="h-8 w-8 p-0"><CheckCircle2 className="w-4 h-4" /></Button>
                      <Button variant="destructive" size="sm" className="h-8 w-8 p-0"><XCircle className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/admin/products" className="w-full mt-3 text-primary text-xs font-medium hover:underline flex items-center justify-center gap-1">
                Ver todos <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Disputes */}
          <div className="rounded-xl bg-card border border-destructive/20 p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-destructive" />Disputas Ativas
              </h3>
              <Badge variant="destructive">{recentDisputes.length}</Badge>
            </div>
            <div className="space-y-2">
              {recentDisputes.map((d) => (
                <div key={d.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-background-secondary/50 gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm">{d.product}</p>
                    <p className="text-xs text-foreground-secondary">#{d.orderId.slice(-6)} • {d.buyer} vs {d.seller} • R$ {d.amount.toFixed(2)}</p>
                    <p className="text-[10px] text-foreground-muted">{d.reason} • {d.openedAt}</p>
                  </div>
                  <Button variant="outline" size="sm" className="self-start sm:self-auto">Analisar</Button>
                </div>
              ))}
            </div>
            <Link to="/admin/disputes" className="w-full mt-3 text-primary text-xs font-medium hover:underline flex items-center justify-center gap-1">
              Ver todas <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="p-3 md:p-4 rounded-xl bg-card border border-border/50 text-center">
              <p className="text-lg md:text-2xl font-display font-bold text-foreground">156</p>
              <p className="text-[10px] md:text-xs text-foreground-secondary mt-0.5">Vendas Hoje</p>
            </div>
            <div className="p-3 md:p-4 rounded-xl bg-card border border-border/50 text-center">
              <p className="text-lg md:text-2xl font-display font-bold text-foreground">R$ 12.4k</p>
              <p className="text-[10px] md:text-xs text-foreground-secondary mt-0.5">Receita Hoje</p>
            </div>
            <div className="p-3 md:p-4 rounded-xl bg-card border border-border/50 text-center">
              <p className="text-lg md:text-2xl font-display font-bold text-foreground">98.2%</p>
              <p className="text-[10px] md:text-xs text-foreground-secondary mt-0.5">Taxa Sucesso</p>
            </div>
            <div className="p-3 md:p-4 rounded-xl bg-card border border-border/50 text-center">
              <p className="text-lg md:text-2xl font-display font-bold text-foreground">4.8</p>
              <p className="text-[10px] md:text-xs text-foreground-secondary mt-0.5">Avaliação Média</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
