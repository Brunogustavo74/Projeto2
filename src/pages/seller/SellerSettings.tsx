import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings, Store, CreditCard, Bell, Save
} from "lucide-react";
import { toast } from "sonner";

export default function SellerSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "Minha Loja",
    storeDescription: "Vendas de produtos digitais para gamers",
    pixKey: "",
    pixType: "cpf",
    notifySales: true,
    notifyMessages: true,
    notifyDisputes: true,
    autoReply: false,
    autoReplyMessage: "Obrigado pela compra! Em breve enviarei o produto.",
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
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Configurações do Vendedor</h1>
          </div>
          <p className="text-foreground-secondary mb-8">Gerencie sua loja e preferências</p>

          <div className="max-w-2xl space-y-6">
            {/* Store */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Store className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Minha Loja</h2>
                  <p className="text-sm text-foreground-secondary">Informações da sua loja</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Nome da Loja</Label>
                  <Input value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea value={settings.storeDescription} onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })} className="mt-1.5" rows={3} />
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
                  <h2 className="text-lg font-semibold text-foreground">Pagamento</h2>
                  <p className="text-sm text-foreground-secondary">Configure seus dados de saque</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Tipo de Chave PIX</Label>
                  <select
                    value={settings.pixType}
                    onChange={(e) => setSettings({ ...settings, pixType: e.target.value })}
                    className="w-full h-10 px-3 mt-1.5 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="cpf">CPF</option>
                    <option value="email">Email</option>
                    <option value="phone">Telefone</option>
                    <option value="random">Chave aleatória</option>
                  </select>
                </div>
                <div>
                  <Label>Chave PIX</Label>
                  <Input value={settings.pixKey} onChange={(e) => setSettings({ ...settings, pixKey: e.target.value })} placeholder="Sua chave PIX" className="mt-1.5" />
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="p-6 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Notificações</h2>
                  <p className="text-sm text-foreground-secondary">Escolha o que deseja ser notificado</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Novas vendas</p>
                    <p className="text-sm text-foreground-secondary">Ser notificado sobre vendas</p>
                  </div>
                  <Switch checked={settings.notifySales} onCheckedChange={(c) => setSettings({ ...settings, notifySales: c })} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Mensagens</p>
                    <p className="text-sm text-foreground-secondary">Notificar sobre novas mensagens</p>
                  </div>
                  <Switch checked={settings.notifyMessages} onCheckedChange={(c) => setSettings({ ...settings, notifyMessages: c })} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Disputas</p>
                    <p className="text-sm text-foreground-secondary">Alertas sobre disputas abertas</p>
                  </div>
                  <Switch checked={settings.notifyDisputes} onCheckedChange={(c) => setSettings({ ...settings, notifyDisputes: c })} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Resposta automática</p>
                    <p className="text-sm text-foreground-secondary">Enviar mensagem automática ao vender</p>
                  </div>
                  <Switch checked={settings.autoReply} onCheckedChange={(c) => setSettings({ ...settings, autoReply: c })} />
                </div>
                {settings.autoReply && (
                  <div>
                    <Label>Mensagem automática</Label>
                    <Textarea value={settings.autoReplyMessage} onChange={(e) => setSettings({ ...settings, autoReplyMessage: e.target.value })} className="mt-1.5" rows={2} />
                  </div>
                )}
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
