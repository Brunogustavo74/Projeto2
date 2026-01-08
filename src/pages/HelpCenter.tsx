import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  ShoppingBag, 
  Shield, 
  CreditCard, 
  Package, 
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Search,
  Mail,
  ArrowLeft
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
    articles: [
      { title: "Como comprar um produto?", content: "Para comprar um produto, navegue pelo marketplace, escolha o item desejado e clique em 'Comprar Agora'. Você será direcionado para a página de pagamento onde poderá escolher seu método preferido." },
      { title: "Quais formas de pagamento são aceitas?", content: "Aceitamos PIX, cartões de crédito (Visa, Mastercard, Elo) e boleto bancário. O PIX oferece confirmação instantânea, enquanto boletos podem levar até 3 dias úteis." },
      { title: "Como acompanho meu pedido?", content: "Após a compra, acesse 'Meus Pedidos' no seu dashboard. Lá você encontrará o status atualizado de todos os seus pedidos, incluindo informações de entrega." },
      { title: "Posso cancelar uma compra?", content: "Você pode solicitar o cancelamento antes da entrega do produto. Após a entrega, será necessário abrir uma disputa caso haja algum problema com o item recebido." },
    ],
  },
  {
    id: "vendas",
    title: "Vendas",
    icon: Package,
    description: "Como vender na plataforma",
    articles: [
      { title: "Como me tornar um vendedor?", content: "Acesse a página 'Seja um Vendedor', preencha o formulário com seus dados pessoais e informações sobre os produtos que pretende vender. Nossa equipe analisará sua solicitação em até 48 horas." },
      { title: "Quais produtos posso vender?", content: "Você pode vender produtos digitais como contas de jogos, gift cards, itens in-game, e serviços relacionados a games. Todos os produtos passam por aprovação antes de serem listados." },
      { title: "Como precificar meus produtos?", content: "Você define o preço dos seus produtos. Recomendamos pesquisar preços similares no marketplace para manter competitividade. Lembre-se que a taxa da plataforma é de 10%." },
      { title: "Como funciona a entrega?", content: "Após a confirmação do pagamento, você receberá uma notificação para realizar a entrega. Você tem até 24 horas para entregar o produto ao comprador." },
    ],
  },
  {
    id: "seguranca",
    title: "Segurança",
    icon: Shield,
    description: "Proteção de conta e transações",
    articles: [
      { title: "Como proteger minha conta?", content: "Use uma senha forte e única, ative a autenticação em duas etapas e nunca compartilhe suas credenciais. Evite clicar em links suspeitos e sempre acesse a plataforma pelo endereço oficial." },
      { title: "O que é a proteção ao comprador?", content: "Todas as compras são protegidas. O valor fica retido até você confirmar o recebimento do produto. Se houver problemas, você pode abrir uma disputa em até 7 dias após a entrega." },
      { title: "Como identificar golpes?", content: "Desconfie de ofertas muito abaixo do mercado, vendedores que pedem pagamento fora da plataforma, ou que pressionam para fechar negócio rapidamente. Sempre use nosso sistema de pagamento oficial." },
      { title: "Minha conta foi comprometida, o que fazer?", content: "Altere sua senha imediatamente, revise suas transações recentes e entre em contato com nosso suporte. Podemos ajudar a recuperar sua conta e investigar atividades suspeitas." },
    ],
  },
  {
    id: "pagamentos",
    title: "Pagamentos",
    icon: CreditCard,
    description: "Métodos de pagamento e saques",
    articles: [
      { title: "Como recebo meus pagamentos?", content: "Os valores das vendas ficam disponíveis para saque após 7 dias da confirmação de entrega pelo comprador. Isso garante a segurança de todas as transações." },
      { title: "Como solicitar um saque?", content: "No painel do vendedor, acesse 'Saldo' e clique em 'Solicitar Saque'. Informe sua chave PIX e o valor desejado. Saques são processados em até 24 horas úteis." },
      { title: "Qual a taxa da plataforma?", content: "Cobramos uma taxa de 10% sobre cada venda realizada. Não há taxas para compradores. Saques via PIX são gratuitos." },
      { title: "O que acontece se o pagamento falhar?", content: "Se o pagamento falhar, você receberá uma notificação explicando o motivo. Você pode tentar novamente com outro método de pagamento ou entrar em contato com seu banco." },
    ],
  },
  {
    id: "disputas",
    title: "Disputas",
    icon: AlertTriangle,
    description: "Resolver problemas com pedidos",
    articles: [
      { title: "Como abrir uma disputa?", content: "Acesse 'Meus Pedidos', encontre o pedido em questão e clique em 'Reportar Problema'. Descreva detalhadamente o problema e anexe evidências se possível." },
      { title: "Quanto tempo demora a análise?", content: "Nossa equipe analisa as disputas em até 48 horas úteis. Casos mais complexos podem levar até 5 dias úteis. Você será notificado sobre cada atualização." },
      { title: "Quais motivos posso alegar?", content: "Você pode abrir disputa por: produto não entregue, produto diferente do anunciado, conta/item não funciona, ou outros problemas relacionados à transação." },
      { title: "O que acontece após a disputa?", content: "Após análise, podemos resolver a favor do comprador (reembolso), do vendedor (liberação do pagamento), ou propor uma solução intermediária acordada entre as partes." },
    ],
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter articles based on search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results: { category: string; categoryIcon: typeof ShoppingBag; title: string; content: string }[] = [];
    
    categories.forEach(category => {
      category.articles.forEach(article => {
        if (
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
        ) {
          results.push({
            category: category.title,
            categoryIcon: category.icon,
            title: article.title,
            content: article.content,
          });
        }
      });
    });
    
    // Also search FAQs
    faqs.forEach(faq => {
      if (
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      ) {
        results.push({
          category: "Perguntas Frequentes",
          categoryIcon: HelpCircle,
          title: faq.question,
          content: faq.answer,
        });
      }
    });
    
    return results;
  }, [searchQuery]);

  const activeCategory = categories.find(c => c.id === selectedCategory);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {searchQuery.trim() && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold text-foreground">
                  Resultados da busca ({searchResults.length})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                >
                  Limpar busca
                </Button>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-card border border-border/50"
                    >
                      <div className="flex items-center gap-2 text-sm text-foreground-secondary mb-2">
                        <result.categoryIcon className="w-4 h-4" />
                        {result.category}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{result.title}</h3>
                      <p className="text-sm text-foreground-secondary line-clamp-2">{result.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-foreground-secondary">
                  Nenhum resultado encontrado para "{searchQuery}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Categories or Category Articles */}
        {!searchQuery.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <AnimatePresence mode="wait">
              {selectedCategory && activeCategory ? (
                <motion.div
                  key="articles"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="flex items-center gap-2 text-foreground-secondary hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para categorias
                  </button>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <activeCategory.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-foreground">
                        {activeCategory.title}
                      </h2>
                      <p className="text-sm text-foreground-secondary">
                        {activeCategory.articles.length} artigos
                      </p>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="space-y-3">
                    {activeCategory.articles.map((article, index) => (
                      <AccordionItem
                        key={index}
                        value={`article-${index}`}
                        className="rounded-xl bg-card border border-border/50 px-5 data-[state=open]:border-primary/30"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                          {article.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground-secondary pb-4">
                          {article.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ) : (
                <motion.div
                  key="categories"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-xl font-display font-bold text-foreground mb-6">Categorias</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className="group p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all text-left"
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
                              {category.articles.length} artigos
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-foreground-muted group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* FAQs */}
        {!searchQuery.trim() && !selectedCategory && (
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
        )}
        
        {/* Contact - Email Only */}
        {!searchQuery.trim() && !selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md"
          >
            <h2 className="text-xl font-display font-bold text-foreground mb-6">Ainda precisa de ajuda?</h2>
            <div className="p-6 rounded-xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-foreground-secondary mb-4">
                Envie sua dúvida e respondemos em até 24 horas úteis.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:suporte@nexusgames.com">suporte@nexusgames.com</a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
