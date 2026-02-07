import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users, Search, MoreVertical, Shield, Ban, Eye,
  ChevronLeft, ChevronRight, Mail
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const mockUsers = [
  { id: "1", name: "João Silva", email: "joao@email.com", role: "buyer", status: "active", createdAt: "2024-01-15", purchases: 12 },
  { id: "2", name: "Maria Santos", email: "maria@email.com", role: "seller", status: "active", createdAt: "2024-02-20", purchases: 0 },
  { id: "3", name: "Carlos Lima", email: "carlos@email.com", role: "buyer", status: "suspended", createdAt: "2024-03-10", purchases: 3 },
  { id: "4", name: "Ana Costa", email: "ana@email.com", role: "seller", status: "active", createdAt: "2024-04-05", purchases: 0 },
  { id: "5", name: "Pedro Souza", email: "pedro@email.com", role: "buyer", status: "active", createdAt: "2024-05-12", purchases: 8 },
  { id: "6", name: "Julia Mendes", email: "julia@email.com", role: "admin", status: "active", createdAt: "2023-12-01", purchases: 0 },
];

const roleLabels: Record<string, string> = { buyer: "Comprador", seller: "Vendedor", admin: "Admin" };
const roleVariants: Record<string, "default" | "success" | "destructive"> = { buyer: "default", seller: "success", admin: "destructive" };

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Usuários</h1>
          </div>
          <p className="text-foreground-secondary mb-8">Gerencie todos os usuários da plataforma</p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <Input placeholder="Buscar por nome ou email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              {["all", "buyer", "seller", "admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => setFilterRole(role)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filterRole === role ? "bg-primary text-primary-foreground" : "bg-card text-foreground-secondary hover:text-foreground border border-border/50"}`}
                >
                  {role === "all" ? "Todos" : roleLabels[role]}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-background-secondary/50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary">Usuário</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary hidden sm:table-cell">Tipo</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary hidden md:table-cell">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-foreground-secondary hidden lg:table-cell">Cadastro</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-foreground-secondary">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-border/30 last:border-0 hover:bg-background-secondary/50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-foreground-secondary">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <Badge variant={roleVariants[user.role]}>{roleLabels[user.role]}</Badge>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <Badge variant={user.status === "active" ? "success" : "destructive"}>
                          {user.status === "active" ? "Ativo" : "Suspenso"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell text-sm text-foreground-muted">
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover border border-border z-50">
                            <DropdownMenuItem onClick={() => toast.info("Ver perfil")}>
                              <Eye className="w-4 h-4 mr-2" /> Ver perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info("Email enviado")}>
                              <Mail className="w-4 h-4 mr-2" /> Enviar email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info("Promovido a admin")}>
                              <Shield className="w-4 h-4 mr-2" /> Tornar admin
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => toast.warning("Usuário suspenso")}>
                              <Ban className="w-4 h-4 mr-2" /> Suspender
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-foreground-secondary">
            <span>{filtered.length} usuários encontrados</span>
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
