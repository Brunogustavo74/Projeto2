import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Trash2,
  Mail,
  Smartphone,
  Eye,
  Lock,
  Save
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function UserSettings() {
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    sales: true,
    purchases: true,
  });
  
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showActivity: true,
  });
  
  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Configurações salvas com sucesso!");
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Configurações
            </h1>
          </div>
          <p className="text-foreground-secondary">
            Gerencie suas preferências e configurações de conta
          </p>
        </motion.div>
        
        <div className="max-w-2xl space-y-6">
          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Notificações</h2>
                <p className="text-sm text-foreground-secondary">Configure como deseja receber alertas</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-foreground-muted" />
                  <div>
                    <p className="font-medium text-foreground">Notificações por email</p>
                    <p className="text-sm text-foreground-secondary">Receber atualizações por email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-foreground-muted" />
                  <div>
                    <p className="font-medium text-foreground">Notificações push</p>
                    <p className="text-sm text-foreground-secondary">Alertas em tempo real no navegador</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Atualizações de vendas</p>
                  <p className="text-sm text-foreground-secondary">Notificar sobre novas vendas</p>
                </div>
                <Switch
                  checked={notifications.sales}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sales: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Atualizações de compras</p>
                  <p className="text-sm text-foreground-secondary">Notificar sobre status de pedidos</p>
                </div>
                <Switch
                  checked={notifications.purchases}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, purchases: checked }))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email de marketing</p>
                  <p className="text-sm text-foreground-secondary">Novidades, promoções e ofertas</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                />
              </div>
            </div>
          </motion.section>
          
          {/* Privacy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Privacidade</h2>
                <p className="text-sm text-foreground-secondary">Controle sua privacidade e visibilidade</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-foreground-muted" />
                  <div>
                    <p className="font-medium text-foreground">Perfil público</p>
                    <p className="text-sm text-foreground-secondary">Permitir que outros vejam seu perfil</p>
                  </div>
                </div>
                <Switch
                  checked={privacy.profilePublic}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, profilePublic: checked }))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Mostrar atividade</p>
                  <p className="text-sm text-foreground-secondary">Exibir últimas atividades no perfil</p>
                </div>
                <Switch
                  checked={privacy.showActivity}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showActivity: checked }))}
                />
              </div>
            </div>
          </motion.section>
          
          {/* Security */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Segurança</h2>
                <p className="text-sm text-foreground-secondary">Proteja sua conta</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Senha atual</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>
              
              <div>
                <Label htmlFor="new-password">Nova senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>
              
              <Button variant="outline" className="w-full">
                Alterar Senha
              </Button>
            </div>
          </motion.section>
          
          {/* Danger Zone */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-destructive/5 border border-destructive/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Zona de Perigo</h2>
                <p className="text-sm text-foreground-secondary">Ações irreversíveis</p>
              </div>
            </div>
            
            <p className="text-sm text-foreground-secondary mb-4">
              Ao excluir sua conta, todos os seus dados serão permanentemente removidos. 
              Esta ação não pode ser desfeita.
            </p>
            
            <Button variant="destructive" className="gap-2">
              <Trash2 className="w-4 h-4" />
              Excluir Conta
            </Button>
          </motion.section>
          
          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="w-full gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
