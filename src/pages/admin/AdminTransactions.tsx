import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const mockTransactions = [
  { id: "txn_001", product: "Conta Valorant - Radiant", buyer: "Comprador123", seller: "ProGamer", amount: 299.99, fee: 30.00, status: "completed", date: "2024-06-20 14:30" },
  { id: "txn_002", product: "Gift Card Steam R$100", buyer: "GamerPro", seller: "CardMaster", amount: 89.90, fee: 8.99, status: "completed", date: "2024-06-19 18:45" },
  { id: "txn_003", product: "Pacote Skins CS2", buyer: "SkinFan", seller: "SkinTrader", amount: 459.00, fee: 45.90, status: "pending", date: "2024-06-21 09:15" },
  { id: "txn_004", product: "Conta Fortnite 200+ Skins", buyer: "FortniteKid", seller: "EpicSeller", amount: 199.99, fee: 20.00, status: "disputed", date: "2024-06-18 12:00" },
  { id: "txn_005", product: "Gift Card PSN R$250", buyer: "PSNLover", seller: "PSNStore", amount: 235.00, fee: 23.50, status: "completed", date: "2024-06-17 16:20" },
  { id: "txn_006", product: "Conta LoL Diamond", buyer: "LeaguePlayer", seller: "LOLBoost", amount: 149.99, fee: 15.00, status: "refunded", date: "2024-06-16 11:30" },
];

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "default" }> = {
  completed: { label: "Concluída", variant: "success" },
  pending: { label: "Pendente", variant: "warning" },
  disputed: { label: "Em Disputa", variant: "destructive" },
  refunded: { label: "Reembolsada", variant: "default" },
};

export default function AdminTransactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockTransactions.filter((t) => {
    const matchSearch = t.product.toLowerCase().includes(search.toLowerCase()) || t.buyer.toLowerCase().includes(search.toLowerCase()) || t.seller.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const totalVolume = filtered.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = filtered.reduce((sum, t) => sum + t.fee, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Transações</h1>
          </div>
          <p className="text-foreground-secondary mb-8">Monitore todas as transações da plataforma</p>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <p className="text-sm text-foreground-secondary">Volume Total</p>
              <p className="text-xl font-display font-bold text-foreground">R$ {totalVolume.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <p className="text-sm text-foreground-secondary">Taxas Coletadas</p>
              <p className="text-xl font-display font-bold text-success">R$ {totalFees.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50 col-span-2 sm:col-span-1">
              <p className="text-sm text-foreground-secondary">Total de Transações</p>
              <p className="text-xl font-display font-bold text-foreground">{filtered.length}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <Input placeholder="Buscar transação..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "Todas" },
                { key: "completed", label: "Concluídas" },
                { key: "pending", label: "Pendentes" },
                { key: "disputed", label: "Disputas" },
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

          <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-background-secondary/50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Produto</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary hidden md:table-cell">Comprador</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary hidden md:table-cell">Vendedor</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Valor</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary hidden sm:table-cell">Status</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-foreground-secondary">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((txn) => {
                    const config = statusConfig[txn.status];
                    return (
                      <tr key={txn.id} className="border-b border-border/30 last:border-0 hover:bg-background-secondary/50 transition-colors">
                        <td className="px-4 py-4">
                          <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{txn.product}</p>
                          <p className="text-xs text-foreground-muted">{txn.date}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground-secondary hidden md:table-cell">{txn.buyer}</td>
                        <td className="px-4 py-4 text-sm text-foreground-secondary hidden md:table-cell">{txn.seller}</td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-medium text-foreground">R$ {txn.amount.toFixed(2)}</p>
                          <p className="text-xs text-foreground-muted">Taxa: R$ {txn.fee.toFixed(2)}</p>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => toast.info("Ver detalhes")}><Eye className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-foreground-secondary">
            <span>{filtered.length} transações</span>
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
