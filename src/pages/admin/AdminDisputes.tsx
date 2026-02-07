import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Search, Eye, CheckCircle2, XCircle, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const mockDisputes = [
  { id: "d1", orderId: "ord_abc123", product: "Conta LoL Diamond", buyer: "Comprador123", seller: "VendedorX", amount: 149.99, status: "open", reason: "Produto não entregue", openedAt: "Há 6 horas", messages: 3 },
  { id: "d2", orderId: "ord_def456", product: "Gift Card Steam R$100", buyer: "GamerPro", seller: "CardMaster", amount: 89.90, status: "open", reason: "Produto diferente do anunciado", openedAt: "Há 1 dia", messages: 5 },
  { id: "d3", orderId: "ord_ghi789", product: "Conta Fortnite", buyer: "FortniteKid", seller: "EpicSeller", amount: 199.99, status: "resolved_buyer", reason: "Conta banida", openedAt: "Há 3 dias", messages: 8 },
  { id: "d4", orderId: "ord_jkl012", product: "Skin CS2 AWP", buyer: "SkinFan", seller: "SkinTrader", amount: 459.00, status: "resolved_seller", reason: "Produto funcionando corretamente", openedAt: "Há 5 dias", messages: 4 },
];

const statusConfig: Record<string, { label: string; variant: "warning" | "success" | "default" | "destructive" }> = {
  open: { label: "Aberta", variant: "warning" },
  resolved_buyer: { label: "Favor Comprador", variant: "success" },
  resolved_seller: { label: "Favor Vendedor", variant: "default" },
};

export default function AdminDisputes() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockDisputes.filter((d) => {
    const matchSearch = d.product.toLowerCase().includes(search.toLowerCase()) || d.buyer.toLowerCase().includes(search.toLowerCase()) || d.seller.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Disputas</h1>
          </div>
          <p className="text-foreground-secondary mb-8">Gerencie e resolva disputas entre compradores e vendedores</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <Input placeholder="Buscar disputa..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "Todas" },
                { key: "open", label: "Abertas" },
                { key: "resolved_buyer", label: "Resolvidas" },
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
            {filtered.map((dispute) => {
              const config = statusConfig[dispute.status];
              return (
                <div key={dispute.id} className={`rounded-xl bg-card border p-4 hover:border-border transition-colors ${dispute.status === "open" ? "border-destructive/30" : "border-border/50"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-medium text-foreground">{dispute.product}</h3>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </div>
                      <p className="text-sm text-foreground-secondary">
                        #{dispute.orderId.slice(-6)} • {dispute.buyer} vs {dispute.seller} • R$ {dispute.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-foreground-muted mt-1">
                        Motivo: {dispute.reason} • {dispute.openedAt}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-foreground-muted">
                        <MessageSquare className="w-3 h-3" />
                        {dispute.messages} mensagens
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => toast.info("Ver detalhes da disputa")}><Eye className="w-4 h-4 mr-1" /> Analisar</Button>
                      {dispute.status === "open" && (
                        <>
                          <Button variant="success" size="sm" onClick={() => toast.success("Resolvido a favor do comprador")}><CheckCircle2 className="w-4 h-4" /></Button>
                          <Button variant="outline" size="sm" onClick={() => toast.info("Resolvido a favor do vendedor")}><XCircle className="w-4 h-4" /></Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
