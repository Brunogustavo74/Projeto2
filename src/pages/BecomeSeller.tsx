import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import {
  Store,
  FileText,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function BecomeSeller() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    cpf: "",
    phone: "",
    products_description: "",
    experience: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Você precisa estar logado para se tornar vendedor.");
        return;
      }

      const { error } = await supabase.from("seller_requests").insert({
        user_id: user.id,
        full_name: formData.full_name,
        email: formData.email,
        cpf: formData.cpf,
        phone: formData.phone,
        products_description: formData.products_description,
        experience: formData.experience || null,
      });

      if (error) {
        console.error(error);
        toast.error("Erro ao enviar solicitação.");
        return;
      }

      toast.success("Solicitação enviada com sucesso!");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>

          <h1 className="text-2xl font-display font-bold mb-4">
            Solicitação Enviada!
          </h1>

          <p className="text-foreground-secondary mb-8">
            Sua solicitação para se tornar vendedor foi enviada.
            Nossa equipe irá analisar e retornar em até 24 horas.
          </p>

          <Link to="/">
            <Button>Voltar para Home</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Store className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Programa de Vendedores
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Torne-se um Vendedor
              </h1>

              <p className="text-foreground-secondary max-w-xl mx-auto">
                Venda seus produtos digitais para milhares de compradores com
                segurança e suporte dedicado.
              </p>
            </motion.div>
          </div>

          {/* Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-5 rounded-xl bg-card border">
              <Store className="w-5 h-5 text-primary mb-2" />
              <h3 className="font-semibold">Loja Própria</h3>
              <p className="text-sm text-muted-foreground">
                Página exclusiva para seus produtos
              </p>
            </div>

            <div className="p-5 rounded-xl bg-card border">
              <Shield className="w-5 h-5 text-success mb-2" />
              <h3 className="font-semibold">Pagamento Seguro</h3>
              <p className="text-sm text-muted-foreground">
                Proteção para compradores e vendedores
              </p>
            </div>

            <div className="p-5 rounded-xl bg-card border">
              <CreditCard className="w-5 h-5 text-warning mb-2" />
              <h3 className="font-semibold">Saques Rápidos</h3>
              <p className="text-sm text-muted-foreground">
                Retire seus ganhos quando quiser
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="rounded-2xl bg-card border p-8">
            <h2 className="text-xl font-bold mb-6">Preencha seus dados</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Nome completo</Label>
                  <Input
                    id="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>CPF</Label>
                  <Input
                    id="cpf"
                    required
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Telefone</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label>O que você pretende vender?</Label>
                <Textarea
                  id="products_description"
                  required
                  value={formData.products_description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Experiência com vendas (opcional)</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border">
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <FileText className="w-5 h-5 text-primary" />
                  Ao enviar, você concorda com os termos e políticas da plataforma.
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar Solicitação
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
