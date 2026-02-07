import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Package, Search, CheckCircle2, XCircle, Eye, Trash2
} from "lucide-react";
import { toast } from "sonner";

const mockProducts = [
  { id: "1", title: "Conta Valorant - Imortal", seller: "ProGamer", price: 199.99, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop", status: "pending", submittedAt: "Há 1 hora", category: "Contas" },
  { id: "2", title: "Gift Card PlayStation R$100", seller: "CardMaster", price: 95.00, image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop", status: "pending", submittedAt: "Há 3 horas", category: "Gift Cards" },
  { id: "3", title: "Skin AWP Dragon Lore", seller: "SkinTrader", price: 1299.00, image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=200&h=200&fit=crop", status: "active", submittedAt: "5 dias atrás", category: "Skins" },
  { id: "4", title: "Conta LoL Diamond IV", seller: "LOLBoost", price: 149.99, image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop", status: "active", submittedAt: "1 semana atrás", category: "Contas" },
  { id: "5", title: "Game Pass Ultimate 3 Meses", seller: "GamePassBR", price: 119.90, image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=200&h=200&fit=crop", status: "rejected", submittedAt: "2 dias atrás", category: "Serviços" },
];

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockProducts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Moderação de Produtos</h1>
          </div>
          <p className="text-foreground-secondary mb-8">Aprove, rejeite e remova produtos da plataforma</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <Input placeholder="Buscar produto ou vendedor..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
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
            {filtered.map((product) => (
              <div key={product.id} className="rounded-xl bg-card border border-border/50 p-4 hover:border-border transition-colors">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img src={product.image} alt={product.title} className="w-full sm:w-16 h-32 sm:h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="min-w-0">
                        <h3 className="font-medium text-foreground truncate">{product.title}</h3>
                        <p className="text-sm text-foreground-secondary">Por {product.seller} • {product.category} • {product.submittedAt}</p>
                        <p className="text-lg font-bold font-display text-foreground mt-1">R$ {product.price.toFixed(2)}</p>
                      </div>
                      <Badge variant={product.status === "active" ? "success" : product.status === "pending" ? "warning" : "destructive"}>
                        {product.status === "active" ? "Ativo" : product.status === "pending" ? "Pendente" : "Rejeitado"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 flex-shrink-0 justify-end">
                    <Button variant="ghost" size="sm" onClick={() => toast.info("Visualizar produto")}><Eye className="w-4 h-4" /></Button>
                    {product.status === "pending" && (
                      <>
                        <Button variant="success" size="sm" onClick={() => toast.success("Produto aprovado!")}><CheckCircle2 className="w-4 h-4" /></Button>
                        <Button variant="destructive" size="sm" onClick={() => toast.error("Produto rejeitado")}><XCircle className="w-4 h-4" /></Button>
                      </>
                    )}
                    {product.status === "active" && (
                      <Button variant="destructive" size="sm" onClick={() => toast.warning("Produto removido")}><Trash2 className="w-4 h-4" /></Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
