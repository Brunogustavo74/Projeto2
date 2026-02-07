import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings, Shield, CreditCard, Bell, Globe, Save
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    platformName: "NexusGames",
    supportEmail: "suporte@nexusgames.com",
    platformFee: "10",
    minWithdrawal: "50",
    escrowDays: "7",
    maintenanceMode: false,
    newRegistrations: true,
    sellerApproval: true,
    productModeration: true,
    emailNotifications: true,
    disputeAutoClose: "30",
  });

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Configurações da Plataforma</h1>
          </div>
          <p className="text-foreground-secondary mb-8">Gerencie as configurações gerais da plataforma</p>

          <div className="max-w-2xl space-y-6">
            {/* General */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Geral</h2>
                  <p className="text-sm text-foreground-secondary">Configurações básicas da plataforma</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Nome da Plataforma</Label>
                  <Input value={settings.platformName} onChange={(e) => setSettings({ ...settings, platformName: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Email de Suporte</Label>
                  <Input value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} className="mt-1.5" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Modo manutenção</p>
                    <p className="text-sm text-foreground-secondary">Desativa o acesso público à plataforma</p>
                  </div>
                  <Switch checked={settings.maintenanceMode} onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Novos cadastros</p>
                    <p className="text-sm text-foreground-secondary">Permitir novos usuários se cadastrarem</p>
                  </div>
                  <Switch checked={settings.newRegistrations} onCheckedChange={(checked) => setSettings({ ...settings, newRegistrations: checked })} />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Pagamentos</h2>
                  <p className="text-sm text-foreground-secondary">Taxas e configurações financeiras</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Taxa da Plataforma (%)</Label>
                  <Input type="number" value={settings.platformFee} onChange={(e) => setSettings({ ...settings, platformFee: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Saque Mínimo (R$)</Label>
                  <Input type="number" value={settings.minWithdrawal} onChange={(e) => setSettings({ ...settings, minWithdrawal: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Dias de Escrow</Label>
                  <Input type="number" value={settings.escrowDays} onChange={(e) => setSettings({ ...settings, escrowDays: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Auto-fechar disputas (dias)</Label>
                  <Input type="number" value={settings.disputeAutoClose} onChange={(e) => setSettings({ ...settings, disputeAutoClose: e.target.value })} className="mt-1.5" />
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Segurança e Moderação</h2>
                  <p className="text-sm text-foreground-secondary">Controles de aprovação e moderação</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Aprovação de vendedores</p>
                    <p className="text-sm text-foreground-secondary">Exigir aprovação manual para novos vendedores</p>
                  </div>
                  <Switch checked={settings.sellerApproval} onCheckedChange={(checked) => setSettings({ ...settings, sellerApproval: checked })} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Moderação de produtos</p>
                    <p className="text-sm text-foreground-secondary">Aprovar produtos antes de publicar</p>
                  </div>
                  <Switch checked={settings.productModeration} onCheckedChange={(checked) => setSettings({ ...settings, productModeration: checked })} />
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Notificações</h2>
                  <p className="text-sm text-foreground-secondary">Configurações de email e alertas</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Notificações por email</p>
                  <p className="text-sm text-foreground-secondary">Receber alertas de atividades importantes</p>
                </div>
                <Switch checked={settings.emailNotifications} onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })} />
              </div>
            </section>

            <Button onClick={handleSave} disabled={isLoading} className="w-full gap-2">
              {isLoading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Salvar Configurações</>}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
