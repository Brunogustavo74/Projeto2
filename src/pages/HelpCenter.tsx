import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  HelpCircle, 
  ShoppingBag, 
  Shield, 
  CreditCard, 
  Package, 
  AlertTriangle,
  ChevronRight,
  Search,
  MessageCircle,
  Mail
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  {
    id: "compras",
    title: "Compras",
    icon: ShoppingBag,
    description: "Dúvidas sobre como comprar produtos",
    articles: 12,
  },
  {
    id: "vendas",
    title: "Vendas",
    icon: Package,
    description: "Como vender na plataforma",
    articles: 8,
  },
  {
    id: "seguranca",
    title: "Segurança",
    icon: Shield,
    description: "Proteção de conta e transações",
    articles: 10,
  },
  {
    id: "pagamentos",
    title: "Pagamentos",
    icon: CreditCard,
    description: "Métodos de pagamento e saques",
    articles: 15,
  },
  {
    id: "disputas",
    title: "Disputas",
    icon: AlertTriangle,
    description: "Resolver problemas com pedidos",
    articles: 6,
  },
];

const faqs = [
  {
    question: "Como faço para comprar um produto?",
    answer: "Para comprar um produto, navegue pelo marketplace, escolha o item desejado, clique em 'Comprar Agora' e siga as instruções de pagamento. Após a confirmação, o produto digital será entregue imediatamente."
  },
  {
    question: "Como funciona a proteção ao comprador?",
    answer: "Todas as compras são protegidas. O valor fica retido até você confirmar o recebimento do produto. Se houver problemas, você pode abrir uma disputa em até 7 dias."
  },
  {
    question: "Como me torno um vendedor?",
    answer: "Acesse a página 'Seja um Vendedor', preencha o formulário com seus dados e aguarde a aprovação da nossa equipe. O processo leva até 48 horas úteis."
  },
  {
    question: "Quais são as taxas da plataforma?",
    answer: "Cobramos uma taxa de 10% sobre cada venda realizada. Não há taxas para compradores. Saques são gratuitos para contas PIX."
  },
  {
    question: "Como solicitar um saque?",
    answer: "No painel do vendedor, acesse a aba 'Saldo' e clique em 'Solicitar Saque'. Informe sua chave PIX e o valor. Saques são processados em até 24 horas úteis."
  },
  {
    question: "Como abrir uma disputa?",
    answer: "Se houver problemas com seu pedido, acesse 'Meus Pedidos', encontre o pedido em questão e clique em 'Reportar Problema'. Nossa equipe analisará o caso em até 48 horas."
  },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Central de Ajuda
          </h1>
          <p className="text-foreground-secondary max-w-xl mx-auto mb-8">
            Encontre respostas para suas dúvidas ou entre em contato com nossa equipe de suporte.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
            <Input
              type="text"
              placeholder="Buscar artigos de ajuda..."
              className="pl-12 h-14 text-base bg-card border-border"
            />
          </div>
        </motion.div>
        
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-xl font-display font-bold text-foreground mb-6">Categorias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/help/${category.id}`}
                className="group p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary mt-1 line-clamp-2">
                      {category.description}
                    </p>
                    <p className="text-xs text-foreground-muted mt-2">
                      {category.articles} artigos
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground-muted group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-xl font-display font-bold text-foreground mb-6">Perguntas Frequentes</h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl bg-card border border-border/50 px-5 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground-secondary pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
        
        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl"
        >
          <h2 className="text-xl font-display font-bold text-foreground mb-6">Ainda precisa de ajuda?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Chat ao Vivo</h3>
              <p className="text-sm text-foreground-secondary mb-4">
                Converse com nossa equipe em tempo real. Disponível das 9h às 22h.
              </p>
              <Button className="w-full">Iniciar Chat</Button>
            </div>
            
            <div className="p-6 rounded-xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-foreground-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-foreground-secondary mb-4">
                Envie sua dúvida e respondemos em até 24 horas úteis.
              </p>
              <Button variant="outline" className="w-full">suporte@nexusgames.com</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
