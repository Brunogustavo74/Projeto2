import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Gamepad2, 
  Store,
  FileText,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Shield
} from "lucide-react";

export default function BecomeSeller() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
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
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Solicitação Enviada!
          </h1>
          <p className="text-foreground-secondary mb-8">
            Sua solicitação para ser vendedor foi enviada com sucesso. 
            Nossa equipe irá analisar e você receberá uma resposta em até 24 horas.
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Store className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Programa de Vendedores</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Torne-se um Vendedor
              </h1>
              <p className="text-foreground-secondary max-w-xl mx-auto">
                Venda seus produtos digitais para milhares de compradores. 
                Processo simples, pagamento seguro e suporte dedicado.
              </p>
            </motion.div>
          </div>
          
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          >
            <div className="p-5 rounded-xl bg-card border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Loja Própria</h3>
              <p className="text-sm text-foreground-secondary">
                Tenha sua própria página de vendedor com todos seus produtos
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-card border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Pagamento Seguro</h3>
              <p className="text-sm text-foreground-secondary">
                Receba com segurança através de nossa plataforma
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-card border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Saques Rápidos</h3>
              <p className="text-sm text-foreground-secondary">
                Saque seu saldo disponível a qualquer momento
              </p>
            </div>
          </motion.div>
          
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 p-8"
          >
            <h2 className="text-xl font-display font-bold text-foreground mb-6">
              Preencha seus dados
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="Seu nome" className="h-12 bg-background" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" className="h-12 bg-background" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" className="h-12 bg-background" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" className="h-12 bg-background" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="products">O que você pretende vender?</Label>
                <Textarea 
                  id="products" 
                  placeholder="Descreva os tipos de produtos digitais que você pretende vender..."
                  className="min-h-[120px] bg-background"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experiência com vendas online</Label>
                <Textarea 
                  id="experience" 
                  placeholder="Conte um pouco sobre sua experiência vendendo online (opcional)..."
                  className="min-h-[100px] bg-background"
                />
              </div>
              
              {/* Terms */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground-secondary">
                    <p className="mb-2">Ao enviar esta solicitação, você concorda com:</p>
                    <ul className="list-disc list-inside space-y-1 text-foreground-muted">
                      <li>Termos de uso da plataforma</li>
                      <li>Política de vendedores</li>
                      <li>Regras de anúncios</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                size="xl" 
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar Solicitação
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
