import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Store, Search, CheckCircle2, XCircle, Eye, Clock, ChevronLeft, ChevronRight
} from "lucide-react";
import { toast } from "sonner";

const mockSellers = [
  { id: "1", name: "João Silva", email: "joao@email.com", cpf: "123.456.789-00", products: 15, sales: 234, revenue: 12450, status: "active", requestedAt: "2024-01-15" },
  { id: "2", name: "Maria Santos", email: "maria@email.com", cpf: "987.654.321-00", products: 0, sales: 0, revenue: 0, status: "pending", requestedAt: "2024-06-20" },
  { id: "3", name: "Carlos Lima", email: "carlos@email.com", cpf: "456.789.123-00", products: 0, sales: 0, revenue: 0, status: "pending", requestedAt: "2024-06-21" },
  { id: "4", name: "Ana Costa", email: "ana@email.com", cpf: "321.654.987-00", products: 8, sales: 89, revenue: 5670, status: "active", requestedAt: "2024-02-10" },
  { id: "5", name: "Pedro Souza", email: "pedro@email.com", cpf: "654.321.987-00", products: 0, sales: 0, revenue: 0, status: "rejected", requestedAt: "2024-05-15" },
];

export default function AdminSellers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockSellers.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Store className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Vendedores</h1>
          </div>
          <p className="text-foreground-secondary mb-8">Aprove, rejeite e gerencie vendedores</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <Input placeholder="Buscar vendedor..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "Todos" },
                { key: "pending", label: "Pendentes" },
                { key: "active", label: "Ativos" },
                { key: "rejected", label: "Rejeitados" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f.key ? "bg-primary text-primary-foreground" : "bg-card text-foreground-secondary hover:text-foreground border border-border/50"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((seller) => (
              <div key={seller.id} className="rounded-xl bg-card border border-border/50 p-4 hover:border-border transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-foreground">{seller.name}</h3>
                      <Badge variant={seller.status === "active" ? "success" : seller.status === "pending" ? "warning" : "destructive"}>
                        {seller.status === "active" ? "Ativo" : seller.status === "pending" ? "Pendente" : "Rejeitado"}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-secondary">{seller.email} • CPF: {seller.cpf}</p>
                    {seller.status === "active" && (
                      <div className="flex gap-4 mt-2 text-xs text-foreground-muted">
                        <span>{seller.products} produtos</span>
                        <span>{seller.sales} vendas</span>
                        <span>R$ {seller.revenue.toLocaleString("pt-BR")}</span>
                      </div>
                    )}
                    {seller.status === "pending" && (
                      <p className="text-xs text-foreground-muted mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Solicitado em {new Date(seller.requestedAt).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => toast.info("Ver perfil")}><Eye className="w-4 h-4" /></Button>
                    {seller.status === "pending" && (
                      <>
                        <Button variant="success" size="sm" onClick={() => toast.success("Vendedor aprovado!")}><CheckCircle2 className="w-4 h-4 mr-1" /> Aprovar</Button>
                        <Button variant="destructive" size="sm" onClick={() => toast.error("Vendedor rejeitado")}><XCircle className="w-4 h-4 mr-1" /> Rejeitar</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-foreground-secondary">
            <span>{filtered.length} vendedores</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" disabled><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
