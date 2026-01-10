import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Camera,
  Shield,
  Star,
  Package,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function Profile() {
  const { user, profile, roles } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    bibliography: "",
  });

  useEffect(() => {
    if (!profile || !user) return;

    setFormData({
      full_name: profile.full_name ?? "",
      email: user.email ?? "",
      phone: profile.phone ?? "",
      bibliography: profile.bibliography ?? "",
    });
  }, [profile, user]);

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        bibliography: formData.bibliography,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setIsLoading(false);

    if (error) {
      console.error(error);
      toast.error("Erro ao atualizar perfil");
      return;
    }

    toast.success("Perfil atualizado com sucesso!");
    setIsEditing(false);
  };

  const getRoleBadges = () => {
    const badges = [];
    if (roles.includes("admin")) badges.push({ label: "Admin", variant: "destructive" as const });
    if (roles.includes("seller")) badges.push({ label: "Vendedor", variant: "success" as const });
    if (roles.includes("buyer")) badges.push({ label: "Comprador", variant: "default" as const });
    return badges;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold">Meu Perfil</h1>
          <p className="text-foreground-secondary">
            Visualize e edite suas informações pessoais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CARD */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-6 rounded-xl bg-card border text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback>
                    {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-semibold">{profile?.full_name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>

              <div className="flex justify-center gap-2 my-4">
                {getRoleBadges().map((b, i) => (
                  <Badge key={i} variant={b.variant}>
                    {b.label}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Membro desde {new Date(user?.created_at ?? "").toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-success">
                  <Shield className="w-4 h-4" />
                  Conta verificada
                </div>
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <div className="p-6 rounded-xl bg-card border">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Informações Pessoais</h2>
                  <p className="text-sm text-muted-foreground">Atualize seus dados</p>
                </div>
                <Button
                  size="sm"
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Nome</Label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input value={formData.email} disabled />
                </div>

                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Bibliografia</Label>
                  <Textarea
                    value={formData.bibliography}
                    onChange={(e) => setFormData({ ...formData, bibliography: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? "Salvando..." : <><Save className="w-4 h-4 mr-2" />Salvar</>}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
